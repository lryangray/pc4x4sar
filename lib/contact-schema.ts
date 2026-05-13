/**
 * Shared contact-form schema. Imported by both the React client form and the
 * Cloudflare Worker handler so the two never drift.
 *
 * Kept in plain TypeScript with `as const` so wrangler/esbuild can bundle it
 * for the worker without depending on runtime type metadata.
 */

export const SUBJECT_OPTIONS = [
  { value: 'volunteer', label: 'Volunteer Inquiry' },
  { value: 'training', label: 'Training Programs' },
  { value: 'event', label: 'Event Standby Request' },
  { value: 'donation', label: 'Donation Information' },
  { value: 'general', label: 'General Question' },
] as const

export type SubjectValue = (typeof SUBJECT_OPTIONS)[number]['value']

export const ALLOWED_SUBJECTS: ReadonlySet<string> = new Set(
  SUBJECT_OPTIONS.map((option) => option.value),
)

export const MAX_FIELD_LENGTHS = {
  firstName: 80,
  lastName: 80,
  email: 254,
  subject: 32,
  message: 2000,
} as const

export const CONTACT_FORM_RETENTION_DAYS = 90

/** Strips control characters, trims, and clamps to maxLength. */
export function sanitizeContactInput(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') {
    return ''
  }
  return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '').trim().slice(0, maxLength)
}

/**
 * Conservative RFC 5322-ish email validator. Rejects empty, oversized,
 * doubled-dot, leading/trailing-dot, and disallowed-character cases.
 * Used by the Worker as a final gate before persisting submissions.
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > MAX_FIELD_LENGTHS.email) {
    return false
  }

  const parts = email.split('@')
  if (parts.length !== 2) {
    return false
  }

  const [localPart, domain] = parts

  if (
    !localPart
    || !domain
    || localPart.length > 64
    || localPart.startsWith('.')
    || localPart.endsWith('.')
    || localPart.includes('..')
    || domain.startsWith('.')
    || domain.endsWith('.')
    || domain.includes('..')
  ) {
    return false
  }

  if (!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(localPart)) {
    return false
  }

  const labels = domain.split('.')
  if (labels.length < 2) {
    return false
  }

  return labels.every((label) => (
    /^[A-Za-z0-9-]{1,63}$/.test(label)
    && !label.startsWith('-')
    && !label.endsWith('-')
  ))
}
