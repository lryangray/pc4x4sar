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
const ADDRESS = '2501 S. 35th St. Suite D, Tacoma, WA 98409'

const colors = {
  navy: '#0a1628',
  orange: '#e8651a',
  tan: '#f6efe6',
  lightBlue: '#eaf1f8',
  gray: '#4b5563',
  border: '#d6dce5',
}

const page = {
  width: 612,
  height: 792,
  left: 48,
  right: 48,
  top: 70,
  bottom: 58,
  headerHeight: 48,
  footerHeight: 42,
}

const documents = [
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
])

function normalizeText(text) {
  return text
    .replace(/ {2,}/g, ' ')
    .replace(/\s+([,.;:])/g, '$1')
    .replace(/\bTip:\s+/g, '')
    .trim()
}

function isHeading(text) {
  if (calloutHeadings.has(text)) return true
  if (text.endsWith(':') && text.length < 32) return true
  const letters = text.replace(/[^A-Za-z]/g, '')
  return letters.length > 3 && text === text.toUpperCase() && text.length < 70
}

function parseSource(source) {
  const rawBlocks = source
    .replace(/\r/g, '')
    .split(/\n\s*\n/g)
    .map((block) => block.split('\n').map((line) => line.trim()).filter(Boolean))
    .filter((block) => block.length > 0)

  const blocks = []
  for (let index = 0; index < rawBlocks.length; index += 1) {
    const lines = rawBlocks[index]
    const text = normalizeText(lines.join(' '))

    if (!text) continue

    if (isHeading(text)) {
      const nextLines = rawBlocks[index + 1] ?? []
      const nextText = normalizeText(nextLines.join(' '))
      if (
        (calloutHeadings.has(text) || text === 'SAR PRO TIP:' || text.startsWith('CRITICAL'))
        && nextText
        && !isHeading(nextText)
      ) {
        blocks.push({ type: 'callout', title: text.replace(/:$/, ''), text: nextText })
        index += 1
      } else {
        blocks.push({ type: 'heading', text: text.replace(/:$/, '') })
      }
      continue
    }

    if (lines.some((line) => /^[❑•-]\s+/.test(line.trim()))) {
      const items = []
      let current = ''
      for (const line of lines) {
        if (/^[❑•-]\s+/.test(line)) {
          if (current) items.push(normalizeText(current))
          current = line.replace(/^[❑•-]\s+/, '')
        } else {
          current = `${current} ${line}`.trim()
        }
      }
      if (current) items.push(normalizeText(current))
      blocks.push({ type: 'list', items })
      continue
    }

    blocks.push({ type: 'paragraph', text })
  }

  return blocks
}

function removeExtractedBoilerplate(blocks, document) {
  return blocks.filter((block) => {
    const text = block.text ?? block.title ?? ''
    if (!text) return true
    if (text === document.title || text === document.subtitle) return false
    if (text.startsWith(`${document.title} EMERGENCY`)) return false
    if (text.startsWith(`${ORG_NAME} | ${SITE_DOMAIN}`)) return false
    if (text.startsWith(`${ORG_NAME} | 501(c)(3)`)) return false
    if (text.startsWith('TRIP PLAN IF OVERDUE')) return false
    return true
  })
}

function createDocument() {
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
      Author: ORG_NAME,
      Subject: 'Outdoor safety guide',
      Keywords: 'search and rescue, Pierce County, outdoor safety',
    },
  })
}

function drawLogo(doc, x, y, size) {
  doc.circle(x + size / 2, y + size / 2, size / 2).fill(colors.navy)
  doc.circle(x + size / 2, y + size / 2 - 2, size * 0.32).fill(colors.orange)
  doc.fillColor('white').font('Helvetica-Bold').fontSize(size * 0.24)
  doc.text('4x4', x, y + size * 0.34, { width: size, align: 'center' })
  doc.fillColor('white').fontSize(size * 0.08)
  doc.text('SAR', x, y + size * 0.62, { width: size, align: 'center' })
}

function addPage(doc) {
  doc.addPage()
  doc.y = page.top
}

function contentWidth() {
  return page.width - page.left - page.right
}

function bottomLimit() {
  return page.height - page.bottom - page.footerHeight
}

function ensureSpace(doc, height, options = {}) {
  const limit = options.bottomLimit ?? bottomLimit()
  if (doc.y + height <= limit) return
  if (options.disableBreak) return
  addPage(doc)
}

