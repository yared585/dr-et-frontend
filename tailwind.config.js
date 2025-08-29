/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#ffffff",
          text: "#16181c",
          muted: "#6b7280",
          border: "#e5e7eb",
          card: "#ffffff",
          green: "#078930",
          gold: "#FCD116",
          red: "#DA1212",
          blue: "#0033A0"
        }
      },
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,.08)" },
      backgroundImage: {
        "hero-pattern": "linear-gradient(120deg, rgba(252,209,22,0.2), rgba(7,137,48,0.15))"
      }
    }
  },
  plugins: []
}
