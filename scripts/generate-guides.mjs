import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import PDFDocument from 'pdfkit'
import QRCode from 'qrcode'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const sourceDir = path.join(repoRoot, 'content', 'guides')
const outputDir = path.join(repoRoot, 'public', 'guides')

const SITE_DOMAIN = 'pcsar4x4.org'
const SITE_URL = `https://${SITE_DOMAIN}`
const ORG_NAME = 'Pierce County 4x4 Search & Rescue'
const logoPath = path.join(repoRoot, 'public', 'images', 'logo-4x4-unit.png')

const colors = {
  navy: '#102a43',
  orange: '#ff6b35',
  tan: '#f6efe6',
  lightBlue: '#eaf1f8',
  gray: '#4b5563',
  border: '#d6dce5',
}

const page = {
  width: 612,
  height: 792,
  left: 36,
  right: 36,
  top: 82,
  bottom: 58,
  headerHeight: 64,
  footerHeight: 38,
}

export const spacing = {
  section: 8,
  headingToBody: 5,
  calloutPadding: 10,
  formHeadingPadding: 3,
}

export const documents = [
  {
    slug: 'trip-planning-checklist',
    title: 'Trip Planning Checklist',
    subtitle: 'Your pre-trip safety checklist for outdoor adventures in Pierce County, Washington and beyond',
    type: 'guide',
  },
  {
    slug: 'ten-essentials-guide',
    title: 'The Ten Essentials',
    subtitle: 'The gear systems every outdoor adventurer should carry on every trip — no matter how short',
    type: 'guide',
  },
  {
    slug: 'emergency-signal-guide',
    title: 'Emergency Signal Guide',
    subtitle: 'How to signal for help if you become lost or injured in the backcountry of Pierce County',
    type: 'guide',
  },
  {
    slug: 'tech-preparedness-guide',
    title: 'Tech Preparedness Guide',
    subtitle: 'Digital tools, apps, and devices to keep you safe and connected in the backcountry',
    type: 'guide',
  },
  {
    slug: 'activity-hiking-safety',
    title: 'Hiking Safety Guide',
    subtitle: 'Essential safety for hiking in Pierce County from day hikes to backcountry scrambles',
    type: 'guide',
  },
  {
    slug: 'activity-offroad-safety',
    title: 'Offroad & 4x4 Safety Guide',
    subtitle: 'Safety essentials for offroading and 4x4 adventures in Pierce County and the Cascade Mountains',
    type: 'guide',
  },
  {
    slug: 'activity-atv-sxs-safety',
    title: 'ATV, SxS & Dirt Bike Safety Guide',
    subtitle: 'Safety essentials for ATV, UTV, SxS, and dirt bike riding in Pierce County, Washington',
    type: 'guide',
  },
  {
    slug: 'activity-water-safety',
    title: 'Water Recreation Safety Guide',
    subtitle: 'Safety essentials for kayaking, paddleboarding, boating, and water recreation in Pierce County',
    type: 'guide',
  },
  {
    slug: 'activity-winter-safety',
    title: 'Snowmobiling & Winter Recreation Safety Guide',
    subtitle: 'Safety essentials for snowmobiling, snowshoeing, and winter backcountry travel in Pierce County',
    type: 'guide',
  },
  {
    slug: 'activity-hunting-fishing-safety',
    title: 'Hunting & Fishing Safety Guide',
    subtitle: 'Safety essentials for hunting and fishing in Pierce County and the Cascade backcountry',
    type: 'guide',
  },
  {
    slug: 'field-card-trip-planning',
    title: 'Trip Planning Quick Reference',
    subtitle: 'Print, laminate, and keep in your pack.',
    type: 'card',
    qrLinks: [
      ['Trip Plan Form', `${SITE_URL}/guides/trip-plan-form.pdf`],
      ['Satellite 911 Signup', 'https://www.t-mobile.com/coverage/satellite-phone-service/911-texting-signup'],
    ],
  },
  {
    slug: 'field-card-ten-essentials',
    title: 'Ten Essentials Checklist',
    subtitle: 'Carry all 10 systems, every trip.',
    type: 'card',
  },
  {
    slug: 'field-card-emergency-signals',
    title: 'Emergency Signal Quick Reference',
    subtitle: 'S.T.O.P., stay put, and signal clearly.',
    type: 'card',
    qrLinks: [
      ['Satellite 911 Signup', 'https://www.t-mobile.com/coverage/satellite-phone-service/911-texting-signup'],
      ['Garmin inReach Mini 2', 'https://www.garmin.com/en-US/p/765374'],
    ],
  },
  {
    slug: 'field-card-tech-prep',
    title: 'Tech Preparedness Quick Reference',
    subtitle: 'Apps, offline maps, battery, and satellite SOS.',
    type: 'card',
    qrLinks: [
      ['Satellite 911 Signup', 'https://www.t-mobile.com/coverage/satellite-phone-service/911-texting-signup'],
      ['T-Mobile Coverage', 'https://www.t-mobile.com/coverage/coverage-map'],
      ['AT&T Coverage', 'https://www.att.com/maps/wireless-coverage.html'],
      ['Verizon Coverage', 'https://www.verizon.com/coverage-map'],
    ],
  },
  {
    slug: 'trip-plan-form',
    title: 'Trip Plan',
    subtitle: 'Fill out before your trip. Leave a copy with your emergency contact.',
    type: 'form',
  },
]

