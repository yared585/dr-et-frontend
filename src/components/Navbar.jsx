import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useStore } from '../store.jsx'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const { cart, total } = useStore()
  const items = cart.reduce((s,i)=>s+i.qty,0)

  return (
    <header className="sticky top-0 z-50 bg-pink-800 text-white shadow-lg">
      <div className="container-max flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-4">
          <img src="/logo-ethiopia-heart.svg" alt="DR Ethiopia" className="h-8 w-8"/>
          <div className="text-lg font-extrabold tracking-wide">DR Ethiopia</div>
        </Link>

        <nav className="hidden md:flextems-center gap-2">
          <NavItemDark to="/" end>Home</NavItemDark>
          <NavItemDark to="/shop">Shop</NavItemDark>
          <NavItemDark to="/checkout">Checkout</NavItemDark>
          <NavItemDark to="/admin">Admin</NavItemDark>
        </nav>

        <div className="flex items-center gap-4">
          <div className="text-sm text-white/80">
            <span>{items} items</span>
            <span className="mx-2">•</span>
            <span className="font-bold text-white">{total.toLocaleString()} ETB</span>
          </div>
          <button
            className="md:hidden btn-ghost text-white hover:bg-white/10"
            onClick={()=>setOpen(!open)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-green-950/95">
          <div className="container-max py-2 flex flex-col gap-2">
            <NavItemDark to="/" end onClick={()=>setOpen(false)}>Home</NavItemDark>
            <NavItemDark to="/shop" onClick={()=>setOpen(false)}>Shop</NavItemDark>
            <NavItemDark to="/checkout" onClick={()=>setOpen(false)}>Checkout</NavItemDark>
            <NavItemDark to="/admin" onClick={()=>setOpen(false)}>Admin</NavItemDark>
          </div>
        </div>
      )}
    </header>
  )
}

function NavItemDark({to, end, children, ...rest}){
  return (
    <NavLink
      {...rest}
      to={to}
      end={end}
      className={({isActive}) =>
        `navlink-dark ${isActive ? 'navlink-dark-active' : ''}`
      }
    >
      {children}
    </NavLink>
  )
}
