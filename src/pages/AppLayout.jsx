import React from 'react'
import { Provider } from '../store.jsx'
import Navbar from '../components/Navbar.jsx'
export default function AppLayout({children}){
  return (
    <Provider>
      <Navbar />
      <main className="container-max pt-6 pb-12">{children}</main>
      <footer className="border-t border-brand-border mt-16">
        <div className="container-max py-8 text-sm text-brand-muted">
          © {new Date().getFullYear()} DR Ethiopia — One Love, One Ring.
        </div>
      </footer>
    </Provider>
  )
}