const calloutHeadings = new Set([
  'THE #1 THING YOU CAN DO',
  'WHY IT MATTERS',
  'FIRST PRIORITY',
  'CRITICAL REMINDER',
  'CRITICAL: COLD WATER KILLS',
  'WINTER IN THE CASCADES',
  'PIERCE COUNTY HIKING BY THE NUMBERS',
  '#1 RULE: STAY PUT',
  'REMEMBER',
  'KEY TAKEAWAYS',
  'PACK IT EVERY TIME',
  'FROM OUR TEAM TO YOU',
  'SAR PRO TIP',
  'IMPORTANT: AIRPLANE MODE WARNING',
  'LAHAR WARNING',
  'IF SOMEONE IS INJURED',
  'MOST RESCUES INVOLVE DAY HIKERS',
])

export function normalizeText(text) {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:])/g, '$1')
    .trim()
    .replace(/^Tip:\s+/, '')
}

function isHeading(text) {
  if (/^#{1,3}\s/.test(text)) return true
  if (/^[❑•*-]\s|^\d+[.)]\s|https?:|\.com\b|\.org\b|\.app\b|\.us\b/.test(text)) return false
  if (calloutHeadings.has(text.replace(/:$/, ''))) return true
  return text.length < 88 && /[A-Za-z]/.test(text)
    && !/[.!?,;]$/.test(text) && !text.includes(': ')
}

/** @typedef {{type: string, text: string, title?: string, marker?: string}} Block */

