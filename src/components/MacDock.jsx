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
  const dockRef = useRef(null)
  const decryptRef = useRef(null)
  const quoteRef = useRef(null)


useEffect(() => {
  const el = decryptRef.current
  if (!el) return

  const original = el.dataset.text
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*"

  const decrypt = () => {
    let progress = 0

    // initial encrypted text
    el.innerText = original
      .split("")
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join("")

    const interval = setInterval(() => {
      progress++

      el.innerText = original
        .split("")
        .map((char, i) => {
          if (i < progress) return original[i]
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join("")

      if (progress >= original.length) {
        clearInterval(interval)
        el.innerText = original
      }
    }, 70) // 👈 smooth premium speed
  }

  // GSAP entry animation
  gsap.fromTo(
    el,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    }
  )

  // ✅ ScrollTrigger CONTROLS decrypt
  ScrollTrigger.create({
    trigger: el,
    start: "top 80%",
    once: true,
    onEnter: decrypt, // 👈 THIS WAS MISSING
  })

}, [])

useEffect(() => {
  if (!quoteRef.current) return

  gsap.fromTo(
    quoteRef.current,
    {
      opacity: 0,
      y: 20,
      filter: "blur(6px)",
    },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: quoteRef.current,
        start: "top 85%",
        once: true,
      },
    }
  )
}, [])



  /* 🖱 MACOS DOCK EFFECT */
  const handleMouseMove = (e) => {
    const items = dockRef.current.querySelectorAll(".dock-item")

    items.forEach((item) => {
      const rect = item.getBoundingClientRect()
      const center = rect.left + rect.width / 2
      const distance = Math.abs(e.clientX - center)

      const scale = Math.max(1, 1.8 - distance / 120)
      const lift = Math.max(0, 32 - distance / 5)

      item.style.transform = `scale(${scale}) translateY(-${lift}px)`
    })
  }

  const reset = () => {
    dockRef.current.querySelectorAll(".dock-item").forEach((item) => {
      item.style.transform = "scale(1) translateY(0)"
    })
  }

  return (
    <section className="py-14 pb-28 bg-transparent">
      {/* HEADING */}
      <h2
       ref={decryptRef}
       data-text="Most Popular Flights ✈️"
       className="text-center text-5xl font-extrabold text-blue-950 mb-16 font-serif"
    >
  Most Popular Flights ✈️
</h2>

<p
  ref={quoteRef}
  className="
    text-center
    max-w-4xl
    mx-auto
    mt-0
    text-lg
    md:text-xl
    font-medium
    text-gray-600
    italic
    leading-relaxed
  "
>
  “Take these broken wings and learn to fly, all your life you were only
  waiting for this moment to arise”
</p>


      <div className="flex justify-center">
        {/* MACOS DOCK */}
        <div
          ref={dockRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={reset}
          className="
            flex items-end gap-16
            px-36 py-10
            bg-neutral-400 rounded-full
            shadow-[0_30px_70px_rgba(0,0,0,0.18)]
          "
        >
          {companies.map((c, i) => (
            <div
              key={i}
              className="dock-item flex flex-col items-center transition-transform duration-200 ease-out cursor-pointer"
            >
              <img
                src={c.logo}
                alt={c.name}
                className="w-24 h-24 rounded-full object-cover shadow-2xl"
              />
              <span className="mt-3 text-lg font-extrabold text-white">
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
