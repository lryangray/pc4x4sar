import { describe, expect, it, vi } from 'vitest'
import { getShareFeedback, shareResource } from './share'
import { SAFETY_LIBRARY_URL } from './data/safety-guides'

const content = {
  title: 'Free safety guide library',
  text: 'Free guides to view, download, print, and share.',
  url: SAFETY_LIBRARY_URL,
}

describe('shareResource', () => {
  it('uses native sharing when available and does not also copy', async () => {
    const share = vi.fn().mockResolvedValue(undefined)
    const copy = vi.fn().mockResolvedValue(undefined)
    const result = await shareResource(content, { share, copy })
    expect(share).toHaveBeenCalledWith(content)
    expect(copy).not.toHaveBeenCalled()
    expect(result).toEqual({ status: 'shared' })
    expect(getShareFeedback(result)).toBe('Link passed to your sharing app.')
  })

  it('does not copy or claim success when sharing is canceled', async () => {
    const share = vi.fn().mockRejectedValue({ name: 'AbortError' })
    const copy = vi.fn()
    const result = await shareResource(content, { share, copy })
    expect(result).toEqual({ status: 'cancelled' })
    expect(copy).not.toHaveBeenCalled()
    expect(getShareFeedback(result)).toBe('Sharing canceled. Nothing was copied.')
  })

  it('copies the canonical URL when native sharing is unavailable', async () => {
    const copy = vi.fn().mockResolvedValue(undefined)
    const result = await shareResource(content, { copy })
    expect(copy).toHaveBeenCalledWith(SAFETY_LIBRARY_URL)
    expect(result).toEqual({ status: 'copied', shareFailed: false })
    expect(getShareFeedback(result)).toBe('Link copied — paste it into a message.')
  })

  it.each(['NotAllowedError', 'TypeError', 'UnknownError'])('reports %s native failures even if copying succeeds', async (name) => {
    const share = vi.fn().mockRejectedValue({ name })
    const copy = vi.fn().mockResolvedValue(undefined)
    const result = await shareResource(content, { share, copy })
    expect(result).toEqual({ status: 'copied', shareFailed: true })
    expect(getShareFeedback(result)).toBe('Sharing did not complete. Link copied instead — paste it into a message.')
  })

  it('offers a manual URL when neither browser API is available', async () => {
    const result = await shareResource(content, {})
    expect(result).toEqual({ status: 'manual', shareFailed: false, clipboardFailed: false })
    expect(getShareFeedback(result)).toBe('Automatic copying is unavailable. Select and copy the link below.')
  })

  it('never claims copied after a clipboard rejection', async () => {
    const copy = vi.fn().mockRejectedValue(new Error('Clipboard denied'))
    const result = await shareResource(content, { copy })
    expect(result).toEqual({ status: 'manual', shareFailed: false, clipboardFailed: true })
    expect(getShareFeedback(result)).toBe('The link could not be copied. Select and copy the link below.')
  })

  it('reports both failures and keeps a manual fallback', async () => {
    const share = vi.fn().mockRejectedValue(new Error('Share failed'))
    const copy = vi.fn().mockRejectedValue(new Error('Copy failed'))
    const result = await shareResource(content, { share, copy })
    expect(result).toEqual({ status: 'manual', shareFailed: true, clipboardFailed: true })
    expect(getShareFeedback(result)).toBe('Sharing did not complete. The link could not be copied. Select and copy the link below.')
  })

  it('reports native failure when there is no clipboard API', async () => {
    const share = vi.fn().mockRejectedValue(new Error('Share failed'))
    const result = await shareResource(content, { share })
    expect(result).toEqual({ status: 'manual', shareFailed: true, clipboardFailed: false })
    expect(getShareFeedback(result)).toBe('Sharing did not complete. Automatic copying is unavailable. Select and copy the link below.')
  })

  it('also handles synchronously thrown errors', async () => {
    const result = await shareResource(content, {
      share: () => { throw new Error('Share failed') },
      copy: () => { throw new Error('Copy failed') },
    })
    expect(result).toEqual({ status: 'manual', shareFailed: true, clipboardFailed: true })
  })

  it('waits for clipboard completion rather than reporting premature success', async () => {
    let finishCopy!: () => void
    const copying = new Promise<void>((resolve) => { finishCopy = resolve })
    const result = shareResource(content, { copy: () => copying })
    const onResult = vi.fn()
    void result.then(onResult)
    await Promise.resolve()
    expect(onResult).not.toHaveBeenCalled()
    finishCopy()
    expect(await result).toEqual({ status: 'copied', shareFailed: false })
  })
})