/** @returns {Block[]} */
export function parseSource(source) {
  const rawBlocks = source
    .replace(/\r/g, '')
    .split(/\n\s*\n/g)
    .map((block) => block.split('\n').map((line) => line.trim()).filter(Boolean))
    .filter((block) => block.length > 0)

  const blocks = []
  for (const originalLines of rawBlocks) {
    const lines = [...originalLines]
    if (lines[0].startsWith('@ ')) {
      blocks.push({ type: 'field', text: normalizeText(lines.join(' ').slice(2)) })
      continue
    }
    // Extracted PDF text often puts a heading and its body in the same block.
    if (isHeading(lines[0])) {
      const text = normalizeText(lines.shift().replace(/^#{1,3}\s+/, '')).replace(/:$/, '')
      blocks.push({ type: 'heading', text })
    }
    let current = null
    const flush = () => {
      if (current) blocks.push({ ...current, text: normalizeText(current.text) })
      current = null
    }
    for (const line of lines) {
      const marker = line.match(/^([❑•*-]|\d+[.)])\s+(.*)$/)
      if (marker) {
        flush()
        current = {
          type: 'item',
          marker: /^\d/.test(marker[1]) ? marker[1] : (marker[1] === '❑' ? 'check' : 'bullet'),
          text: marker[2],
        }
      } else {
        if (!current) current = { type: 'paragraph', text: '' }
        current.text += ` ${line}`
      }
    }
    flush()
  }
  for (let index = 0; index < blocks.length - 1; index += 1) {
    const block = blocks[index]
    if (block.type === 'heading' && calloutHeadings.has(block.text)
      && blocks[index + 1].type === 'paragraph') {
      blocks.splice(index, 2, { type: 'callout', title: block.text, text: blocks[index + 1].text })
    }
  }
  return blocks
}

export function cleanSource(source, document) {
  return source.split(/\r?\n/).filter((line) => {
    const text = normalizeText(line)
    return !text.startsWith(`${document.title} EMERGENCY`)
      && !text.startsWith(`${ORG_NAME} |`)
  }).join('\n')
}

export function createDocument(document) {
  return new PDFDocument({
    size: 'LETTER',
    autoFirstPage: false,
    bufferPages: true,
    margins: {
      top: 0,
      bottom: 0,
      left: page.left,
      right: page.right,
    },
    info: {
      Title: document.title,
      Author: ORG_NAME,
      Subject: document.subtitle,
      Keywords: 'search and rescue, Pierce County, outdoor safety',
      Creator: `${ORG_NAME} | ${SITE_DOMAIN}`,
      // Stable metadata keeps regeneration reproducible.
      CreationDate: new Date('2026-10-07T00:00:00Z'),
      ModDate: new Date('2026-10-07T00:00:00Z'),
    },
  })
}

function addPage(doc, document) {
  doc.addPage()
  doc.y = page.top
  if (doc.bufferedPageRange().count > 1) {
    doc.fillColor(colors.gray).font('Helvetica-Bold').fontSize(9)
    doc.text(document.title, page.left, page.top, { width: contentWidth(), lineGap: 1 })
    doc.y += 12
  }
}

function contentWidth() {
  return page.width - page.left - page.right
}

function bottomLimit() {
  return page.height - page.bottom
}

function measure(doc, text, width, size, bold = false, lineGap = 1) {
  return doc.font(bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(size)
    .heightOfString(text, { width, lineGap })
}

function fontMetrics(doc) {
  // PDFKit exposes line height publicly, but cap/ascender metrics only on the active font.
  const scale = doc._fontSize / 1000
  return {
    ascent: doc._font.ascender * scale,
    capHeight: doc._font.capHeight * scale,
    lineHeight: doc.currentLineHeight(true),
  }
}

function centeredHeading(doc, text, x, y, options) {
  const { capHeight, lineHeight } = fontMetrics(doc)
  // Center the cap-height band, not the font's asymmetric ascender/descender box.
  // One baseline per font size keeps capitals, lowercase and descenders on the same grid.
  doc.text(text, x, y + (lineHeight + capHeight) / 2, { ...options, baseline: 'alphabetic' })
}

function drawMarker(doc, marker, x, y, indent, lineGap = 0) {
  const { ascent, capHeight } = fontMetrics(doc)
  const centerY = y + ascent - capHeight / 2
  if (marker === 'check') {
    doc.rect(x, centerY - 3.5, 7, 7).lineWidth(0.7).strokeColor(colors.gray).stroke()
  } else if (marker === 'bullet') {
    doc.circle(x + 3, centerY, 2).fill(colors.orange)
  } else if (marker) {
    doc.font('Helvetica-Bold').fillColor(colors.navy)
    doc.text(marker, x, y + ascent, { width: indent, lineGap, baseline: 'alphabetic' })
  }
}

function renderTitleBlock(doc, document) {
  const width = contentWidth()
  const compact = document.type !== 'guide'
  const start = doc.y
  doc.fillColor(colors.navy).font('Helvetica-Bold').fontSize(compact ? 21 : 26)
  let title = document.title
  if (doc.widthOfString(title) > width) {
    const words = title.split(' ')
    let best = Infinity
    for (let index = 1; index < words.length; index += 1) {
      const left = words.slice(0, index).join(' ')
      const right = words.slice(index).join(' ')
      const widths = [doc.widthOfString(left), doc.widthOfString(right)]
      const difference = Math.abs(widths[0] - widths[1])
      if (Math.max(...widths) <= width && difference < best) {
        title = `${left}\n${right}`
        best = difference
      }
    }
  }
  doc.text(title, page.left, start, { width, lineGap: 2 })
  const subtitleY = doc.y + 5
  doc.fillColor(colors.gray).font('Helvetica').fontSize(compact ? 9 : 10.5)
  doc.text(document.subtitle, page.left, subtitleY, { width, lineGap: 1.5 })
  doc.y += compact ? 12 : 18
}

/** @param {Block | null | undefined} [previousBlock] */
export function blockMetrics(doc, block, options, previousBlock = null) {
  const { width, fontSize, headingSize, lineGap, gap } = options
  // Callouts already separate their heading from the preceding text with panel padding.
  const before = block.type === 'heading' && previousBlock && previousBlock.type !== 'heading'
    ? spacing.section : 0
  if (block.type === 'heading') {
    // The last line has no following line: do not include its interline gap in the accent.
    const titleHeight = measure(doc, block.text, width - 9, headingSize, true, lineGap) - lineGap
    return { height: before + titleHeight + spacing.headingToBody, titleHeight, before }
  }
  if (block.type === 'callout') {
    const titleHeight = measure(doc, block.title, width - 24, headingSize, true, lineGap) - lineGap
    const bodyHeight = measure(doc, block.text, width - 24, fontSize, false, lineGap)
    const boxHeight = spacing.calloutPadding * 2 + titleHeight + spacing.headingToBody + bodyHeight
    return { height: before + boxHeight + gap, titleHeight, boxHeight, before }
  }
  const indent = block.type === 'item' ? 14 : 0
  return { height: measure(doc, block.text, width - indent, fontSize, false, lineGap) + gap, before }
}

const urlPattern = /\b(?:https?:\/\/)?(?:[a-z0-9-]+\.)+(?:com|org|gov|us|app)(?:\/[^\s<>]*)?/gi

function linkedText(doc, text, x, y, options) {
  const segments = []
  let offset = 0
  for (const match of text.matchAll(urlPattern)) {
    const raw = match[0].replace(/[).,;]+$/, '')
    if (match.index > offset) segments.push({ text: text.slice(offset, match.index) })
    segments.push({ text: raw, link: raw.startsWith('http') ? raw : `https://${raw}` })
    offset = match.index + raw.length
  }
  if (offset < text.length) segments.push({ text: text.slice(offset) })
  for (const [index, segment] of segments.entries()) {
    const settings = {
      ...options, continued: index < segments.length - 1,
      link: segment.link ?? null, underline: Boolean(segment.link),
    }
    if (index === 0) doc.text(segment.text, x, y, settings)
    else doc.text(segment.text, settings)
  }
}

/**
 * @param {any} doc
 * @param {Block} block
 * @param {any} options
 * @param {number} x
 * @param {number} y
 * @param {Block | null | undefined} [previousBlock]
 */
export function renderBlock(doc, block, options, x, y, previousBlock = null) {
  const { width, fontSize, headingSize, lineGap } = options
  const { height, titleHeight, boxHeight, before } = blockMetrics(doc, block, options, previousBlock)
  const start = y
  y += before
  if (block.type === 'heading') {
    doc.rect(x, y, 3, titleHeight).fill(colors.orange)
    doc.fillColor(colors.navy).font('Helvetica-Bold').fontSize(headingSize)
    centeredHeading(doc, block.text, x + 9, y, { width: width - 9, lineGap })
  } else if (block.type === 'callout') {
    doc.rect(x, y, width, boxHeight).fill(colors.lightBlue)
    doc.rect(x, y, 3, boxHeight).fill(colors.orange)
    doc.fillColor(colors.navy).font('Helvetica-Bold').fontSize(headingSize)
    const titleY = y + spacing.calloutPadding
    centeredHeading(doc, block.title, x + 12, titleY, { width: width - 24, lineGap })
    doc.font('Helvetica').fontSize(fontSize)
    linkedText(doc, block.text, x + 12, titleY + titleHeight + spacing.headingToBody, { width: width - 24, lineGap })
  } else {
    const indent = block.type === 'item' ? 14 : 0
    if (block.type === 'item') {
      doc.font('Helvetica').fontSize(fontSize)
      drawMarker(doc, block.marker, x, y, indent, lineGap)
    }
    doc.fillColor(colors.navy).font('Helvetica').fontSize(fontSize)
    linkedText(doc, block.text, x + indent, y, { width: width - indent, lineGap })
  }
  doc.y = start + height
}

export function splitBlock(doc, block, options, available) {
  if (block.type === 'heading') return null
  const words = block.text.split(' ')
  // Split only at word boundaries and keep at least two lines on each side.
  let low = 1
  let high = words.length - 1
  let fit = 0
  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    if (blockMetrics(doc, { ...block, text: words.slice(0, mid).join(' ') }, options).height <= available) {
      fit = mid
      low = mid + 1
    } else high = mid - 1
  }
  if (!fit) return null
  const first = { ...block, text: words.slice(0, fit).join(' ') }
  const rest = { ...block, text: words.slice(fit).join(' ') }
  if (block.type === 'callout') rest.title = `${block.title} (continued)`
  if (block.type === 'item') rest.marker = ''
  const minimum = 2 * (options.fontSize + options.lineGap)
  if (blockMetrics(doc, first, options).height < minimum
    || blockMetrics(doc, rest, options).height < minimum) return null
  return [first, rest]
}

