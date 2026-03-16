const ALLOWED_ORIGINS = new Set([
  'https://piercecounty4x4sar.org',
  'https://www.piercecounty4x4sar.org',
  'https://pc4x4sar-preview.ryan-gray-210.workers.dev',
]);

const ALLOWED_SUBJECTS = new Set([
  'volunteer',
  'training',
  'event',
  'donation',
  'general',
]);

const MAX_FIELD_LENGTHS = {
  firstName: 80,
  lastName: 80,
  email: 254,
  subject: 32,
  message: 2000,
};

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 300;
const RATE_LIMIT_COOLDOWN_SECONDS = 900;

class ScriptNonceInjector {
  constructor(nonce) {
    this.nonce = nonce;
  }

  element(element) {
    element.setAttribute('nonce', this.nonce);
  }
}

function buildSecurityHeaders(nonce) {
  const scriptDirective = nonce
    ? `script-src 'self' 'nonce-${nonce}' https://static.cloudflareinsights.com`
    : "script-src 'self' https://static.cloudflareinsights.com";

  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'Content-Security-Policy': [
      "default-src 'self'",
      scriptDirective,
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self'",
      "img-src 'self' https://images.unsplash.com data:",
      "connect-src 'self' https://cloudflareinsights.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  };
}

function corsHeaders(origin) {
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };

  if (isAllowedOrigin(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  return headers;
}

function isAllowedOrigin(origin) {
  if (!origin) {
    return false;
  }

  try {
    return ALLOWED_ORIGINS.has(new URL(origin).origin);
  } catch {
    return false;
  }
}

function isAllowedReferrer(referrer) {
  if (!referrer) {
    return false;
  }

  try {
    return ALLOWED_ORIGINS.has(new URL(referrer).origin);
  } catch {
    return false;
  }
}

function isTrustedContactRequest(origin, referrer) {
  if (origin) {
    return isAllowedOrigin(origin);
  }

  return isAllowedReferrer(referrer);
}

function createNonce() {
  const values = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(values, (value) => value.toString(16).padStart(2, '0')).join('');
}

function cloneResponse(response, headers) {
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function withSecurityHeaders(response) {
  const contentType = response.headers.get('Content-Type') || '';

  if (contentType.includes('text/html')) {
    const nonce = createNonce();
    const rewrittenResponse = new HTMLRewriter()
      .on('script', new ScriptNonceInjector(nonce))
      .transform(response);
    const headers = new Headers(rewrittenResponse.headers);

    for (const [key, value] of Object.entries(buildSecurityHeaders(nonce))) {
      headers.set(key, value);
    }

    return cloneResponse(rewrittenResponse, headers);
  }

  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(buildSecurityHeaders())) {
    headers.set(key, value);
  }

  return cloneResponse(response, headers);
}

function sanitizeInput(value, maxLength) {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(email) {
  if (!email || email.length > MAX_FIELD_LENGTHS.email) {
    return false;
  }

  const parts = email.split('@');
  if (parts.length !== 2) {
    return false;
  }

  const [localPart, domain] = parts;

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
    return false;
  }

  if (!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(localPart)) {
    return false;
  }

  const labels = domain.split('.');
  if (labels.length < 2) {
    return false;
  }

  return labels.every((label) => (
    /^[A-Za-z0-9-]{1,63}$/.test(label)
    && !label.startsWith('-')
    && !label.endsWith('-')
  ));
}

function parseSubmission(formData) {
  return {
    firstName: sanitizeInput(formData.get('firstName'), MAX_FIELD_LENGTHS.firstName),
    lastName: sanitizeInput(formData.get('lastName'), MAX_FIELD_LENGTHS.lastName),
    email: sanitizeInput(formData.get('email'), MAX_FIELD_LENGTHS.email),
    subject: sanitizeInput(formData.get('subject'), MAX_FIELD_LENGTHS.subject),
    message: sanitizeInput(formData.get('message'), MAX_FIELD_LENGTHS.message),
    submittedAt: new Date().toISOString(),
  };
}

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const referrer = request.headers.get('Referer') || '';

    if (request.method === 'OPTIONS' && url.pathname === '/api/contact') {
      if (!isAllowedOrigin(origin)) {
        return withSecurityHeaders(new Response(null, { status: 403, headers: corsHeaders(origin) }));
      }

      return withSecurityHeaders(
        new Response(null, { status: 204, headers: corsHeaders(origin) })
      );
    }

    if (url.pathname === '/api/contact' && request.method === 'POST') {
      const response = await handleContactForm(request, env, origin, referrer);
      return withSecurityHeaders(response);
    }

    if (url.pathname === '/api/health') {
      return withSecurityHeaders(
        new Response(
          JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      );
    }

    const response = await env.ASSETS.fetch(request);

    if (response.status === 404) {
      const notFoundResponse = await env.ASSETS.fetch(new URL('/404.html', request.url));
      const headers = new Headers(notFoundResponse.headers);
      headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
      return withSecurityHeaders(cloneResponse(notFoundResponse, headers));
    }

    const headers = new Headers(response.headers);

    if (url.pathname.match(/\/_next\/static\//)) {
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (url.pathname.match(/\.(js|css|woff2?|png|jpg|jpeg|svg|ico|webp)$/)) {
      headers.set('Cache-Control', 'public, max-age=604800');
    } else {
      headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    }

    return withSecurityHeaders(cloneResponse(response, headers));
  },
};

export default worker;

async function checkRateLimit(ip, env) {
  const cooldownKey = `ratelimit:block:${ip}`;
  const activeCooldown = await env.CONTACT_SUBMISSIONS.get(cooldownKey);

  if (activeCooldown) {
    return {
      allowed: false,
      retryAfter: RATE_LIMIT_COOLDOWN_SECONDS,
    };
  }

  const bucket = Math.floor(Date.now() / (RATE_LIMIT_WINDOW_SECONDS * 1000));
  const bucketKey = `ratelimit:${ip}:${bucket}`;
  const current = await env.CONTACT_SUBMISSIONS.get(bucketKey);
  const count = current ? parseInt(current, 10) : 0;

  if (count >= RATE_LIMIT_MAX) {
    await env.CONTACT_SUBMISSIONS.put(cooldownKey, '1', {
      expirationTtl: RATE_LIMIT_COOLDOWN_SECONDS,
    });

    return {
      allowed: false,
      retryAfter: RATE_LIMIT_COOLDOWN_SECONDS,
    };
  }

  await env.CONTACT_SUBMISSIONS.put(bucketKey, String(count + 1), {
    expirationTtl: RATE_LIMIT_WINDOW_SECONDS * 2,
  });

  return {
    allowed: true,
    retryAfter: RATE_LIMIT_WINDOW_SECONDS,
  };
}

async function handleContactForm(request, env, origin, referrer) {
  const headers = {
    ...corsHeaders(origin),
    'Content-Type': 'application/json',
  };

  try {
    if (!isTrustedContactRequest(origin, referrer)) {
      return new Response(
        JSON.stringify({ error: 'This form only accepts requests from approved site origins.' }),
        { status: 403, headers }
      );
    }

    const contentType = request.headers.get('Content-Type') || '';
    if (!contentType.toLowerCase().startsWith('multipart/form-data')) {
      return new Response(
        JSON.stringify({ error: 'Unsupported request format. Please use the website contact form.' }),
        { status: 415, headers }
      );
    }

    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    const rateLimit = await checkRateLimit(ip, env);
    if (!rateLimit.allowed) {
      headers['Retry-After'] = String(rateLimit.retryAfter);
      return new Response(
        JSON.stringify({ error: 'Too many submissions. Please wait a few minutes and try again.' }),
        { status: 429, headers }
      );
    }

    const formData = await request.formData();

    if (formData.get('website')) {
      return new Response(
        JSON.stringify({ success: true, message: 'Thank you! Your message has been received.' }),
        { status: 200, headers }
      );
    }

    const submission = parseSubmission(formData);

    if (
      !submission.firstName
      || !submission.lastName
      || !submission.email
      || !submission.subject
      || !submission.message
    ) {
      return new Response(
        JSON.stringify({ error: 'First name, last name, email, subject, and message are required.' }),
        { status: 400, headers }
      );
    }

    if (!ALLOWED_SUBJECTS.has(submission.subject)) {
      return new Response(
        JSON.stringify({ error: 'Please choose a valid subject.' }),
        { status: 400, headers }
      );
    }

    if (!isValidEmail(submission.email)) {
      return new Response(
        JSON.stringify({ error: 'Please provide a valid email address.' }),
        { status: 400, headers }
      );
    }

    const key = `contact:${submission.submittedAt}:${crypto.randomUUID().slice(0, 8)}`;
    await env.CONTACT_SUBMISSIONS.put(key, JSON.stringify(submission), {
      expirationTtl: 60 * 60 * 24 * 90,
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Thank you! Your message has been received.' }),
      { status: 200, headers }
    );
  } catch (err) {
    console.error('[contact-form]', err);
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again later.' }),
      { status: 500, headers }
    );
  }
}
