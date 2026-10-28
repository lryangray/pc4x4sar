'use client'

import { useId, useRef, useState } from 'react'
import { getShareFeedback, shareResource, type ShareContent, type ShareResult } from '@/lib/share'

type ResourceShareProps = ShareContent & {
  label: string
  className?: string
}

export default function ResourceShare({ title, text, url, label, className = '' }: ResourceShareProps) {
  const inputId = useId()
  const inFlight = useRef(false)
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<ShareResult | null>(null)
  const showLink = result?.status === 'manual' || result?.status === 'copied'

  async function handleShare() {
    if (inFlight.current) return
    inFlight.current = true
    setBusy(true)
    setResult(null)

    try {
      setResult(await shareResource(
        { title, text, url },
        {
          share: typeof navigator.share === 'function'
            ? (content) => navigator.share(content)
            : undefined,
          copy: typeof navigator.clipboard?.writeText === 'function'
            ? (value) => navigator.clipboard.writeText(value)
            : undefined,
        },
      ))
    } finally {
      inFlight.current = false
      setBusy(false)
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleShare}
        disabled={busy}
        aria-label={`${label}: ${title}`}
        className="guide-action border border-navy-300 bg-white text-navy-800 hover:bg-navy-50 disabled:opacity-60"
      >
        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.7 10.7l6.6-3.4m-6.6 6l6.6 3.4M9 12a3 3 0 11-6 0 3 3 0 016 0zm12-6a3 3 0 11-6 0 3 3 0 016 0zm0 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {busy ? 'Sharing…' : label}
      </button>
      <p role="status" aria-live="polite" aria-atomic="true" className={result ? 'mt-2 text-sm leading-relaxed' : 'sr-only'}>
        {result ? getShareFeedback(result) : ''}
      </p>
      {showLink && (
        <div className="mt-2">
          <label htmlFor={inputId} className="block text-sm font-semibold mb-1">
            Link to {title}
          </label>
          <input
            id={inputId}
            type="text"
            readOnly
            value={url}
            onFocus={(event) => event.currentTarget.select()}
            className="w-full min-w-0 rounded-lg border border-navy-300 bg-white p-3 text-sm text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          />
          <p className="mt-1 text-xs">Select the link, then copy with your device&apos;s copy command.</p>
        </div>
      )}
    </div>
  )
}