export function balancedSplit(doc, blocks, options, available) {
  const metrics = blocks.map((block, index) => blockMetrics(doc, block, options, blocks[index - 1]))
  const heights = metrics.map(({ height }) => height)
  const total = heights.reduce((sum, height) => sum + height, 0)
  let split = null
  let score = Infinity
  let left = 0
  for (let index = 0; index < blocks.length - 1; index += 1) {
    left += heights[index]
    if (blocks[index].type === 'heading') continue
    if (/^\d/.test(blocks[index].marker) && /^\d/.test(blocks[index + 1].marker)) continue
    const right = total - left - metrics[index + 1].before
    if (Math.max(left, right) > available) continue
    // Prefer section boundaries over perfectly equal column lengths.
    const candidate = Math.abs(left - right) + (blocks[index + 1].type === 'heading' ? 0 : 100)
    if (candidate < score) {
      score = candidate
      split = index + 1
    }
  }
  return split
}

/** @returns {{top: number, columns: {type: string, text: string, title?: string, marker?: string}[][]}[]} */
export function planColumns(doc, blocks, options) {
  const queue = blocks.map((block) => ({ ...block }))
  const pages = [{ top: options.firstTop, columns: [[], []] }]
  let column = 0
  let currentPage = pages[0]
  let startY = currentPage.top
  let y = startY
  const nextColumn = () => {
    if (column === 0) column = 1
    else {
      currentPage = { top: options.nextTop, columns: [[], []] }
      pages.push(currentPage)
      startY = currentPage.top
      column = 0
    }
    y = startY
  }
  for (let index = 0; index < queue.length; index += 1) {
    const block = queue[index]
    let previous = currentPage.columns[column].at(-1)
    let height = blockMetrics(doc, block, options, previous).height
    let keepHeight = height
    if (block.type === 'heading') {
      // Keep consecutive headings with at least the beginning of their content.
      for (let next = index + 1; next < queue.length; next += 1) {
        const following = queue[next]
        let h = blockMetrics(doc, following, options, queue[next - 1]).height
        if (/^\d/.test(following.marker)) {
          let procedureHeight = h
          for (let step = next + 1; step < queue.length && /^\d/.test(queue[step].marker); step += 1) {
            procedureHeight += blockMetrics(doc, queue[step], options, queue[step - 1]).height
          }
          // Keep a short procedure with its heading; long procedures may still flow normally.
          const topHeight = blockMetrics(doc, block, options).height
          if (keepHeight - height + topHeight + procedureHeight <= options.bottom - startY) h = procedureHeight
        }
        keepHeight += following.type === 'heading' ? h
          : Math.min(h, options.bottom - startY - keepHeight)
        if (following.type !== 'heading') break
      }
    }
    if (y + keepHeight > options.bottom) {
      if (y > startY && currentPage.columns[column].at(-1)?.type !== 'heading') nextColumn()
      previous = currentPage.columns[column].at(-1)
      height = blockMetrics(doc, block, options, previous).height
    }
    if (y + height > options.bottom) {
      const parts = splitBlock(doc, block, options, options.bottom - y)
      if (!parts) throw new Error(`Block cannot fit safely: ${block.text.slice(0, 70)}`)
      queue.splice(index, 1, ...parts)
      index -= 1
      continue
    }
    currentPage.columns[column].push(block)
    y += height
  }
  const finalBlocks = currentPage.columns.flat()
  const split = balancedSplit(doc, finalBlocks, options, options.bottom - currentPage.top)
  if (split) currentPage.columns = [finalBlocks.slice(0, split), finalBlocks.slice(split)]
  return pages
}

