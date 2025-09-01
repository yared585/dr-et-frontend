// src/api.js

// If VITE_API_URL is defined, use it (after trimming trailing slashes).
// Otherwise:
// - in the browser (production on Vercel): use relative "" so requests hit the same origin,
//   and your vercel.json rewrites /api/* to the EB backend.
// - in Node (vite build/dev on your machine): fall back to localhost:8080.
const envBase = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
const BASE =
  envBase !== ''
    ? envBase
    : (typeof window === 'undefined' ? 'http://localhost:8080' : '');

export const API_URL = BASE;

export async function apiGet(path, opts = {}) {
  const r = await fetch(`${BASE}${path}`, { ...opts });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function apiPost(path, body, opts = {}) {
  const r = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
