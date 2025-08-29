import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useStore } from "../store.jsx"
import { apiPost } from "../api.js"

const CITIES = ["Addis Ababa","Adama","Bahir Dar","Mekelle","Hawassa","Dire Dawa","Gondar"]
const PAYMENT_OPTIONS = [
  { value: "CASH_ON_DELIVERY", label: "Cash on Delivery" },
  { value: "BANK_TRANSFER",    label: "Bank Transfer" }
]

export default function Checkout() {
  const { cart, total, inc, dec, remove, clear } = useStore()
  const nav = useNavigate()

  // detect if any engagement item is in cart
  const needsNationalId = cart.some(i => (i.category || "").toLowerCase() === "engagement")

  // form state
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [nationalId, setNationalId] = useState("") // <-- new
  const [placing, setPlacing] = useState(false)
  const [status, setStatus] = useState(null)

  const valid =
    name.trim() &&
    phone.trim() &&
    address.trim() &&
    city.trim() &&
    paymentMethod.trim() &&
    cart.length > 0 &&
    (!needsNationalId || nationalId.trim()) // require only if engagement present

  async function placeOrder() {
    if (!valid) {
      setStatus({ type: "error", msg: "Please fill all required fields." })
      return
    }

    setPlacing(true)
    setStatus(null)
    try {
      const payload = {
        customerName: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        paymentMethod: paymentMethod.trim(),
        nationalId: nationalId.trim() || null,        // <-- send to backend (optional if not needed)
        totalEtb: total,
        items: cart.map(i => ({
          productId: i.id,
          quantity: i.qty,
          priceEtb: i.priceEtb
        }))
      }
      const res = await apiPost("/api/orders", payload)
      setStatus({ type: "success", msg: `Order placed successfully${res?.id ? " (#"+res.id+")" : ""}.` })
      clear()
      // nav("/") // optionally redirect
    } catch (e) {
      setStatus({ type: "error", msg: String(e) })
    } finally {
      setPlacing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Cart */}
      <section className="card p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Cart</h3>
          {cart.length > 0 && <button className="btn-secondary" onClick={clear}>Clear cart</button>}
        </div>

        {cart.length === 0 ? (
          <div className="text-brand-muted mt-2">Your cart is empty.</div>
        ) : (
          <table className="w-full text-sm mt-3">
            <thead className="text-brand-muted">
              <tr>
                <th className="text-left py-2">Item</th>
                <th className="text-left py-2">Qty</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(i => (
                <tr key={i.id} className="border-t border-brand-border">
                  <td className="py-2">
                    {i.name}
                    <span className="text-xs border border-brand-border rounded-full px-2 py-0.5 ml-2">
                      {i.category}
                    </span>
                  </td>
                  <td className="py-2">
                    <div className="inline-flex items-center border border-brand-border rounded-lg overflow-hidden">
                      <button className="px-3 py-1 hover:bg-gray-100" onClick={() => dec(i.id)} aria-label="Decrease">−</button>
                      <span className="px-3 select-none">{i.qty}</span>
                      <button className="px-3 py-1 hover:bg-gray-100" onClick={() => inc(i.id)} aria-label="Increase">+</button>
                    </div>
                  </td>
                  <td className="py-2 font-semibold">
                    {(i.qty * i.priceEtb).toLocaleString()} ETB
                  </td>
                  <td className="py-2">
                    <button className="btn-secondary" onClick={() => remove(i.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-brand-border">
              <tr>
                <td className="py-2 text-right text-brand-muted" colSpan="3">Total</td>
                <td className="py-2 font-bold">{total.toLocaleString()} ETB</td>
              </tr>
            </tfoot>
          </table>
        )}
      </section>

      {/* Delivery form */}
      <section className="card p-5">
        <h3 className="text-xl font-semibold mb-3">Delivery details</h3>

        {status && (
          <div className={`mb-3 rounded-xl px-3 py-2 border ${status.type === "success" ? "border-emerald-200 text-emerald-700 bg-emerald-50" : "border-red-200 text-red-700 bg-red-50"}`}>
            {status.msg}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-3">
          <input className="input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="input" placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
          <input className="input sm:col-span-2" placeholder="Address (Street / House / Kebele…)" value={address} onChange={e=>setAddress(e.target.value)} />
          <select className="select" value={city} onChange={e=>setCity(e.target.value)}>
            <option value="">Select city</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="select" value={paymentMethod} onChange={e=>setPaymentMethod(e.target.value)}>
            <option value="">Select payment method</option>
            {PAYMENT_OPTIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>

          {/* National ID only if engagement is in cart */}
          {needsNationalId && (
            <input
              className="input sm:col-span-2"
              placeholder="National ID (required for engagement)"
              value={nationalId}
              onChange={e=>setNationalId(e.target.value)}
            />
          )}
        </div>

        <div className="mt-4 flex gap-3">
          <button
            className="btn-primary disabled:opacity-60"
            disabled={!valid || placing}
            onClick={placeOrder}
          >
            {placing ? "Placing…" : "Place order"}
          </button>
          <button className="btn-secondary" onClick={() => nav("/shop")}>
            Continue shopping
          </button>
        </div>
      </section>
    </div>
  )
}