function renderColumns(doc, columns, top, options) {
  let maxY = top
  for (const [column, blocks] of columns.entries()) {
    let y = top
    for (const [index, block] of blocks.entries()) {
      renderBlock(doc, block, options, page.left + column * (options.width + 20), y, blocks[index - 1])
      y = doc.y
    }
    maxY = Math.max(maxY, y)
  }
  doc.y = maxY
}

function flowColumns(doc, document, blocks, options) {
  const nextTop = page.top + measure(doc, document.title, contentWidth(), 9, true, 1) + 12
  const plans = planColumns(doc, blocks, { ...options, firstTop: doc.y, nextTop })
  if (document.type === 'card' && plans.length !== 1) {
    throw new Error(`${document.slug}: field card exceeds one page`)
  }
  for (const [index, plan] of plans.entries()) {
    if (index > 0) addPage(doc, document)
    renderColumns(doc, plan.columns, plan.top, options)
  }
}

export function qrLayout(doc, links) {
  const gap = 12
  const width = (contentWidth() - gap * (links.length - 1)) / links.length
  const captionTop = 86
  const captionHeight = Math.max(...links.map(([label]) => measure(doc, label, width, 8, true, 1)))
  return { gap, width, captionTop, height: Math.max(112, captionTop + captionHeight + 5) }
}

