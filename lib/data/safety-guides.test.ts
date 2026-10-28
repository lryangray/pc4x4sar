import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { capabilities } from './content'
import {
  featuredGuides,
  getGuideUrl,
  guideCategories,
  safetyGuides,
  SAFETY_LIBRARY_ID,
  SAFETY_LIBRARY_PATH,
  SAFETY_LIBRARY_URL,
} from './safety-guides'
import { SITE_URL } from '../site'

describe('safety guide metadata', () => {
  it('keeps the complete library in three non-empty categories', () => {
    expect(guideCategories.map((category) => category.items.length)).toEqual([4, 6, 5])
    expect(safetyGuides).toHaveLength(15)
    expect(guideCategories.every((category) => category.heading && category.description)).toBe(true)
  })

  it('uses unique, stable anchors, titles, and PDF paths', () => {
    const ids = [SAFETY_LIBRARY_ID, ...guideCategories.map((category) => category.id), ...safetyGuides.map((guide) => guide.id)]
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids.every((id) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))).toBe(true)
    expect(new Set(safetyGuides.map((guide) => guide.file)).size).toBe(safetyGuides.length)
    expect(new Set(safetyGuides.map((guide) => guide.title)).size).toBe(safetyGuides.length)
  })

  it('features only the checklist, essentials guide, and trip plan in that order', () => {
    expect(featuredGuides.map((guide) => guide.id)).toEqual([
      'trip-planning-checklist',
      'ten-essentials-guide',
      'trip-plan-form',
    ])
    expect(new Set(featuredGuides.map((guide) => guide.featuredOrder)).size).toBe(featuredGuides.length)
    expect(featuredGuides.every((guide) => safetyGuides.includes(guide))).toBe(true)
  })

  it.each(safetyGuides)('$title points to an existing PDF', (guide) => {
    expect(guide.title.length).toBeGreaterThan(0)
    expect(guide.description.length).toBeGreaterThan(0)
    expect(guide.file).toMatch(/^\/guides\/[a-z0-9-]+\.pdf$/)
    const filePath = resolve(process.cwd(), 'public', ...guide.file.slice(1).split('/'))
    expect(existsSync(filePath)).toBe(true)
    expect(readFileSync(filePath).subarray(0, 5).toString()).toBe('%PDF-')
  })

  it('shares the canonical library anchor and individual production PDF URLs', () => {
    expect(SAFETY_LIBRARY_PATH).toBe(`/safety#${SAFETY_LIBRARY_ID}`)
    expect(SAFETY_LIBRARY_URL).toBe(`${SITE_URL}${SAFETY_LIBRARY_PATH}`)
    expect(new URL(SAFETY_LIBRARY_URL).origin).toBe('https://pcsar4x4.org')
    for (const guide of safetyGuides) {
      expect(getGuideUrl(guide)).toBe(`${SITE_URL}${guide.file}`)
      expect(new URL(getGuideUrl(guide)).pathname).toBe(guide.file)
    }
  })
})

describe('unit resource images', () => {
  it('assigns the verified vehicle, ATV, and snowmobile photos', () => {
    expect(capabilities.map(({ category, image }) => ({ category, image }))).toEqual([
      { category: '4x4 Vehicles', image: '/images/cap-vehicles-aerial.jpg' },
      { category: 'ATV & Dual Sport', image: '/images/gallery-atv-creek.jpg' },
      { category: 'Tracked Vehicles', image: '/images/gallery-sheriff-snowmobiles.jpg' },
    ])
    expect(capabilities.find((item) => item.category === 'ATV & Dual Sport')?.imageAlt).toMatch(/ATVs.*rocky creek/)
    expect(capabilities.find((item) => item.category === 'Tracked Vehicles')?.imageAlt).toMatch(/sheriff snowmobiles.*snowy/)
    for (const capability of capabilities) {
      expect(existsSync(resolve(process.cwd(), 'public', ...capability.image.slice(1).split('/')))).toBe(true)
    }
  })
})
