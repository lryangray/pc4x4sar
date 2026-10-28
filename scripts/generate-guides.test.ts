import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it, vi } from 'vitest'
import {
  balancedSplit, blockMetrics, cleanSource, createDocument, documents, drawHeaderFooter, normalizeText, parseSource,
  planColumns, qrLayout, renderBlock, renderDocument, renderForm, renderQrLinks, spacing, splitBlock,
} from './generate-guides.mjs'

const options = {
  width: 260, fontSize: 10, headingSize: 11.5, lineGap: 1.3, gap: 5,
  firstTop: 170, nextTop: 105, bottom: 734,
}
// PDFKit ships without type definitions, so spied calls are untyped argument lists.
type Call = any[]
const makeDoc = () => createDocument({ title: 'Layout test', subtitle: 'Test fixture' })

describe('guide source parsing', () => {
  it('preserves headings and callouts embedded with their body', () => {
    expect(parseSource('Winter Emergency Kit\nExtra supplies for cold conditions.\n\nSAR PRO TIP:\nTip: Keep dry.'))
      .toEqual([
        { type: 'heading', text: 'Winter Emergency Kit' },
        { type: 'paragraph', text: 'Extra supplies for cold conditions.' },
        { type: 'callout', title: 'SAR PRO TIP', text: 'Keep dry.' },
      ])
  })

  it('separates list items and numbered steps without losing wrapped text', () => {
    expect(parseSource('Checklist\n❑ Carry a map\nand compass.\n❑ Bring water.\n\n1. Stop.\n2. Think.\n\n* X = Medical help'))
      .toEqual([
        { type: 'heading', text: 'Checklist' },
        { type: 'item', marker: 'check', text: 'Carry a map and compass.' },
        { type: 'item', marker: 'check', text: 'Bring water.' },
        { type: 'item', marker: '1.', text: 'Stop.' },
        { type: 'item', marker: '2.', text: 'Think.' },
        { type: 'item', marker: 'bullet', text: 'X = Medical help' },
      ])
  })

  it('keeps URLs, punctuation headings and all form fields distinct', () => {
    expect(parseSource('## Rivers: Puyallup, Carbon\nCold water.\n\nhttps://example.com/help\n\n@ Full Name: | Phone Number:'))
      .toEqual([
        { type: 'heading', text: 'Rivers: Puyallup, Carbon' },
        { type: 'paragraph', text: 'Cold water.' },
        { type: 'paragraph', text: 'https://example.com/help' },
        { type: 'field', text: 'Full Name: | Phone Number:' },
      ])
    expect(normalizeText('  Tip:   Bring water , and food.  ')).toBe('Bring water, and food.')
  })
})

