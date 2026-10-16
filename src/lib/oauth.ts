export const authBaseUrl = (import.meta.env.VITE_AUTH_BASE_URL ?? '/api').toString().replace(/\/+$/, '');
export const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN?.toString() ?? '';
export const cognitoClientId = import.meta.env.VITE_COGNITO_CLIENT_ID?.toString() ?? '';

function resolveOAuthRedirectUri() {
  const configured = import.meta.env.VITE_OAUTH_REDIRECT_URI?.toString();
  if (configured) return configured;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  return `${currentOrigin}/api/auth/oauth/callback`;
}

export const oauthRedirectUri = resolveOAuthRedirectUri();

export function startGoogleOAuth() {
  const backendUrl = `${authBaseUrl}/auth/oauth/google`;

  if (!authBaseUrl || authBaseUrl === '/') {
    window.location.assign('/api/auth/oauth/google');
    return;
  }

  window.location.assign(backendUrl);
}

export async function exchangeGoogleCode(code: string) {
  if (!cognitoDomain || !cognitoClientId) {
    throw new Error('Google OAuth is not configured (VITE_COGNITO_DOMAIN / VITE_COGNITO_CLIENT_ID).');
  }

  const response = await fetch(`https://${cognitoDomain}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: cognitoClientId,
      code,
      redirect_uri: oauthRedirectUri,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.access_token || !data.id_token) {
    throw new Error(`Google token exchange failed: ${data.error ?? `HTTP ${response.status}`}`);
  }

  return {
    accessToken: data.access_token,
    idToken: data.id_token,
    refreshToken: data.refresh_token ?? null,
    tokenType: data.token_type ?? 'Bearer',
    user: {
      name: data.user_name || 'Google Traveler',
      email: data.email || '',
    },
  };
}
