const processEnv = typeof process !== 'undefined' && process.env ? process.env : {};

export const API_BASE =
  import.meta.env?.VITE_API_URL ||
  processEnv.REACT_APP_API_URL ||
  processEnv.VITE_API_URL ||
  '/api';

export const AUTH_BASE_URL =
  import.meta.env?.VITE_AUTH_BASE_URL ||
  processEnv.REACT_APP_AUTH_BASE_URL ||
  processEnv.VITE_AUTH_BASE_URL ||
  API_BASE;

export const AI_PROXY_URL =
  import.meta.env?.VITE_AI_PROXY_URL ||
  processEnv.REACT_APP_AI_PROXY_URL ||
  processEnv.VITE_AI_PROXY_URL ||
  API_BASE;

export const TRIPS_API_URL =
  import.meta.env?.VITE_TRIPS_API_URL ||
  processEnv.REACT_APP_TRIPS_API_URL ||
  processEnv.VITE_TRIPS_API_URL ||
  API_BASE;

const rawUseMock =
  import.meta.env?.VITE_USE_MOCK ??
  processEnv.REACT_APP_USE_MOCK ??
  processEnv.VITE_USE_MOCK ??
  'false';

export const USE_MOCK = String(rawUseMock).toLowerCase() !== 'false';
