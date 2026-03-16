import Link from 'next/link'

type PageHeroProps = {
  eyebrow: string
  title: string
  description: string
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}

export default function PageHero({
  eyebrow,
  title,
  description,
  primaryHref = '/contact',
  primaryLabel = 'Contact Our Team',
  secondaryHref = '/',
  secondaryLabel = 'Back to Home',
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white pt-36 pb-20 md:pt-44 md:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,107,53,0.2),_transparent_55%)]" />
      <div className="container-custom relative z-10">
        <div className="max-w-4xl">
          <span className="inline-flex items-center rounded-full border border-rescue-orange/30 bg-rescue-orange/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-rescue-orange">
            {eyebrow}
          </span>
          <h1 className="mt-6 font-display uppercase tracking-wide text-4xl md:text-6xl lg:text-7xl leading-none">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg md:text-xl leading-relaxed text-navy-200">
            {description}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href={primaryHref} className="btn-primary text-lg">
              {primaryLabel} <span className="btn-arrow">→</span>
            </Link>
            <Link href={secondaryHref} className="btn-secondary text-lg">
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