describe('measured PDF layout', () => {
  it('measures wrapped callout titles and body with their actual draw widths', () => {
    const doc = makeDoc()
    const block = { type: 'callout', title: 'A long warning heading that wraps onto several lines', text: 'Keep this warning complete. '.repeat(15) }
    const result = blockMetrics(doc, block, { ...options, width: 150 })
    expect(result.titleHeight).toBeGreaterThan(options.headingSize * 2)
    const title = doc.font('Helvetica-Bold').fontSize(options.headingSize)
      .heightOfString(block.title, { width: 126, lineGap: options.lineGap })
    const body = doc.font('Helvetica').fontSize(options.fontSize)
      .heightOfString(block.text, { width: 126, lineGap: options.lineGap })
    expect(result.titleHeight).toBeCloseTo(title - options.lineGap)
    expect(result.height).toBeCloseTo(
      title - options.lineGap + body + spacing.calloutPadding * 2 + spacing.headingToBody + options.gap,
    )
  })

  it('splits oversized content without losing words or overflowing columns', () => {
    const doc = makeDoc()
    const text = 'An important safety instruction must remain readable. '.repeat(140).trim()
    const blocks = [{ type: 'heading', text: 'Safety instructions' }, { type: 'paragraph', text }]
    const plans = planColumns(doc, blocks, options)
    expect(plans.length).toBeGreaterThan(1)
    const rendered = plans.flatMap(p => p.columns.flat()).filter(b => b.type === 'paragraph')
    expect(rendered.map(b => b.text).join(' ')).toBe(text)
    for (const plan of plans) {
      for (const column of plan.columns) {
        const height = column.reduce(
          (sum, block, index) => sum + blockMetrics(doc, block, options, column[index - 1]).height, 0,
        )
        expect(plan.top + height).toBeLessThanOrEqual(options.bottom + 0.01)
        expect(column.at(-1)?.type).not.toBe('heading')
      }
    }
  })

  it('keeps a heading with its following paragraph rather than orphaning it', () => {
    const doc = makeDoc()
    const blocks = [
      { type: 'paragraph', text: 'Previous section. '.repeat(35) },
      { type: 'heading', text: 'Emergency instructions' },
      { type: 'paragraph', text: 'Do not omit this warning. '.repeat(20) },
    ]
    const plans = planColumns(doc, blocks, { ...options, bottom: 450 })
    for (const plan of plans) {
      for (const column of plan.columns) expect(column.at(-1)?.type).not.toBe('heading')
    }
  })

  it('splits large callouts with a continued label and their full content', () => {
    const doc = makeDoc()
    const block = { type: 'callout', title: 'WARNING', text: 'Stay warm and wait for help. '.repeat(70).trim() }
    const split = splitBlock(doc, block, options, 250)
    expect(split).not.toBeNull()
    expect(split?.map(b => b.text).join(' ')).toBe(block.text)
    expect(split?.[1]?.title).toBe('WARNING (continued)')
    expect(blockMetrics(doc, split?.[0], options).height).toBeLessThanOrEqual(250)
  })

  it('balances at section boundaries and never leaves a heading alone', () => {
    const doc = makeDoc()
    const blocks = [
      { type: 'heading', text: 'Before departure' },
      { type: 'paragraph', text: 'Pack all essential equipment. '.repeat(10) },
      { type: 'heading', text: 'On the trail' },
      { type: 'paragraph', text: 'Stay together and check your route. '.repeat(10) },
    ]
    expect(balancedSplit(doc, blocks, options, 500)).toBe(2)
    expect(balancedSplit(doc, blocks, options, 30)).toBeNull()
  })

  it('keeps short numbered procedures intact, including during final-column balancing', () => {
    const doc = makeDoc()
    const introduction = { type: 'paragraph', text: 'Read these instructions before starting. '.repeat(3) }
    const procedure = [
      { type: 'heading', text: 'How to download' },
      ...Array.from({ length: 6 }, (_, index) => ({
        type: 'item', marker: `${index + 1}.`, text: `Complete step ${index + 1}.`,
      })),
    ]
    const plans = planColumns(doc, [introduction, ...procedure], {
      ...options, firstTop: 100, nextTop: 100, bottom: 230,
    })
    expect(plans).toHaveLength(1)
    expect(plans[0]!.columns).toEqual([[introduction], procedure])
    expect(balancedSplit(doc, procedure, options, 130)).toBeNull()
    doc.end()
  })

  it('allows a numbered procedure longer than a column to continue without dropping steps', () => {
    const doc = makeDoc()
    const procedure = [
      { type: 'heading', text: 'A long procedure' },
      ...Array.from({ length: 30 }, (_, index) => ({
        type: 'item', marker: `${index + 1}.`, text: `Complete step ${index + 1}.`,
      })),
    ]
    const plans = planColumns(doc, procedure, { ...options, firstTop: 100, nextTop: 100, bottom: 230 })
    expect(plans.length).toBeGreaterThan(1)
    expect(plans.flatMap(plan => plan.columns.flat())).toEqual(procedure)
    doc.end()
  })

  it.each([11.5, 10.5])('centers %spt heading cap heights on accents using emitted PDF baselines', headingSize => {
    const doc = makeDoc()
    doc.addPage()
    const rectangles = vi.spyOn(doc, 'rect')
    const text = vi.spyOn(doc, 'text')
    const content = vi.spyOn(doc, 'addContent')
    const firstBaselines: number[] = []
    for (const heading of ['FIELD TIPS', 'Safety checklist', 'gyp jumping', 'A heading that wraps onto several lines in a narrow column']) {
      const settings = { ...options, headingSize, width: 140 }
      const block = { type: 'heading', text: heading }
      const previous = { type: 'paragraph', text: 'Previous section.' }
      const metrics = blockMetrics(doc, block, settings, previous)
      const titleHeight = doc.font('Helvetica-Bold').fontSize(headingSize)
        .heightOfString(heading, { width: settings.width - 9, lineGap: settings.lineGap }) - settings.lineGap
      const capHeight = doc._font.capHeight * headingSize / 1000
      const descender = doc._font.descender * headingSize / 1000
      const lineHeight = doc.currentLineHeight(true)
      content.mockClear()
      renderBlock(doc, block, settings, 36, 100, previous)
      expect(rectangles.mock.lastCall).toEqual([36, 100 + spacing.section, 3, titleHeight])
      const baselines = content.mock.calls
        .map(([operator]: Call) => /^1 0 0 1 [\d.]+ ([\d.]+) Tm$/.exec(operator))
        .filter(Boolean).map((match: RegExpExecArray | null) => doc.page.height - Number(match?.[1]))
      expect(baselines.length).toBeGreaterThan(0)
      firstBaselines.push(baselines[0])
      const inkTop = baselines[0] - capHeight
      const inkBottom = baselines.at(-1)!
      expect((inkTop + inkBottom) / 2).toBeCloseTo(100 + spacing.section + titleHeight / 2, 5)
      expect(inkBottom - descender).toBeLessThan(100 + spacing.section + titleHeight)
      for (let index = 1; index < baselines.length; index += 1) {
        expect(baselines[index] - baselines[index - 1]).toBeCloseTo(lineHeight + settings.lineGap, 5)
      }
      expect(doc.y).toBeCloseTo(100 + metrics.height)
      if (heading.startsWith('A heading')) expect(titleHeight).toBeGreaterThan(headingSize * 2)
      const bodyY = doc.y
      renderBlock(doc, { type: 'paragraph', text: 'Keep this heading with its body.' }, settings, 36, bodyY, block)
      expect(text.mock.lastCall?.[2]).toBeCloseTo(100 + spacing.section + titleHeight + spacing.headingToBody)
      expect(bodyY - (inkBottom - descender)).toBeGreaterThan(spacing.headingToBody)
    }
    expect(new Set(firstBaselines).size).toBe(1)
    rectangles.mockRestore()
    text.mockRestore()
    content.mockRestore()
    doc.end()
  })

  it.each(['WARNING', 'A long warning heading that wraps onto several lines'])(
    'uses the same heading-to-body gap inside callouts: %s', title => {
      const doc = makeDoc()
      doc.addPage()
      const rectangles = vi.spyOn(doc, 'rect')
      const text = vi.spyOn(doc, 'text')
      const block = { type: 'callout', title, text: 'Keep this warning complete.' }
      const settings = { ...options, width: 150 }
      const previous = { type: 'paragraph', text: 'Previous section.' }
      const metrics = blockMetrics(doc, block, settings, previous)
      renderBlock(doc, block, settings, 36, 100, previous)
      expect(rectangles.mock.calls).toEqual([
        [36, 100, settings.width, metrics.boxHeight],
        [36, 100, 3, metrics.boxHeight],
      ])
      const titleY = text.mock.calls[0][2] as number
      const bodyY = text.mock.calls[1][2] as number
      doc.font('Helvetica-Bold').fontSize(settings.headingSize)
      const baselineOffset = (doc.currentLineHeight(true) + doc._font.capHeight * settings.headingSize / 1000) / 2
      expect(titleY - baselineOffset).toBeCloseTo(100 + spacing.calloutPadding)
      expect(bodyY - (titleY - baselineOffset) - metrics.titleHeight!).toBeCloseTo(spacing.headingToBody)
      expect(doc.y).toBeCloseTo(100 + metrics.height)
      rectangles.mockRestore()
      text.mockRestore()
      doc.end()
    },
  )

  it('separates sections before headings, but not at column tops or between consecutive headings', () => {
    const doc = makeDoc()
    const heading = { type: 'heading', text: 'Before departure' }
    const body = { type: 'paragraph', text: 'Carry essentials.' }
    const callout = { type: 'callout', title: 'WARNING', text: 'Stay together.' }
    for (const block of [heading, callout]) {
      expect(blockMetrics(doc, block, options).before).toBe(0)
      expect(blockMetrics(doc, block, options, heading).before).toBe(0)
      expect(blockMetrics(doc, block, options, body).before).toBe(block.type === 'heading' ? spacing.section : 0)
      expect(blockMetrics(doc, block, options, callout).before).toBe(block.type === 'heading' ? spacing.section : 0)
    }
    const plans = planColumns(doc, [heading, body, heading, body], {
      ...options, firstTop: 100, nextTop: 100, bottom: 145,
    })
    expect(plans).toHaveLength(1)
    expect(plans[0]!.columns).toEqual([[heading, body], [heading, body]])
    expect(balancedSplit(doc, [heading, body, heading, body], options, 45)).toBe(2)
  })

  it.each(documents.filter(document => document.type !== 'form'))(
    'keeps measured and rendered block heights in sync for $slug, including linked text', document => {
      const doc = makeDoc()
      doc.addPage()
      const settings = {
        ...options,
        fontSize: document.type === 'card' ? 9.5 : 10,
        headingSize: document.type === 'card' ? 10.5 : 11.5,
        lineGap: document.type === 'card' ? 1.1 : 1.3,
      }
      const source = fs.readFileSync(path.join(process.cwd(), 'content', 'guides', `${document.slug}.txt`), 'utf8')
      const blocks = parseSource(cleanSource(source, document))
      const plans = planColumns(doc, blocks, settings)
      for (const plan of plans) {
        for (const column of plan.columns) {
          const height = column.reduce(
            (sum, block, index) => sum + blockMetrics(doc, block, settings, column[index - 1]).height, 0,
          )
          expect(plan.top + height).toBeLessThanOrEqual(settings.bottom + 0.01)
          expect(column.at(-1)?.type).not.toBe('heading')
        }
      }
      const drawText = doc.text.bind(doc)
      let textEnd = 0
      const text = vi.spyOn(doc, 'text').mockImplementation((...args: Call) => {
        const result = drawText(...args)
        textEnd = doc.y
        return result
      })
      for (const [index, block] of blocks.entries()) {
        const metrics = blockMetrics(doc, block, settings, blocks[index - 1])
        renderBlock(doc, block, settings, 36, 100, blocks[index - 1])
        const baselineOffset = block.type === 'heading'
          ? (doc.currentLineHeight(true) + doc._font.capHeight * settings.headingSize / 1000) / 2 : 0
        const trailing = block.type === 'heading' ? spacing.headingToBody - settings.lineGap - baselineOffset
          : settings.gap + (block.type === 'callout' ? spacing.calloutPadding : 0)
        expect(textEnd + trailing, block.text).toBeCloseTo(100 + metrics.height)
        expect(doc.y, block.text).toBeCloseTo(100 + metrics.height)
      }
      text.mockRestore()
      doc.end()
    },
  )

  it('measures form heading panels and consistently spaces all five sections on one page', () => {
    const doc = makeDoc()
    const document = documents.find(document => document.type === 'form')!
    const source = fs.readFileSync(path.join(process.cwd(), 'content', 'guides', `${document.slug}.txt`), 'utf8')
    const blocks = parseSource(cleanSource(source, document))
    const rectangles = vi.spyOn(doc, 'rect')
    const text = vi.spyOn(doc, 'text')
    renderForm(doc, document, blocks)
    const panels = rectangles.mock.calls.filter((call: Call) => call[2] === 540)
    expect(panels).toHaveLength(5)
    for (const [index, heading] of blocks.filter(block => block.type === 'heading').entries()) {
      const titleIndex = text.mock.calls.findIndex((call: Call) => call[0] === heading.text)
      const titleY = text.mock.calls[titleIndex][2] as number
      const bodyY = text.mock.calls[titleIndex + 1][2] as number
      const panelY = panels[index]![1] as number
      const panelHeight = panels[index]![3] as number
      const titleHeight = doc.font('Helvetica-Bold').fontSize(9)
        .heightOfString(heading.text, { width: 528, lineGap: 0 })
      const capHeight = doc._font.capHeight * 9 / 1000
      expect(titleY - capHeight / 2).toBeCloseTo(panelY + panelHeight / 2)
      expect(panelHeight).toBeCloseTo(titleHeight + spacing.formHeadingPadding * 2)
      expect(bodyY - panelY - panelHeight).toBeCloseTo(spacing.headingToBody)
    }
    expect(doc.bufferedPageRange().count).toBe(1)
    expect(doc.y).toBeLessThanOrEqual(options.bottom)
    rectangles.mockRestore()
    text.mockRestore()
    doc.end()
  })

  it.each([10, 9.5, 8])('aligns %spt checkboxes, bullets and step numbers to the first text baseline', fontSize => {
    const doc = makeDoc()
    doc.addPage()
    const rectangles = vi.spyOn(doc, 'rect')
    const circles = vi.spyOn(doc, 'circle')
    const content = vi.spyOn(doc, 'addContent')
    doc.font('Helvetica').fontSize(fontSize)
    const ascent = doc._font.ascender * fontSize / 1000
    const capHeight = doc._font.capHeight * fontSize / 1000
    for (const marker of ['check', 'bullet', '1.', '']) {
      content.mockClear()
      renderBlock(doc, { type: 'item', marker, text: 'Pack maps, layers and emergency supplies. '.repeat(3) },
        { ...options, fontSize, width: 140 }, 36, 100)
      const baselines = content.mock.calls
        .map(([operator]: Call) => /^1 0 0 1 [\d.]+ ([\d.]+) Tm$/.exec(operator))
        .filter(Boolean).map((match: RegExpExecArray | null) => doc.page.height - Number(match?.[1]))
      expect(baselines[0]).toBeCloseTo(100 + ascent, 5)
      if (marker === 'check') {
        const box = rectangles.mock.lastCall!
        expect(Number(box[1]) + Number(box[3]) / 2).toBeCloseTo(baselines[0] - capHeight / 2)
      } else if (marker === 'bullet') {
        expect(circles.mock.lastCall?.[1]).toBeCloseTo(baselines[0] - capHeight / 2)
      } else if (marker === '1.') {
        expect(baselines[1]).toBe(baselines[0])
      } else expect(baselines.length).toBeGreaterThan(1)
    }
    rectangles.mockRestore()
    circles.mockRestore()
    content.mockRestore()
    doc.end()
  })

  it('uses the same cap-height alignment for form checklist boxes', () => {
    const doc = makeDoc()
    const document = documents.find(document => document.type === 'form')!
    const rectangles = vi.spyOn(doc, 'rect')
    const text = vi.spyOn(doc, 'text')
    renderForm(doc, document, [{ type: 'item', marker: 'check', text: 'Map & compass' }])
    const box = rectangles.mock.lastCall!
    const textY = text.mock.lastCall?.[2] as number
    doc.font('Helvetica').fontSize(8)
    expect(Number(box[1]) + Number(box[3]) / 2).toBeCloseTo(
      textY + (doc._font.ascender - doc._font.capHeight / 2) * 8 / 1000,
    )
    rectangles.mockRestore()
    text.mockRestore()
    doc.end()
  })

  it.each(['guide', 'form'])('centers both emergency badge labels as a group for a %s', type => {
    const doc = makeDoc()
    doc.addPage()
    const text = vi.spyOn(doc, 'text')
    drawHeaderFooter(doc, { type })
    const label = text.mock.calls.find((call: Call) => call[0] === (type === 'form' ? 'IF OVERDUE' : 'EMERGENCY'))!
    const call = text.mock.calls.find((call: Call) => call[0] === 'CALL 911')!
    doc.font('Helvetica-Bold')
    const labelCapHeight = doc._font.capHeight * 8 / 1000
    const callCapHeight = doc._font.capHeight * 12 / 1000
    const groupTop = Number(label[2]) - labelCapHeight
    const groupBottom = Number(call[2])
    expect(groupTop - 20).toBeCloseTo(57 - groupBottom)
    expect(Number(call[2]) - callCapHeight - Number(label[2])).toBeCloseTo(spacing.headingToBody)
    expect(label[3].baseline).toBe('alphabetic')
    expect(call[3].baseline).toBe('alphabetic')
    expect(doc.bufferedPageRange().count).toBe(1)
    text.mockRestore()
    doc.end()
  })

  it('reserves measured QR caption space without changing existing card bands', async () => {
    const doc = makeDoc()
    doc.addPage()
    for (const document of documents.filter(document => document.qrLinks)) {
      expect(qrLayout(doc, document.qrLinks).height).toBe(112)
    }
    const links = Array.from({ length: 4 }, () => [
      'A long resource caption that needs several complete lines without truncation or overlapping the footer',
      'https://example.com',
    ])
    const layout = qrLayout(doc, links)
    expect(layout.height).toBeGreaterThan(112)
    const text = vi.spyOn(doc, 'text')
    const y = 734 - layout.height
    await renderQrLinks(doc, links, y)
    const captions = text.mock.calls.filter((call: Call) => call[0] === links[0]![0])
    expect(captions).toHaveLength(4)
    const captionHeight = doc.heightOfString(links[0]![0], { width: layout.width, lineGap: 1 })
    for (const caption of captions) {
      expect(Number(caption[2]) + captionHeight).toBeLessThanOrEqual(729)
    }
    expect(doc.y).toBeCloseTo(734)
    expect(doc.bufferedPageRange().count).toBe(1)
    await expect(renderQrLinks(doc, links, y + 1)).rejects.toThrow('QR resources exceed')
    text.mockRestore()
    doc.end()
  })

  it.each(documents)('renders every $slug block at readable sizes within the existing page count', async document => {
    const doc = makeDoc()
    const source = fs.readFileSync(path.join(process.cwd(), 'content', 'guides', `${document.slug}.txt`), 'utf8')
    const blocks = parseSource(cleanSource(source, document))
    const text = vi.spyOn(doc, 'text')
    const content = vi.spyOn(doc, 'addContent')
    await renderDocument(doc, document, blocks)
    const expectedPages = document.type !== 'guide' ? 1 : document.slug === 'tech-preparedness-guide' ? 4 : 2
    expect(doc.bufferedPageRange().count).toBe(expectedPages)
    const renderedText = normalizeText(text.mock.calls.map((call: Call) => call[0]).join(''))
    for (const block of blocks) {
      for (const part of block.text.split(' | ')) expect(renderedText).toContain(normalizeText(part))
      if (block.title) expect(renderedText).toContain(block.title)
    }
    for (const [operator] of content.mock.calls) {
      const font = /^\/F\d+ ([\d.]+) Tf$/.exec(operator)
      if (font) expect(Number(font[1])).toBeGreaterThanOrEqual(8)
      const matrix = /^1 0 0 1 ([\d.]+) ([\d.]+) Tm$/.exec(operator)
      if (matrix) {
        const [x, baseline] = [Number(matrix[1]), 792 - Number(matrix[2])]
        expect(x).toBeGreaterThanOrEqual(36)
        expect(x).toBeLessThan(576)
        expect(baseline).toBeGreaterThan(16)
        expect(baseline).toBeLessThan(770)
        // Only the footer belongs below the content boundary.
        if (baseline > 734) expect(baseline).toBeCloseTo(763 + 8 * 0.718)
      }
    }
    text.mockRestore()
    content.mockRestore()
    doc.end()
  })
})
