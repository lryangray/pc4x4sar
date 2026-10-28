export type ShareContent = {
  title: string
  text: string
  url: string
}

export type ShareCapabilities = {
  share?: (content: ShareContent) => Promise<void>
  copy?: (text: string) => Promise<void>
}

export type ShareResult =
  | { status: 'shared' | 'cancelled' }
  | { status: 'copied'; shareFailed: boolean }
  | { status: 'manual'; shareFailed: boolean; clipboardFailed: boolean }

export async function shareResource(
  content: ShareContent,
  capabilities: ShareCapabilities,
): Promise<ShareResult> {
  let shareFailed = false

  if (capabilities.share) {
    try {
      await capabilities.share(content)
      return { status: 'shared' }
    } catch (error) {
      if (error && typeof error === 'object' && 'name' in error && error.name === 'AbortError') {
        return { status: 'cancelled' }
      }
      shareFailed = true
    }
  }

  if (capabilities.copy) {
    try {
      await capabilities.copy(content.url)
      return { status: 'copied', shareFailed }
    } catch {
      return { status: 'manual', shareFailed, clipboardFailed: true }
    }
  }

  return { status: 'manual', shareFailed, clipboardFailed: false }
}

export function getShareFeedback(result: ShareResult): string {
  switch (result.status) {
    case 'shared':
      return 'Link passed to your sharing app.'
    case 'cancelled':
      return 'Sharing canceled. Nothing was copied.'
    case 'copied':
      return result.shareFailed
        ? 'Sharing did not complete. Link copied instead — paste it into a message.'
        : 'Link copied — paste it into a message.'
    case 'manual':
      return [
        result.shareFailed ? 'Sharing did not complete.' : '',
        result.clipboardFailed ? 'The link could not be copied.' : 'Automatic copying is unavailable.',
        'Select and copy the link below.',
      ].filter(Boolean).join(' ')
  }
}
