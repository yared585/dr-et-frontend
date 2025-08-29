export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
export async function apiGet(path, opts={}){ const r = await fetch(`${API_URL}${path}`, { ...opts }); if(!r.ok) throw new Error(await r.text()); return r.json() }
export async function apiPost(path, body, opts={}){ const r = await fetch(`${API_URL}${path}`, { method:'POST', headers:{ 'Content-Type':'application/json', ...(opts.headers||{}) }, body: JSON.stringify(body) }); if(!r.ok) throw new Error(await r.text()); return r.json() }
