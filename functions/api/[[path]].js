// Cloudflare Pages Function: same-origin API proxy for findmytour.ai.
// Every request to /api/* is forwarded to the backend API Gateway so the
// browser only ever reaches the site domain instead of raw AWS URLs.

const DEFAULT_API_ORIGIN = 'https://lyjuidar2e.execute-api.us-east-1.amazonaws.com/production'
const DEFAULT_ENABLED_SOCIAL_PROVIDERS = 'google'

export async function onRequest(context) {
  const origin = (context.env.API_ORIGIN || DEFAULT_API_ORIGIN).replace(/\/+$/, '')
  const url = new URL(context.request.url)

  const providerMatch = url.pathname.match(/^\/api\/auth\/oauth\/([^/]+)$/)
  if (providerMatch && providerMatch[1] !== 'callback' && context.request.method === 'GET') {
    const enabled = (context.env.ENABLED_SOCIAL_PROVIDERS ?? DEFAULT_ENABLED_SOCIAL_PROVIDERS)
      .split(',')
      .map((p) => p.trim().toLowerCase())
      .filter(Boolean)

    if (!enabled.includes(providerMatch[1].toLowerCase())) {
      const dest = new URL('/auth/callback', url)
      dest.searchParams.set('error', 'social_login_unavailable')
      dest.searchParams.set(
        'error_description',
        `${providerMatch[1]} login is not yet enabled on this server.`,
      )
      return Response.redirect(dest.toString(), 302)
    }
  }

  const upstream = origin + url.pathname.replace(/^\/api/, '') + url.search
  const request = new Request(upstream, context.request)
  request.headers.set('X-Forwarded-Host', url.hostname)

  return fetch(request, { redirect: 'manual' })
}
