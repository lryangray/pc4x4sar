const ALLOWED_ORIGIN = 'https://piercecounty4x4sar.org';

// Rate limit: max submissions per IP within the window
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_SECONDS = 60;

// Security headers applied to all responses
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' https://images.unsplash.com data:",
    "connect-src 'self' https://cloudflareinsights.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
};

function addSecurityHeaders(response) {
  const newResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: new Headers(response.headers),
  });
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    newResponse.headers.set(key, value);
  }
  return newResponse;
}

function corsHeaders(origin) {
  const allowedOrigin = origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : '';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';

    // Handle CORS preflight
    if (request.method === 'OPTIONS' && url.pathname === '/api/contact') {
      return addSecurityHeaders(
        new Response(null, { status: 204, headers: corsHeaders(origin) })
      );
    }

    // Handle contact form submissions
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      const response = await handleContactForm(request, env, origin);
      return addSecurityHeaders(response);
    }

    // Health check endpoint for uptime monitoring
    if (url.pathname === '/api/health') {
      return addSecurityHeaders(
        new Response(
          JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      );
    }

    // Serve static assets
    const response = await env.ASSETS.fetch(request);

    // Serve custom 404 page for missing assets
    if (response.status === 404) {
      const notFoundResponse = await env.ASSETS.fetch(new URL('/404.html', request.url));
      const newHeaders = new Headers(notFoundResponse.headers);
      for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
        newHeaders.set(key, value);
      }
      newHeaders.set('Cache-Control', 'public, max-age=0, must-revalidate');
      return new Response(notFoundResponse.body, {
        status: 404,
        headers: newHeaders,
      });
    }

    // Clone into a mutable response and add headers
    const newHeaders = new Headers(response.headers);
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      newHeaders.set(key, value);
    }

    // Cache static assets aggressively
    if (url.pathname.match(/\/_next\/static\//)) {
      newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (url.pathname.match(/\.(js|css|woff2?|png|jpg|jpeg|svg|ico|webp)$/)) {
      newHeaders.set('Cache-Control', 'public, max-age=604800');
    } else {
      newHeaders.set('Cache-Control', 'public, max-age=0, must-revalidate');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};

async function checkRateLimit(ip, env) {
  const key = `ratelimit:${ip}`;
  const current = await env.CONTACT_SUBMISSIONS.get(key);
  const count = current ? parseInt(current, 10) : 0;

  if (count >= RATE_LIMIT_MAX) {
    return false;
  }

  await env.CONTACT_SUBMISSIONS.put(key, String(count + 1), {
    expirationTtl: RATE_LIMIT_WINDOW_SECONDS,
  });
  return true;
}

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
    .slice(0, 1000);
}

async function handleContactForm(request, env, origin) {
  const headers = {
    ...corsHeaders(origin),
    'Content-Type': 'application/json',
  };

  try {
    // Rate limit check
    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    const allowed = await checkRateLimit(ip, env);
    if (!allowed) {
      return new Response(
        JSON.stringify({ error: 'Too many submissions. Please try again in a minute.' }),
        { status: 429, headers }
      );
    }

    const formData = await request.formData();
    const submission = {
      firstName: sanitize(formData.get('firstName')),
      lastName: sanitize(formData.get('lastName')),
      email: sanitize(formData.get('email')),
      subject: sanitize(formData.get('subject')),
      message: sanitize(formData.get('message')),
      submittedAt: new Date().toISOString(),
    };

    // Basic validation
    if (!submission.firstName || !submission.email || !submission.message) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and message are required.' }),
        { status: 400, headers }
      );
    }

    // Email format validation
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(submission.email)) {
      return new Response(
        JSON.stringify({ error: 'Please provide a valid email address.' }),
        { status: 400, headers }
      );
    }

    // Store in KV with timestamp-based key for chronological ordering
    const key = `contact:${submission.submittedAt}:${crypto.randomUUID().slice(0, 8)}`;
    await env.CONTACT_SUBMISSIONS.put(key, JSON.stringify(submission), {
      // Auto-expire after 90 days to stay within KV limits
      expirationTtl: 60 * 60 * 24 * 90,
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Thank you! Your message has been received.' }),
      { status: 200, headers }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again later.' }),
      { status: 500, headers }
    );
  }
}
