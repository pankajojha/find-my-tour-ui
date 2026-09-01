import axios from 'axios';
import { AUTH_BASE_URL } from '../config';

const baseURL = String(AUTH_BASE_URL || '/api').replace(/\/$/, '');

const authClient = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

function normalizeAuthResponse(payload = {}, fallbackUser = null) {
  const data =
    typeof payload === 'object' && payload && payload.body && typeof payload.body === 'string'
      ? JSON.parse(payload.body)
      : payload;

  const user = data.user || fallbackUser || null;
  const accessToken = data.accessToken || data.idToken || data.token || null;

  return {
    token: accessToken,
    accessToken,
    idToken: data.idToken || data.id_token || null,
    refreshToken: data.refreshToken || data.refresh_token || null,
    tokenType: data.tokenType || data.token_type || 'Bearer',
    user,
    message: data.message || null,
  };
}

export async function loginUser(payload) {
  const { data } = await authClient.post('/auth/login', payload);
  return normalizeAuthResponse(data, {
    name: payload.name || (payload.email || '').split('@')[0] || 'Traveler',
    email: payload.email || '',
  });
}

export async function signUpUser(payload) {
  const { data } = await authClient.post('/auth/signup', payload);
  return normalizeAuthResponse(data, {
    name: payload.name || (payload.email || '').split('@')[0] || 'Traveler',
    email: payload.email || '',
  });
}

export async function requestPasswordless(payload) {
  const { data } = await authClient.post('/auth/passwordless/request', payload);
  return data;
}

export async function verifyPasswordless(payload) {
  const { data } = await authClient.post('/auth/passwordless/verify', payload);
  return normalizeAuthResponse(data, {
    name: 'Traveler',
    email: '',
  });
}

export async function refreshToken(refreshToken) {
  if (!refreshToken) {
    throw new Error('Missing refresh token');
  }

  const { data } = await authClient.post('/auth/refresh', { refreshToken });
  return normalizeAuthResponse(data, {
    name: 'Traveler',
    email: '',
  });
}

export async function getSessionUser() {
  try {
    const token = localStorage.getItem('findmytour_token');
    if (!token) return null;

    const { data } = await authClient.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data.user || data;
  } catch (error) {
    return null;
  }
}
