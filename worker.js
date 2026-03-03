// Security headers applied to all responses
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle contact form submissions
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      const response = await handleContactForm(request, env);
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

async function handleContactForm(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': new URL(request.url).origin,
    'Content-Type': 'application/json',
  };

  try {
    const formData = await request.formData();
    const submission = {
      firstName: formData.get('firstName') || '',
      lastName: formData.get('lastName') || '',
      email: formData.get('email') || '',
      subject: formData.get('subject') || '',
      message: formData.get('message') || '',
      submittedAt: new Date().toISOString(),
      ip: request.headers.get('cf-connecting-ip') || 'unknown',
    };

    // Basic validation
    if (!submission.firstName || !submission.email || !submission.message) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and message are required.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Simple email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
      return new Response(
        JSON.stringify({ error: 'Please provide a valid email address.' }),
        { status: 400, headers: corsHeaders }
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
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again later.' }),
      { status: 500, headers: corsHeaders }
    );
  }
}
