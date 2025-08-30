import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiGet } from '../api.js'
import { useStore } from '../store.jsx'

export default function Home(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { cart, setCart } = useStore()

  useEffect(() => {
    (async () => {
      try {
        const data = await apiGet('/api/products')
        setProducts((data || []).slice(0, 6)) // show top 6
      } catch (e) {
        setError(String(e))
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  function addToCart(p){
    const exists = cart.find(i => i.id === p.id)
    if (exists) setCart(cart.map(i => i.id===p.id ? {...i, qty: i.qty + 1} : i))
    else setCart([...cart, { id: p.id, name: p.name, category: p.category, priceEtb: p.priceEtb, qty: 1 }])
  }

  return (
    <div className="space-y-12">
      {/* HERO */}
      <section className="overflow-hidden rounded-2xl shadow-soft border border-brand-border bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <div className="container-max grid md:grid-cols-2 gap-10 items-center py-16 md:py-20">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 border border-brand-border bg-white/80 backdrop-blur">
              <span className="w-3 h-3 rounded-full bg-brand-green" />
              <span className="w-3 h-3 rounded-full bg-brand-gold" />
              <span className="w-3 h-3 rounded-full bg-brand-red" />
              <span className="text-sm text-brand-muted">Ethiopian Edition</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              One Love, One Ring.
            </h1>
            <div className="text-2xl md:text-3xl font-bold text-brand-muted">
              አንድ ፍቅር፣ አንድ ቀለበት።
            </div>
            <p className="text-brand-muted text-lg max-w-xl">
              A single promise, a single ring — crafted for your forever. Ethiopian-inspired design, modern craftsmanship.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link to="/shop" className="btn-primary">Shop rings</Link>
              <a href="#why" className="btn-secondary">Why choose us</a>
            </div>
          </div>

          <div className="hidden md:block">
            <img src="/logo.JPG" alt="Ring" className="mx-auto w-64 h-64" />
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="container-max">
        <h2 className="text-2xl font-bold mb-4">Why DR Ethiopia</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card title="Authentic Promise" text="One love, one ring — our policy keeps it special." />
          <Card title="Local Touch" text="Designs that resonate with Ethiopian taste." />
          <Card title="Flexible Payment" text="Cash on delivery or bank transfer — your choice." />
          <Card title="Careful Delivery" text="Secure, discreet packaging with timely updates." />
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container-max">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold">Featured rings</h2>
          <Link to="/shop" className="btn-secondary">View all</Link>
        </div>

        {loading && <div className="card p-4">Loading…</div>}
        {error && <div className="card p-4">Error: {error}</div>}

        {!loading && !error && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map(p => (
              <div key={p.id} className="card overflow-hidden">
                {p.imageUrl ? (
                  <img className="w-full h-48 object-cover" src={p.imageUrl} alt={p.name} />
                ) : (
                  <div className="w-full h-48 bg-emerald-100 flex items-center justify-center text-emerald-700">No image</div>
                )}
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-brand-muted">{p.category} • {p.metal}</span>
                    <span className="font-bold">{p.priceEtb?.toLocaleString()} ETB</span>
                  </div>
                  <button className="btn-primary w-full" onClick={()=>addToCart(p)}>Add to cart</button>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <div className="text-brand-muted">No products yet. Add some in the Admin panel.</div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

function Card({title, text}) {
  return (
    <div className="card p-4">
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-brand-muted text-sm">{text}</div>
    </div>
  )
}
