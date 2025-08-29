import React, { useEffect, useState } from 'react'
import { apiGet } from '../api.js'
import { useStore } from '../store.jsx'

export default function Shop(){
  const [loading,setLoading]=useState(true)
  const [products,setProducts]=useState([])
  const [error,setError]=useState('')
  const { add } = useStore()

  useEffect(()=>{(async()=>{try{ const data = await apiGet('/api/products'); setProducts(data) }catch(e){ setError(String(e)) }finally{ setLoading(false) }})()},[])

  if(loading) return <div className="card p-4">Loading products…</div>
  if(error) return <div className="card p-4">Error: {error}</div>

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map(p => (
        <div className="card overflow-hidden" key={p.id}>
          <img className="w-full h-44 object-cover" src={p.imageUrl} alt={p.name} />
          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-brand-muted">{p.category} • {p.metal}</span>
              <span className="font-bold">{p.priceEtb?.toLocaleString()} ETB</span>
            </div>
            <button className="btn-primary w-full" onClick={()=>add(p, 1)}>Add to cart</button>
          </div>
        </div>
      ))}
      {products.length===0 && <div className="text-brand-muted">No products yet.</div>}
    </div>
  )
}
