import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
const Ctx = createContext(null)

export function Provider({children}){
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart') || '[]') } catch { return [] }
  })

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)) }, [cart])

  // helpers
  const add = useCallback((p, qty = 1) => {
    setCart(prev => {
      const i = prev.findIndex(x => x.id === p.id)
      if (i >= 0) {
        const copy = [...prev]; copy[i] = { ...copy[i], qty: copy[i].qty + qty }
        return copy
      }
      return [...prev, { id:p.id, name:p.name, category:p.category, priceEtb:p.priceEtb, qty }]
    })
  }, [])

  const inc = useCallback((id) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i))
  }, [])

  const dec = useCallback((id) => {
    // if qty drops to 0, remove the item
    setCart(prev => prev.flatMap(i => i.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i]))
  }, [])

  const remove = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const clear = useCallback(() => setCart([]), [])

  const items = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart])
  const total = useMemo(() => cart.reduce((s, i) => s + (i.priceEtb * i.qty), 0), [cart])

  const value = useMemo(() => ({ cart, setCart, add, inc, dec, remove, clear, items, total }), [cart, add, inc, dec, remove, clear, items, total])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore(){ return useContext(Ctx) }
