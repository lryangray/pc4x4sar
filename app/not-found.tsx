import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Bigfoot silhouette */}
        <div className="mb-8 flex justify-center">
          <svg
            className="w-32 h-32 text-navy-800"
            viewBox="0 0 100 100"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M55 8c-2 0-4 2-5 5-1 2-1 5 0 7 0 1 0 3-1 4-2 2-3 4-3 7 0 2 1 4 2 5 0 1 0 2-1 3-1 2-2 5-1 7 1 3 3 5 5 6l1 2c0 2-1 4-3 6-2 3-5 6-6 10-1 3-1 6 0 8 0 1 0 2-1 3-1 3-1 7 0 10 1 2 2 3 3 4l-3 2c-3 1-5 2-6 4-1 1-1 2 0 3h30c1-1 1-2 0-3-1-2-3-3-6-4l-3-2c1-1 2-2 3-4 1-3 1-7 0-10-1-1-1-2-1-3 1-2 1-5 0-8-1-4-4-7-6-10-2-2-3-4-3-6l1-2c2-1 4-3 5-6 1-2 0-5-1-7-1-1-1-2-1-3 1-1 2-3 2-5 0-3-1-5-3-7-1-1-1-3-1-4 1-2 1-5 0-7-1-3-3-5-5-5z" />
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
