/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a",   // dark blue
        secondary: "#10b981", // emerald
        hoverCard: "#fef3c7"  // soft yellow for hover
      },
      animation: {
        slideUp: "slideUp 0.8s ease-out",
        fadeZoom: "fadeZoom 0.6s ease-in-out"
      },
      keyframes: {
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeZoom: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        }
      }
    }
  },
  plugins: []
}
