import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 bg-rescue-orange rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-white font-bold text-2xl">4x4</span>
        </div>

        <h1 className="text-6xl font-extrabold text-white mb-4">404</h1>
        <h2 className="text-2xl font-bold text-rescue-orange mb-4">
          Page Not Found
        </h2>
        <p className="text-navy-300 text-lg mb-8">
          Looks like this trail doesn&apos;t lead anywhere.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/#contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>

        <p className="text-navy-500 text-sm mt-12">
          Pierce County 4x4 Search &amp; Rescue
        </p>
      </div>
    </div>
  )
}
