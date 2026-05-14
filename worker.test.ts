import { describe, expect, it } from 'vitest'
import {
  buildSecurityHeaders,
  corsHeaders,
  isAllowedOrigin,
  isTrustedContactRequest,
  parseSubmission,
} from './worker.js'

describe('isAllowedOrigin', () => {
  it.each([
    'https://pcsar4x4.org',
    'https://pc4x4sar.org',
    'https://pc4x4sar-preview.ryan-gray-210.workers.dev',
  ])('allows production/preview origin: %s', (origin) => {
    expect(isAllowedOrigin(origin)).toBe(true)
  })

  it.each([
    '',
    null,
    undefined,
    'http://pcsar4x4.org', // wrong scheme
    'https://www.pcsar4x4.org', // we don't own a www subdomain
    'https://evil.example.com',
    'https://pcsar4x4.org.evil.com',
    'not a url',
  ])('rejects bad origin: %s', (origin) => {
    expect(isAllowedOrigin(origin as string)).toBe(false)
  })
})

describe('isTrustedContactRequest', () => {
  it('trusts when Origin matches', () => {
    expect(isTrustedContactRequest('https://pcsar4x4.org', '')).toBe(true)
  })

  it('trusts the new pc4x4sar.org domain too', () => {
    expect(isTrustedContactRequest('https://pc4x4sar.org', '')).toBe(true)
  })

  it('falls back to Referer when Origin is absent', () => {
    expect(
      isTrustedContactRequest('', 'https://pcsar4x4.org/contact'),
    ).toBe(true)
  })

  it('rejects when both are absent', () => {
    expect(isTrustedContactRequest('', '')).toBe(false)
  })

  it('rejects when Origin is bad even if Referer is good', () => {
    expect(
      isTrustedContactRequest(
        'https://evil.com',
        'https://pcsar4x4.org/contact',
      ),
    ).toBe(false)
  })
})

describe('corsHeaders', () => {
  it('echoes allowed origin', () => {
    const h = corsHeaders('https://pcsar4x4.org') as Record<string, string>
    expect(h['Access-Control-Allow-Origin']).toBe('https://pcsar4x4.org')
    expect(h['Vary']).toBe('Origin')
  })

  it('omits Allow-Origin for disallowed origin', () => {
    const h = corsHeaders('https://evil.com') as Record<string, string>
    expect(h['Access-Control-Allow-Origin']).toBeUndefined()
  })
})

describe('buildSecurityHeaders', () => {
  it('includes all baseline security headers', () => {
    const h = buildSecurityHeaders()
    expect(h['X-Content-Type-Options']).toBe('nosniff')
    expect(h['X-Frame-Options']).toBe('DENY')
    expect(h['Referrer-Policy']).toBe('strict-origin-when-cross-origin')
    expect(h['Strict-Transport-Security']).toMatch(/max-age=\d+/)
    expect(h['Permissions-Policy']).toContain('camera=()')
  })

  it('CSP without nonce uses host-only script-src', () => {
    const csp = buildSecurityHeaders()['Content-Security-Policy']
    expect(csp).toContain("script-src 'self' https://static.cloudflareinsights.com")
    expect(csp).not.toContain("'nonce-")
  })

  it('CSP with nonce includes the nonce directive', () => {
    const csp = buildSecurityHeaders('abc123')['Content-Security-Policy']
    expect(csp).toContain("'nonce-abc123'")
  })

  it('CSP contains hardening directives we added in the audit', () => {
    const csp = buildSecurityHeaders()['Content-Security-Policy']
    expect(csp).toContain("object-src 'none'")
    expect(csp).toContain("worker-src 'self'")
    expect(csp).toContain("frame-ancestors 'none'")
    expect(csp).toContain('upgrade-insecure-requests')
  })
})

describe('parseSubmission', () => {
  it('sanitizes each known field and stamps submittedAt', () => {
    const fd = new FormData()
    fd.set('firstName', '  Alice\x00 ')
    fd.set('lastName', 'Smith')
    fd.set('email', 'alice@example.com')
    fd.set('subject', 'volunteer')
    fd.set('message', 'Hello\x08world')

    const submission = parseSubmission(fd)
    expect(submission.firstName).toBe('Alice')
    expect(submission.lastName).toBe('Smith')
    expect(submission.email).toBe('alice@example.com')
    expect(submission.subject).toBe('volunteer')
    expect(submission.message).toBe('Helloworld')
    expect(new Date(submission.submittedAt).toString()).not.toBe('Invalid Date')
  })

  it('returns empty strings for missing fields', () => {
    const submission = parseSubmission(new FormData())
    expect(submission.firstName).toBe('')
    expect(submission.email).toBe('')
  })
})