function textHeight(doc, text, options = {}) {
  return doc.heightOfString(text, {
    width: options.width ?? contentWidth(),
    lineGap: options.lineGap ?? 2,
  })
}

function renderTitleBlock(doc, document) {
  const width = contentWidth()
  if (document.type === 'form') {
    doc.fillColor(colors.navy).font('Helvetica-Bold').fontSize(18)
    doc.text(document.title, page.left, doc.y, { width, align: 'center' })
    doc.moveDown(0.15)
    doc.fillColor(colors.gray).font('Helvetica').fontSize(8.2)
    doc.text(document.subtitle, page.left + 35, doc.y, { width: width - 70, align: 'center', lineGap: 1 })
    doc.moveDown(0.35)
    doc
      .strokeColor(colors.orange)
      .lineWidth(1.4)
      .moveTo(page.left + 120, doc.y)
      .lineTo(page.width - page.right - 120, doc.y)
      .stroke()
    doc.moveDown(0.45)
    return
  }

  const logoSize = document.type === 'form' ? 34 : 44
  drawLogo(doc, page.left + width / 2 - logoSize / 2, doc.y, logoSize)
  doc.moveDown(document.type === 'form' ? 2.1 : 2.9)
  doc.fillColor(colors.navy).font('Helvetica-Bold').fontSize(document.type === 'guide' ? 24 : 20)
  doc.text(document.title, page.left, doc.y, { width, align: 'center' })
  doc.moveDown(0.2)
  doc.fillColor(colors.gray).font('Helvetica').fontSize(document.type === 'form' ? 8.5 : 10)
  doc.text(document.subtitle, page.left + 35, doc.y, { width: width - 70, align: 'center', lineGap: 2 })
  doc.moveDown(document.type === 'form' ? 0.45 : 0.8)
  doc
    .strokeColor(colors.orange)
    .lineWidth(2)
    .moveTo(page.left + 120, doc.y)
    .lineTo(page.width - page.right - 120, doc.y)
    .stroke()
  doc.moveDown(0.7)
}

function renderHeading(doc, block, options = {}) {
  const width = options.width ?? contentWidth()
  const fontSize = options.fontSize ?? 12
  const height = textHeight(doc.font('Helvetica-Bold').fontSize(fontSize), block.text, { width }) + 12
  ensureSpace(doc, height, options)
  doc.moveDown(0.25)
  doc.fillColor(colors.orange).font('Helvetica-Bold').fontSize(fontSize)
  doc.text(block.text.toUpperCase(), options.x ?? page.left, doc.y, { width, lineGap: 1 })
  doc.moveDown(0.15)
  doc
    .strokeColor(colors.orange)
    .lineWidth(1)
    .moveTo(options.x ?? page.left, doc.y)
    .lineTo((options.x ?? page.left) + Math.min(width, 160), doc.y)
    .stroke()
  doc.moveDown(0.25)
}

function renderParagraph(doc, block, options = {}) {
  const width = options.width ?? contentWidth()
  const fontSize = options.fontSize ?? 9.7
  const x = options.x ?? page.left
  doc.font('Helvetica').fontSize(fontSize)
  const height = textHeight(doc, block.text, { width, lineGap: options.lineGap ?? 1.3 }) + 5
  ensureSpace(doc, height, options)
  doc.fillColor(colors.navy)
  doc.text(block.text, x, doc.y, { width, lineGap: options.lineGap ?? 1.3 })
  doc.moveDown(0.28)
}

function renderList(doc, block, options = {}) {
  const width = options.width ?? contentWidth()
  const fontSize = options.fontSize ?? 9.2
  const x = options.x ?? page.left
  for (const item of block.items) {
    doc.font('Helvetica').fontSize(fontSize)
    const height = Math.max(10, textHeight(doc, item, { width: width - 15, lineGap: options.lineGap ?? 0.6 })) + 3
    ensureSpace(doc, height, options)
    const startY = doc.y + 2
    doc.rect(x, startY + 2, 4, 4).fill(colors.orange)
    doc.fillColor(colors.navy).text(item, x + 13, doc.y, { width: width - 13, lineGap: options.lineGap ?? 0.6 })
    doc.moveDown(0.12)
  }
  doc.moveDown(0.12)
}

