import React, { useState } from 'react'
import { API_URL } from '../api.js'
export default function Admin(){
  const [key,setKey]=useState('')
  const [orders,setOrders]=useState([])
  const [error,setError]=useState('')
  async function load(){
    setError('')
    try{ const res = await fetch(`${API_URL}/api/orders`, { headers: { 'X-ADMIN-KEY': key } }); if(!res.ok) throw new Error(await res.text()); setOrders(await res.json()) }
    catch(e){ setError(String(e)) }
  }
  async function updateStatus(id, status){
    try{ const res = await fetch(`${API_URL}/api/orders/${id}/status`, { method:'POST', headers: { 'Content-Type':'application/json', 'X-ADMIN-KEY': key }, body: JSON.stringify({ status }) }); if(!res.ok) throw new Error(await res.text()); await load() }
    catch(e){ alert(e) }
  }
  return (
    <div className="card p-5 space-y-4">
      <h3 className="text-xl font-semibold">Admin</h3>
      <div className="flex items-center gap-2">
        <input className="input" placeholder="Enter admin key" value={key} onChange={e=>setKey(e.target.value)} />
        <button className="btn-secondary" onClick={load}>Load orders</button>
      </div>
      {error && <div className="text-brand-muted">Error: {error}</div>}
      <div className="grid gap-3">
        {orders.map(o => (
          <div key={o.id} className="card p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold">Order #{o.id} <span className="text-xs border border-brand-border rounded-full px-2 py-0.5 ml-1">{o.status}</span></div>
                <div className="text-brand-muted text-sm">{o.customerName} • {o.phone} • {o.city}</div>
              </div>
              <div className="flex gap-2">
                {['NEW','CONFIRMED','SHIPPED','CANCELLED'].map(s => (<button key={s} className="btn-secondary" onClick={()=>updateStatus(o.id, s)}>{s}</button>))}
              </div>
            </div>
          </div>
        ))}
        {orders.length===0 && !error && <div className="text-brand-muted">No orders loaded yet.</div>}
      </div>
    </div>
  )
}
