// src/api.js
const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/+$/, '');

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
