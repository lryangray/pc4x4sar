import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Classic Bigfoot walking silhouette */}
        <div className="mb-8 flex justify-center">
          <svg
            className="w-36 h-36 text-navy-800"
            viewBox="0 0 200 200"
            fill="currentColor"
            aria-hidden="true"
          >
            {/* Classic Patterson-Gimlin walking Bigfoot pose */}
            <path d="M95 18c-4 1-7 4-8 8-1 5 1 9 3 12l-1 3c-3 1-6 4-7 8-1 3 0 6 1 8l-2 4c-4 2-7 5-9 9-3 6-2 11 1 15l-3 5c-2 3-4 8-3 13 1 4 3 7 5 9l2 5c-1 5-4 10-8 16-3 5-5 10-4 15l-15 18c-3 4-5 8-4 12 0 2 2 4 4 5l12 2c2 0 4-1 5-3l10-16 8-6 4 12c-2 6-3 12-1 16 1 3 3 5 6 6l12-1c3-1 4-3 4-6l-2-18 3-13 7-3 6 5 2 14c0 5 2 10 5 13 2 2 5 3 7 2l10-5c2-2 3-4 2-7l-6-16-1-14 5-8c4-3 6-7 7-12 1-6-1-11-4-15l-1-5c2-4 3-9 2-14-1-4-3-8-6-10l-1-4c1-4 1-9-1-13-2-5-6-8-10-10l-2-3c0-5-2-10-5-13-4-4-9-5-14-4l-3 1c-4-2-8-3-12-2z" />
          </svg>
        </div>

        <h1 className="text-6xl font-extrabold text-white mb-4">404</h1>
        <h2 className="font-display uppercase tracking-wide text-2xl text-rescue-orange mb-4">
          Page Not Found
        </h2>
        <p className="text-navy-300 text-lg mb-2">
          This page is harder to find than Bigfoot.
        </p>
        <p className="text-navy-400 text-base mb-8">
          And trust us, we&apos;ve looked everywhere.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            Back to Base Camp
          </Link>
          <Link href="/#contact" className="btn-secondary">
            Report a Sighting
          </Link>
        </div>

        <p className="text-navy-600 text-xs mt-12">
          No Bigfoots were harmed in the making of this page.
        </p>
      </div>
    </div>
  )
}
