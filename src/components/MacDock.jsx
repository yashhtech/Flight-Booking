import { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const companies = [
  { name: "Emirates", logo: "/logos/emirates.jpg" },
  { name: "Qatar", logo: "/logos/qatar.jpg" },
  { name: "Lufthansa", logo: "/logos/lufthansa.jpg" },
  { name: "IndiGo", logo: "/logos/indigo.jpg" },
  { name: "AirAsia", logo: "/logos/airasia.jpg" },
  { name: "Singapore", logo: "/logos/singapore.jpg" },
]

const MacDock = () => {
  const containerRef = useRef(null)
  const dockRef = useRef(null)
  const decryptRef = useRef(null)
  const quoteRef = useRef(null)
  const rafId = useRef(null)
  const itemsCache = useRef([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let decryptInterval = null

    const ctx = gsap.context(() => {
      const el = decryptRef.current
      if (el) {
        const original = el.dataset.text || el.innerText
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*"

        const decrypt = () => {
          if (prefersReducedMotion) {
            el.innerText = original
            return
          }
          let progress = 0
          el.innerText = original
            .split("")
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join("")

          decryptInterval = setInterval(() => {
            progress++
            el.innerText = original
              .split("")
              .map((char, i) => {
                if (i < progress) return original[i]
                return chars[Math.floor(Math.random() * chars.length)]
              })
              .join("")

            if (progress >= original.length) {
              clearInterval(decryptInterval)
              decryptInterval = null
              el.innerText = original
            }
          }, 60)
        }

        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
              onEnter: decrypt,
            },
          }
        )
      }

      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 90%",
              once: true,
            },
          }
        )
      }
    }, containerRef)

    return () => {
      if (decryptInterval) clearInterval(decryptInterval)
      if (rafId.current) cancelAnimationFrame(rafId.current)
      ctx.revert()
    }
  }, [])

  /* Cache item positions on mouse enter to prevent layout thrashing */
  const handleMouseEnter = () => {
    if (!dockRef.current) return
    const items = dockRef.current.querySelectorAll(".dock-item")
    itemsCache.current = Array.from(items).map((item) => {
      const rect = item.getBoundingClientRect()
      return {
        el: item,
        center: rect.left + rect.width / 2,
      }
    })
  }

  /* Smooth RAF-throttled mouse move without getBoundingClientRect inside */
  const handleMouseMove = (e) => {
    if (itemsCache.current.length === 0) {
      handleMouseEnter()
    }

    if (rafId.current) return

    rafId.current = requestAnimationFrame(() => {
      rafId.current = null
      const clientX = e.clientX

      itemsCache.current.forEach(({ el, center }) => {
        const distance = Math.abs(clientX - center)
        const scale = Math.max(1, 1.6 - distance / 140)
        const lift = Math.max(0, 24 - distance / 7)
        el.style.transform = `scale(${scale}) translateY(-${lift}px)`
      })
    })
  }

  const reset = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
    itemsCache.current = []
    if (dockRef.current) {
      dockRef.current.querySelectorAll(".dock-item").forEach((item) => {
        item.style.transform = "scale(1) translateY(0)"
      })
    }
  }

  return (
    <section ref={containerRef} className="py-14 pb-24 bg-transparent overflow-hidden">
      {/* HEADING */}
      <h2
        ref={decryptRef}
        data-text="Most Popular Flights ✈️"
        className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-950 mb-6 font-serif px-4"
      >
        Most Popular Flights ✈️
      </h2>

      <p
        ref={quoteRef}
        className="text-center max-w-3xl mx-auto px-6 text-base md:text-lg font-medium text-gray-600 italic leading-relaxed mb-12"
      >
        “Take these broken wings and learn to fly, all your life you were only waiting for this moment to arise”
      </p>

      <div className="w-full flex justify-center px-4 overflow-x-auto py-6">
        {/* MACOS DOCK */}
        <div
          ref={dockRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={reset}
          className="flex items-end gap-6 sm:gap-10 md:gap-12 px-6 sm:px-12 md:px-20 py-6 bg-slate-300/80 backdrop-blur-md rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/40"
        >
          {companies.map((c, i) => (
            <div
              key={i}
              className="dock-item flex flex-col items-center transition-transform duration-150 ease-out cursor-pointer select-none"
            >
              <img
                src={c.logo}
                alt={c.name}
                loading="lazy"
                className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full object-cover shadow-lg border-2 border-white pointer-events-none"
              />
              <span className="mt-2 text-xs sm:text-sm font-bold text-slate-800">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MacDock