export async function renderQrLinks(doc, links, y) {
  if (!links?.length) return
  const { gap, width, captionTop, height } = qrLayout(doc, links)
  if (y + height > bottomLimit()) throw new Error('QR resources exceed the content area')
  doc.fillColor(colors.gray).font('Helvetica').fontSize(8)
  doc.text('Scan a code or click a label to open the resource.', page.left, y, { width: contentWidth() })
  for (const [index, [label, url]] of links.entries()) {
    const x = page.left + index * (width + gap)
    const image = await QRCode.toBuffer(url, {
      errorCorrectionLevel: 'M', margin: 4, scale: 6,
      color: { dark: '#102a43', light: '#ffffff' },
    })
    doc.image(image, x + (width - 70) / 2, y + 15, { width: 70, height: 70 })
    doc.link(x + (width - 70) / 2, y + 15, 70, 70, url)
    doc.fillColor(colors.navy).font('Helvetica-Bold').fontSize(8)
    doc.text(label, x, y + captionTop, { width, align: 'center', lineGap: 1, link: url, underline: true })
  }
  doc.y = y + height
}

async function renderGuide(doc, document, blocks) {
  addPage(doc, document)
  renderTitleBlock(doc, document)
  flowColumns(doc, document, blocks, {
    width: (contentWidth() - 20) / 2,
    fontSize: 10, headingSize: 11.5, lineGap: 1.3, gap: 5,
    bottom: bottomLimit(),
  })
}