function renderCallout(doc, block, options = {}) {
  const width = options.width ?? contentWidth()
  const x = options.x ?? page.left
  const critical = /CRITICAL|911|STAY PUT|REMEMBER|KEY TAKEAWAYS|PACK IT|FROM OUR TEAM/i.test(block.title)
  const bodyFontSize = options.fontSize ?? 9.2
  const titleHeight = 14
  doc.font('Helvetica').fontSize(bodyFontSize)
  const bodyHeight = textHeight(doc, block.text, { width: width - 22, lineGap: options.lineGap ?? 1 })
  const height = titleHeight + bodyHeight + 20
  ensureSpace(doc, height + 5, options)
  const y = doc.y
  doc.roundedRect(x, y, width, height, 4).fill(critical ? colors.navy : colors.tan)
  doc.rect(x, y, 5, height).fill(colors.orange)
  doc.fillColor(critical ? 'white' : colors.navy).font('Helvetica-Bold').fontSize(10)
  doc.text(block.title.toUpperCase(), x + 14, y + 10, { width: width - 28 })
  doc.fillColor(critical ? 'white' : colors.navy).font('Helvetica').fontSize(bodyFontSize)
  doc.text(block.text, x + 14, y + 27, { width: width - 28, lineGap: options.lineGap ?? 1 })
  doc.y = y + height + 6
}

function renderBlock(doc, block, options = {}) {
  if (block.type === 'heading') renderHeading(doc, block, options)
  if (block.type === 'paragraph') renderParagraph(doc, block, options)
  if (block.type === 'list') renderList(doc, block, options)
  if (block.type === 'callout') renderCallout(doc, block, options)
}

async function qrDataUrl(url) {
  return QRCode.toDataURL(url, {
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 128,
    color: {
      dark: colors.navy,
      light: '#ffffff',
    },
  })
}

async function renderQrLinks(doc, links) {
  if (!links?.length) return
  const width = contentWidth()
  const gap = 10
  const columnWidth = (width - gap * (links.length - 1)) / links.length
  const boxHeight = 76
  ensureSpace(doc, boxHeight + 10)
  const y = doc.y

  for (const [index, [label, url]] of links.entries()) {
    const x = page.left + index * (columnWidth + gap)
    const dataUrl = await qrDataUrl(url)
    const image = Buffer.from(dataUrl.split(',')[1], 'base64')
    doc.roundedRect(x, y, columnWidth, boxHeight, 4).strokeColor(colors.border).stroke()
    doc.image(image, x + 8, y + 10, { width: 42, height: 42 })
    doc.fillColor(colors.navy).font('Helvetica-Bold').fontSize(7.5)
    doc.text(label, x + 55, y + 12, { width: columnWidth - 62, lineGap: 1 })
    doc.fillColor(colors.gray).font('Helvetica').fontSize(6.5)
    doc.text(shortenUrl(url), x + 55, y + 31, { width: columnWidth - 62, lineGap: 1 })
  }
  doc.y = y + boxHeight + 10
}

function estimateBlockHeight(doc, block, options = {}) {
  const width = options.width ?? contentWidth()
  const fontSize = options.fontSize ?? 9
  const lineGap = options.lineGap ?? 1
  if (block.type === 'heading') {
    doc.font('Helvetica-Bold').fontSize(fontSize)
    return textHeight(doc, block.text, { width, lineGap }) + 15
  }
  if (block.type === 'list') {
    doc.font('Helvetica').fontSize(fontSize)
    return block.items.reduce((total, item) => (
      total + Math.max(10, textHeight(doc, item, { width: width - 13, lineGap })) + 3
    ), 5)
  }
  if (block.type === 'callout') {
    doc.font('Helvetica').fontSize(fontSize)
    return textHeight(doc, block.text, { width: width - 28, lineGap }) + 38
  }
  doc.font('Helvetica').fontSize(fontSize)
  return textHeight(doc, block.text, { width, lineGap }) + 8
}

