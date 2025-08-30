import React, { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { useStore } from "../store.jsx"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { cart, total } = useStore()
  const items = cart.reduce((s,i)=>s+i.qty,0)

  return (
    <header className="sticky top-0 z-50 bg-pink-600 text-white border-b border-pink-500 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.JPG" alt="DR Ethiopia" className="h-8 w-8" />
          <div className="text-lg font-extrabold tracking-wide">DR Ethiopia</div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2 text-white">
          <NavItem to="/" end>Home</NavItem>
          <NavItem to="/shop">Shop</NavItem>
          <NavItem to="/checkout">Checkout</NavItem>
          <NavItem to="/admin">Admin</NavItem>
        </nav>

        <div className="flex items-center gap-3">
          <div className="text-sm text-white/80">
            <span>{items} items</span>
            <span className="mx-2">•</span>
            <span className="font-bold text-white">{total.toLocaleString()} ETB</span>
          </div>
          <button
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className={`md:hidden border-t border-pink-500 bg-pink-600/95 ${open ? "block" : "hidden"}`}>
        <div className="mx-auto max-w-6xl px-4 py-2 flex flex-col gap-1">
          <NavItem to="/" end onClick={() => setOpen(false)}>Home</NavItem>
          <NavItem to="/shop" onClick={() => setOpen(false)}>Shop</NavItem>
          <NavItem to="/checkout" onClick={() => setOpen(false)}>Checkout</NavItem>
          <NavItem to="/admin" onClick={() => setOpen(false)}>Admin</NavItem>
        </div>
      </div>
    </header>
  )
}

function NavItem({ to, children, ...rest }) {
  return (
    <NavLink
      {...rest}
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-lg font-medium transition-colors
         ${isActive
            ? "bg-pink-700 text-white"
            : "text-white/90 hover:bg-pink-500/40 hover:text-white"}`
      }
    >
      {children}
    </NavLink>
  )
}