async function renderCard(doc, document, blocks) {
  addPage(doc, document)
  renderTitleBlock(doc, document)
  const qrTop = bottomLimit() - (document.qrLinks?.length ? qrLayout(doc, document.qrLinks).height : 0)
  const options = {
    width: (contentWidth() - 20) / 2,
    fontSize: 9.5, headingSize: 10.5, lineGap: 1.1, gap: 5,
    bottom: document.qrLinks?.length ? qrTop - 12 : bottomLimit(),
  }
  const split = balancedSplit(doc, blocks, options, options.bottom - doc.y)
  if (split) {
    renderColumns(doc, [blocks.slice(0, split), blocks.slice(split)], doc.y, options)
  } else flowColumns(doc, document, blocks, options)
  if (doc.y > options.bottom + 0.5) throw new Error(`${document.slug}: card overlaps QR area`)
  await renderQrLinks(doc, document.qrLinks, qrTop)
}

export function renderForm(doc, document, blocks) {
  addPage(doc, document)
  renderTitleBlock(doc, document)
  const width = contentWidth()
  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index]
    const y = doc.y
    if (block.type === 'heading') {
      const titleHeight = measure(doc, block.text, width - 12, 9, true, 0)
      const boxHeight = titleHeight + spacing.formHeadingPadding * 2
      doc.rect(page.left, y, width, boxHeight).fill(colors.lightBlue)
      doc.fillColor(colors.navy).font('Helvetica-Bold').fontSize(9)
      centeredHeading(doc, block.text, page.left + 6, y + spacing.formHeadingPadding, { width: width - 12, lineGap: 0 })
      doc.y = y + boxHeight + spacing.headingToBody
    } else if (block.type === 'item') {
      const items = []
      while (blocks[index]?.type === 'item') items.push(blocks[index++].text)
      index -= 1
      const cellWidth = width / 3
      const rowHeight = Math.max(16, ...items.map(text => measure(doc, text, cellWidth - 16, 8, false, 0) + 5))
      for (const [itemIndex, text] of items.entries()) {
        const x = page.left + (itemIndex % 3) * cellWidth
        const rowY = y + Math.floor(itemIndex / 3) * rowHeight
        doc.fillColor(colors.navy).font('Helvetica').fontSize(8)
        drawMarker(doc, 'check', x, rowY, 12)
        doc.fillColor(colors.navy)
        doc.text(text, x + 12, rowY, { width: cellWidth - 16 })
      }
      doc.y = y + Math.ceil(items.length / 3) * rowHeight + 3
    } else if (block.type === 'field') {
      const labels = block.text.split(' | ')
      const cellWidth = (width - (labels.length - 1) * 20) / labels.length
      const rowHeight = Math.max(
        /Planned Route|Overdue Instructions/.test(block.text) ? 32 : 24,
        ...labels.map(label => measure(doc, label, cellWidth, 8, false, 0) + 15),
      )
      for (const [labelIndex, label] of labels.entries()) {
        const x = page.left + labelIndex * (cellWidth + 20)
        doc.fillColor(colors.navy).font('Helvetica').fontSize(8)
        doc.text(label, x, y, { width: cellWidth, lineGap: 0 })
        doc.strokeColor(colors.gray).lineWidth(0.5)
          .moveTo(x, y + rowHeight - 5).lineTo(x + cellWidth, y + rowHeight - 5).stroke()
      }
      doc.y = y + rowHeight
    } else {
      doc.fillColor(colors.navy).font('Helvetica').fontSize(8)
      linkedText(doc, block.text, page.left, y, { width, lineGap: 1 })
      doc.y += 6
    }
    if (doc.y > bottomLimit()) throw new Error(`${document.slug}: form exceeds one page (${doc.y})`)
  }
}

