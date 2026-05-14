import { describe, expect, it } from 'vitest'
import {
  ALLOWED_SUBJECTS,
  MAX_FIELD_LENGTHS,
  SUBJECT_OPTIONS,
  isValidEmail,
  sanitizeContactInput,
} from './contact-schema'

describe('sanitizeContactInput', () => {
  it('returns empty string for non-strings', () => {
    expect(sanitizeContactInput(null, 100)).toBe('')
    expect(sanitizeContactInput(undefined, 100)).toBe('')
    expect(sanitizeContactInput(42, 100)).toBe('')
    expect(sanitizeContactInput({}, 100)).toBe('')
  })

  it('strips control characters', () => {
    expect(sanitizeContactInput('hello\x00world', 100)).toBe('helloworld')
    expect(sanitizeContactInput('a\x08b\x1Fc', 100)).toBe('abc')
  })

  it('preserves printable whitespace and line breaks', () => {
    // \t (\x09), \n (\x0A), and \r (\x0D) are excluded from the strip range.
    expect(sanitizeContactInput('line1\nline2', 100)).toBe('line1\nline2')
    expect(sanitizeContactInput('col1\tcol2', 100)).toBe('col1\tcol2')
  })

  it('trims leading and trailing whitespace', () => {
    expect(sanitizeContactInput('  hello  ', 100)).toBe('hello')
  })

  it('clamps to maxLength', () => {
    expect(sanitizeContactInput('a'.repeat(50), 10)).toBe('aaaaaaaaaa')
  })

  it('clamps after stripping control chars (length budget applies post-strip)', () => {
    const input = `${'a'.repeat(10)}\x00${'b'.repeat(10)}`
    expect(sanitizeContactInput(input, 15)).toBe('aaaaaaaaaabbbbb')
  })
})

describe('isValidEmail', () => {
  it.each([
    'a@b.co',
    'first.last@example.com',
    'user+tag@example.co.uk',
    "o'malley@example.com",
    'name_underscore@example-host.com',
  ])('accepts valid email: %s', (email) => {
    expect(isValidEmail(email)).toBe(true)
  })

  it.each([
    '',
    'noatsign.com',
    '@nolocal.com',
    'nolocal@',
    'two@@signs.com',
    '.startwithdot@example.com',
    'endwithdot.@example.com',
    'double..dot@example.com',
    'user@.startdotdomain.com',
    'user@enddotdomain.',
    'user@double..dotdomain.com',
    'user@nodot',
    'with space@example.com',
    'user@-dashstart.com',
    'user@dashend-.com',
  ])('rejects invalid email: %s', (email) => {
    expect(isValidEmail(email)).toBe(false)
  })

  it('rejects oversized emails', () => {
    const big = `${'a'.repeat(60)}@${'b'.repeat(60)}.${'c'.repeat(140)}`
    expect(big.length).toBeGreaterThan(MAX_FIELD_LENGTHS.email)
    expect(isValidEmail(big)).toBe(false)
  })

  it('rejects local-part > 64 chars per RFC 5321', () => {
    expect(isValidEmail(`${'a'.repeat(65)}@example.com`)).toBe(false)
    expect(isValidEmail(`${'a'.repeat(64)}@example.com`)).toBe(true)
  })
})

describe('SUBJECT_OPTIONS and ALLOWED_SUBJECTS', () => {
  it('every option value appears in ALLOWED_SUBJECTS', () => {
    for (const option of SUBJECT_OPTIONS) {
      expect(ALLOWED_SUBJECTS.has(option.value)).toBe(true)
    }
  })

  it('ALLOWED_SUBJECTS has no extra values', () => {
    expect(ALLOWED_SUBJECTS.size).toBe(SUBJECT_OPTIONS.length)
  })
})
