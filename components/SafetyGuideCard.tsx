import { getGuideUrl, type SafetyGuide } from '@/lib/data/safety-guides'
import ResourceShare from './ResourceShare'

export default function SafetyGuideCard({ guide }: { guide: SafetyGuide }) {
  return (
    <article
      id={guide.id}
      aria-labelledby={`${guide.id}-title`}
      className="guide-anchor flex min-w-0 flex-col rounded-xl border border-navy-100 bg-white p-5 text-navy-900 shadow-sm"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-navy-600">
        Free PDF <span aria-hidden="true">·</span> {guide.format}
      </p>
      <h4 id={`${guide.id}-title`} className="mt-2 text-lg font-bold leading-snug">
        {guide.title}
      </h4>
      <p className="mb-4 mt-2 text-sm leading-relaxed text-navy-700">{guide.description}</p>
      <div className="mt-auto">
        <div className="flex flex-wrap gap-2">
          <a
            href={guide.file}
            aria-label={`View PDF: ${guide.title}`}
            className="guide-action bg-navy-900 text-white hover:bg-navy-700"
          >
            View PDF
          </a>
          <a
            href={guide.file}
            download
            aria-label={`Download PDF: ${guide.title}`}
            className="guide-action border border-navy-300 text-navy-900 hover:bg-navy-50"
          >
            Download
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v4h16v-4M12 3v12m-4-4l4 4 4-4" />
            </svg>
          </a>
        </div>
        <ResourceShare
          title={guide.title}
          text={`${guide.title} — a free safety PDF from Pierce County 4x4 Search and Rescue.`}
          url={getGuideUrl(guide)}
          label="Share guide"
          className="mt-2"
        />
      </div>
    </article>
  )
}
