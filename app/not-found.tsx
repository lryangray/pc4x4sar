import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Bigfoot walking silhouette */}
        <div className="mb-8 flex justify-center opacity-30">
          <Image
            src="/bigfoot.svg"
            alt=""
            width={140}
            height={180}
            aria-hidden="true"
          />
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
