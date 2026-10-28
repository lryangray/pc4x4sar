import Link from 'next/link'
import { safetyTips } from '@/lib/data/content'
import {
  featuredGuides,
  guideCategories,
  safetyGuides,
  SAFETY_LIBRARY_ID,
  SAFETY_LIBRARY_PATH,
  SAFETY_LIBRARY_URL,
} from '@/lib/data/safety-guides'
import ResourceShare from './ResourceShare'
import SafetyGuideCard from './SafetyGuideCard'

export default function SafetyResources({ preview }: { preview?: boolean }) {
  return (
    <section id="safety" aria-labelledby="safety-title" className="section-padding bg-navy-50">
      <div className="container-custom">
        <div className="max-w-3xl mb-8">
          <span className="font-semibold text-sm uppercase tracking-wider text-navy-700">
            Prepare. Print. Pass it on.
          </span>
          <h2 id="safety-title" className="font-display uppercase tracking-wide text-4xl md:text-5xl text-navy-900 mt-2 mb-4">
            {preview ? 'A safer trip starts here' : 'Free safety guide library'}
          </h2>
          <p className="text-navy-700 text-lg leading-relaxed">
            Practical guides from Pierce County 4x4 Search and Rescue, for everyone
            who heads outdoors. Free to view, download, print, and share.
            No signup or membership needed.
          </p>
        </div>

        <section
          id={SAFETY_LIBRARY_ID}
          aria-label={preview ? 'Featured safety guides' : 'Downloadable safety guides'}
          className="rounded-2xl bg-navy-900 p-5 sm:p-8 md:p-10 text-white"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-6">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold">
                {preview ? 'Pack these for your next trip' : `${safetyGuides.length} free PDFs, ready when you are`}
              </h3>
              <p className="text-navy-200 mt-2 leading-relaxed">
                {preview
                  ? 'Start with a checklist, pack the essentials, and leave a plan with someone you trust.'
                  : 'Save a copy before you lose cell service. To print, open a PDF and use your viewer’s print command.'}
              </p>
            </div>
            {!preview && (
              <ResourceShare
                title="Free safety guide library"
                text="Free outdoor safety guides, checklists, and field cards from Pierce County 4x4 Search and Rescue. No signup needed."
                url={SAFETY_LIBRARY_URL}
                label="Share library"
                className="w-full lg:max-w-sm"
              />
            )}
          </div>

          {preview ? (
            <div className="grid gap-4 md:grid-cols-3">
              {featuredGuides.map((guide) => <SafetyGuideCard key={guide.id} guide={guide} />)}
            </div>
          ) : (
            <>
              <nav aria-label="Guide categories" className="flex flex-wrap gap-3 mb-10">
                {guideCategories.map((category) => (
                  <a key={category.id} href={`#${category.id}`} className="guide-action border border-navy-600 bg-navy-800 text-white hover:bg-navy-700">
                    {category.heading} ({category.items.length})
                  </a>
                ))}
              </nav>
              <div className="space-y-10">
                {guideCategories.map((category) => (
                  <section key={category.id} id={category.id} aria-labelledby={`${category.id}-title`}>
                    <div className="border-l-4 border-rescue-orange pl-4 mb-5">
                      <h3 id={`${category.id}-title`} className="text-xl font-bold">
                        {category.heading} <span className="text-navy-200 font-normal">({category.items.length})</span>
                      </h3>
                      <p className="text-navy-200 mt-1 leading-relaxed">{category.description}</p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {category.items.map((guide) => <SafetyGuideCard key={guide.id} guide={guide} />)}
                    </div>
                  </section>
                ))}
              </div>
            </>
          )}

          <div className="mt-8 border-t border-navy-700 pt-6">
            <p className="text-navy-200 leading-relaxed max-w-3xl">
              Help a friend get home safely. Pass a guide to your trip group,
              print a field card for your pack, or share the library with your
              neighbors. You don&apos;t have to join the unit to help spread outdoor safety.
            </p>
            {preview ? (
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 mt-5">
                <Link href={SAFETY_LIBRARY_PATH} className="guide-action bg-rescue-orange px-5 text-navy-950 hover:bg-orange-400">
                  Browse all {safetyGuides.length} free guides <span aria-hidden="true">→</span>
                </Link>
                <ResourceShare
                  title="Free safety guide library"
                  text="Free outdoor safety guides, checklists, and field cards from Pierce County 4x4 Search and Rescue. No signup needed."
                  url={SAFETY_LIBRARY_URL}
                  label="Share library"
                  className="min-w-0 sm:max-w-sm"
                />
              </div>
            ) : (
              <p className="mt-4 text-sm text-navy-200">
                Have a non-emergency question?{' '}
                <Link href="/contact?subject=general" className="guide-action text-white underline underline-offset-4 hover:text-rescue-orange">
                  Contact our team
                </Link>
                {' '}No contact information is required to use these guides.
              </p>
            )}
          </div>
        </section>

        {!preview && (
          <section aria-labelledby="safety-reminders-title" className="mt-12">
            <h2 id="safety-reminders-title" className="text-2xl font-bold text-navy-900 mb-6">
              A few reminders before you go
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safetyTips.map((tip) => (
                <div key={tip.title} className="border-l-4 border-rescue-orange pl-4">
                  <h3 className="font-bold text-navy-900 mb-1">{tip.title}</h3>
                  <p className="text-navy-700 text-sm leading-relaxed">{tip.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  )
}