export function drawHeaderFooter(doc, document) {
  const range = doc.bufferedPageRange()
  for (let i = range.start; i < range.start + range.count; i += 1) {
    doc.switchToPage(i)
    doc.image(logoPath, page.left, 16, { width: 44, height: 44 })
    doc.fillColor(colors.navy).font('Helvetica-Bold').fontSize(10)
    doc.text('PIERCE COUNTY 4x4', page.left + 55, 21, { width: 310 })
    doc.text('SEARCH & RESCUE', page.left + 55, 34, { width: 310 })
    doc.fillColor(colors.gray).font('Helvetica').fontSize(8)
    doc.text('Volunteer service • Pierce County, Washington', page.left + 55, 48, { width: 310 })
    doc.roundedRect(page.width - page.right - 99, 20, 99, 37, 3).fill(colors.orange)
    doc.fillColor(colors.navy).font('Helvetica-Bold').fontSize(8)
    const labelHeight = fontMetrics(doc).capHeight
    doc.fontSize(12)
    const callHeight = fontMetrics(doc).capHeight
    const labelY = 20 + (37 - labelHeight - spacing.headingToBody - callHeight) / 2
    doc.fontSize(8).text(document.type === 'form' ? 'IF OVERDUE' : 'EMERGENCY',
      page.width - page.right - 95, labelY + labelHeight, { width: 91, align: 'center', baseline: 'alphabetic' })
    doc.fontSize(12).text('CALL 911', page.width - page.right - 95,
      labelY + labelHeight + spacing.headingToBody + callHeight, { width: 91, align: 'center', baseline: 'alphabetic' })
    doc.strokeColor(colors.orange).lineWidth(1.5)
      .moveTo(page.left, 70).lineTo(page.width - page.right, 70).stroke()
    const footerY = page.height - page.footerHeight
    doc.strokeColor(colors.border).lineWidth(0.7)
    doc.moveTo(page.left, footerY).lineTo(page.width - page.right, footerY).stroke()
    doc.fillColor(colors.navy).font('Helvetica-Bold').fontSize(8)
    doc.text(`${SITE_DOMAIN}/safety`, page.left, footerY + 9, {
      width: 140, link: `${SITE_URL}/safety#safety-guides`,
    })
    doc.fillColor(colors.gray).font('Helvetica').fontSize(8)
    const note = document.type === 'form' ? 'Leave this plan with your emergency contact.'
      : document.type === 'card' ? 'Print at 100% • Laminate • Keep in your pack'
        : 'Outdoor safety series • Plan ahead. Come home safe.'
    doc.text(note, page.left + 145, footerY + 9, { width: 330 })
    doc.text(`${i + 1 - range.start} / ${range.count}`, page.width - page.right - 50, footerY + 9, {
      width: 50,
      align: 'right',
    })
  }
}

export async function renderDocument(doc, document, blocks) {
  if (document.type === 'card') {
    await renderCard(doc, document, blocks)
  } else if (document.type === 'form') {
    await renderForm(doc, document, blocks)
  } else {
    await renderGuide(doc, document, blocks)
  }

  drawHeaderFooter(doc, document)
  if (document.type !== 'guide' && doc.bufferedPageRange().count !== 1) {
    throw new Error(`${document.slug}: must remain one page`)
  }
}

async function writePdf(document) {
  const sourcePath = path.join(sourceDir, `${document.slug}.txt`)
  const outputPath = path.join(outputDir, `${document.slug}.pdf`)
  const source = fs.readFileSync(sourcePath, 'utf8')
  const blocks = parseSource(cleanSource(source, document))
  const doc = createDocument(document)
  const chunks = []

  doc.on('data', (chunk) => chunks.push(chunk))
  const done = new Promise((resolve, reject) => {
    doc.on('end', resolve)
    doc.on('error', reject)
  })

  await renderDocument(doc, document, blocks)
  doc.end()
  await done
  fs.writeFileSync(outputPath, Buffer.concat(chunks))
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  fs.mkdirSync(outputDir, { recursive: true })
  for (const document of documents) {
    await writePdf(document)
    console.log(`generated public/guides/${document.slug}.pdf`)
  }
}