function flowColumns(doc, blocks, options) {
  const columnGap = options.columnGap ?? 18
  const columnCount = options.columnCount ?? 2
  const columnWidth = (contentWidth() - columnGap * (columnCount - 1)) / columnCount
  const startY = doc.y
  const columns = Array.from({ length: columnCount }, (_, index) => ({
    x: page.left + index * (columnWidth + columnGap),
    y: startY,
  }))
  let column = 0
  let columnBottom = options.bottomLimit ?? bottomLimit()
  doc.y = columns[column].y

  for (const block of blocks) {
    const renderOptions = {
      x: columns[column].x,
      width: columnWidth,
      fontSize: block.type === 'heading' ? options.headingSize : options.fontSize,
      lineGap: options.lineGap,
      bottomLimit: columnBottom,
      disableBreak: true,
    }
    const estimatedHeight = estimateBlockHeight(doc, block, renderOptions)
    if (doc.y + estimatedHeight > columnBottom) {
      if (column < columnCount - 1) {
        column += 1
        doc.y = columns[column].y
      } else {
        addPage(doc)
        column = 0
        columnBottom = options.bottomLimit ?? bottomLimit()
        for (const item of columns) item.y = page.top
        doc.y = page.top
      }
    }
    renderBlock(doc, block, {
      x: columns[column].x,
      width: columnWidth,
      fontSize: block.type === 'heading' ? options.headingSize : options.fontSize,
      lineGap: options.lineGap,
      bottomLimit: columnBottom,
      disableBreak: true,
    })
  }
}

function shortenUrl(url) {
  return url
    .replace(/^https?:\/\/(www\.)?/, '')
    .replace('t-mobile.com/coverage/satellite-phone-service/911-texting-signup', 't-mobile.com/satellite-911')
}

async function renderGuide(doc, document, blocks) {
  addPage(doc)
  renderTitleBlock(doc, document)
  flowColumns(doc, blocks, {
    columnCount: 2,
    columnGap: 20,
    fontSize: 8.7,
    headingSize: 10.2,
    lineGap: 0.9,
  })
  await renderQrLinks(doc, document.qrLinks)
}

async function renderCard(doc, document, blocks) {
  addPage(doc)
  renderTitleBlock(doc, document)
  flowColumns(doc, blocks, {
    columnCount: 2,
    columnGap: 18,
    fontSize: 6.6,
    headingSize: 7.8,
    lineGap: 0,
    bottomLimit: bottomLimit() - (document.qrLinks?.length ? 92 : 0),
  })
  doc.y = Math.max(doc.y, page.height - page.bottom - page.footerHeight - 88)
  await renderQrLinks(doc, document.qrLinks)
}

async function renderForm(doc, document, blocks) {
  addPage(doc)
  renderTitleBlock(doc, document)
  const rowHeight = 14
  const fullHeight = 18
  const gap = 18
  const halfWidth = (contentWidth() - gap) / 2

  const section = (title) => {
    doc.fillColor(colors.orange).font('Helvetica-Bold').fontSize(8.8)
    doc.text(title, page.left, doc.y, { width: contentWidth(), lineBreak: false })
    doc
      .strokeColor(colors.orange)
      .lineWidth(0.8)
      .moveTo(page.left, doc.y + 10)
      .lineTo(page.left + contentWidth(), doc.y + 10)
      .stroke()
    doc.y += 11
  }

  const field = (label, x, y, width) => {
    doc.fillColor(colors.navy).font('Helvetica-Bold').fontSize(6.4)
    doc.text(`${label}:`, x, y, { width, lineBreak: false })
    doc.strokeColor(colors.border).lineWidth(0.7)
    doc.moveTo(x + 86, y + 8).lineTo(x + width, y + 8).stroke()
  }

  const fullField = (label) => {
    const y = doc.y
    doc.fillColor(colors.navy).font('Helvetica-Bold').fontSize(6.4)
    doc.text(`${label}:`, page.left, y, { width: contentWidth(), lineBreak: false })
    doc.strokeColor(colors.border).lineWidth(0.7)
    doc.moveTo(page.left, y + 13).lineTo(page.width - page.right, y + 13).stroke()
    doc.y += fullHeight
  }

  const pair = (leftLabel, rightLabel) => {
    const y = doc.y
    field(leftLabel, page.left, y, halfWidth)
    field(rightLabel, page.left + halfWidth + gap, y, halfWidth)
    doc.y += rowHeight
  }

  section('PERSONAL INFORMATION')
  pair('Full Name', 'Phone Number')
  pair('Number in Group', 'Ages')
  fullField('Names of All Group Members')
  fullField('Medical Conditions / Medications / Allergies')

  section('TRIP DETAILS')
  pair('Destination / Trail Name', 'Date of Trip')
  fullField('Planned Route (trailhead, trail names, junctions, turnaround point)')
  fullField('Alternate Route / Backup Plan')
  pair('Departure Time', 'Expected Return Time')
  pair('Trailhead Parking Location', 'Latest Return Before Overdue')

  section('VEHICLE INFORMATION')
  pair('Vehicle Make / Model / Color', 'License Plate')
  fullField('Where Vehicle Will Be Parked')

  section('EMERGENCY CONTACT')
  pair('Contact Name', 'Contact Phone')

  section('TEN ESSENTIALS CHECK')
  const checklist = [
    'Map & compass', 'GPS / phone w/ offline maps', 'Headlamp', 'First aid kit',
    'Emergency shelter', 'Fire starting', 'Extra food', 'Extra water + filter',
    'Warm layers', 'Rain gear', 'Whistle', 'Satellite communicator',
  ]
  doc.font('Helvetica').fontSize(6.1)
  const colWidth = contentWidth() / 4
  checklist.forEach((item, index) => {
    const x = page.left + (index % 4) * colWidth
    const y = doc.y + Math.floor(index / 4) * 10
    doc.rect(x, y + 2, 5, 5).strokeColor(colors.border).stroke()
    doc.fillColor(colors.navy).text(item, x + 10, y, { width: colWidth - 12 })
  })
  doc.y += Math.ceil(checklist.length / 4) * 10 + 4
}

function drawHeaderFooter(doc, document) {
  const range = doc.bufferedPageRange()
  for (let i = range.start; i < range.start + range.count; i += 1) {
    doc.switchToPage(i)
    doc.rect(0, 0, page.width, page.headerHeight).fill(colors.navy)
    drawLogo(doc, 18, 8, 32)
    doc.fillColor('white').font('Helvetica-Bold').fontSize(8.5)
    doc.text('PIERCE COUNTY 4x4 SEARCH & RESCUE', 58, 9, { width: 300 })
    doc.fillColor('#dbe5ef').font('Helvetica').fontSize(7.2)
    doc.text(`${SITE_DOMAIN} | 501(c)(3) Non-Profit | Serving Since 1984`, 58, 25, { width: 310 })
    doc.roundedRect(page.width - 112, 9, 84, 30, 2).fill(colors.orange)
    doc.fillColor('white').font('Helvetica-Bold').fontSize(7.5)
    doc.text('EMERGENCY', page.width - 108, 14, { width: 76, align: 'center' })
    doc.text('CALL 911', page.width - 108, 25, { width: 76, align: 'center' })

    const footerY = page.height - page.footerHeight
    doc.strokeColor(colors.orange).lineWidth(0.7)
    doc.moveTo(page.left, footerY).lineTo(page.width - page.right, footerY).stroke()
    doc.fillColor(colors.gray).font('Helvetica').fontSize(6.7)
    if (document.type === 'guide') {
      doc.text(`${ORG_NAME} | ${ADDRESS} | ${SITE_DOMAIN}`, page.left, footerY + 8, {
        width: contentWidth() - 70,
        lineBreak: false,
      })
      doc.text('We do not charge for our services, nor do we receive tax dollars.', page.left, footerY + 20, {
        width: contentWidth() - 70,
        lineBreak: false,
      })
    } else {
      doc.text(`${ORG_NAME} | 501(c)(3) | ${SITE_DOMAIN} | Print, laminate, keep in your pack.`, page.left, footerY + 12, {
        width: contentWidth() - 70,
        lineBreak: false,
      })
    }
    doc.fillColor(colors.gray).font('Helvetica').fontSize(7)
    doc.text(`Page ${i + 1 - range.start}/${range.count}`, page.width - page.right - 54, footerY + 12, {
      width: 54,
      align: 'right',
      lineBreak: false,
    })
  }
}

async function writePdf(document) {
  const sourcePath = path.join(sourceDir, `${document.slug}.txt`)
  const outputPath = path.join(outputDir, `${document.slug}.pdf`)
  const source = fs.readFileSync(sourcePath, 'utf8')
  const blocks = removeExtractedBoilerplate(parseSource(source), document)
  const doc = createDocument()
  const chunks = []

  doc.on('data', (chunk) => chunks.push(chunk))
  const done = new Promise((resolve) => doc.on('end', resolve))

  if (document.type === 'card') {
    await renderCard(doc, document, blocks)
  } else if (document.type === 'form') {
    await renderForm(doc, document, blocks)
  } else {
    await renderGuide(doc, document, blocks)
  }

  drawHeaderFooter(doc, document)
  doc.end()
  await done
  fs.writeFileSync(outputPath, Buffer.concat(chunks))
}

fs.mkdirSync(outputDir, { recursive: true })
for (const document of documents) {
  await writePdf(document)
  console.log(`generated public/guides/${document.slug}.pdf`)
}
