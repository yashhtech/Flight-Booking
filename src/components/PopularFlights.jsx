import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const points = [
  "Instant ticket confirmation",
  "Top international airlines",
  "Smooth check-in experience",
  "Secure & fast payments",
]

const images = [
  "/travelerlove/10112781.jpg",
  "/travelerlove/world.jpg",
  "/travelerlove/bank.jpg",
  "/travelerlove/passport.jpg",
  "/travelerlove/flight.jpg",
]

const WhyTravelersLoveUs = () => {
  const containerRef = useRef(null)
  const cardRef = useRef(null)
  const headingRef = useRef(null)
  const pointRefs = useRef([])
  const imageRef = useRef(null)

  const [imgIndex, setImgIndex] = useState(0)

  /* Image transition without expensive CSS filter rasterization */
  useEffect(() => {
    if (!imageRef.current) return
    gsap.fromTo(
      imageRef.current,
      { opacity: 0.2, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
    )
  }, [imgIndex])

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((p) => (p + 1) % images.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let decryptRaf = null

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        /* Card entrance */
        gsap.fromTo(
          cardRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              once: true,
            },
          }
        )

        /* Points entrance */
        const validPoints = pointRefs.current.filter(Boolean)
        if (validPoints.length > 0) {
          gsap.fromTo(
            validPoints,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.15,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cardRef.current,
                start: "top 80%",
                once: true,
              },
            }
          )
        }

        /* Subtle image float */
        if (imageRef.current) {
          gsap.to(imageRef.current, {
            y: 8,
            duration: 2.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          })
        }
      }

      /* Heading decode animation */
      if (headingRef.current && !prefersReducedMotion) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        const original = headingRef.current.innerText
        let frame = 0

        const decrypt = () => {
          if (!headingRef.current) return
          headingRef.current.innerText = original
            .split("")
            .map((c, i) =>
              i < frame ? original[i] : chars[Math.floor(Math.random() * chars.length)]
            )
            .join("")
          frame++
          if (frame <= original.length) {
            decryptRaf = requestAnimationFrame(decrypt)
          }
        }

        ScrollTrigger.create({
          trigger: headingRef.current,
          start: "top 90%",
          once: true,
          onEnter: decrypt,
        })
      }
    }, containerRef)

    return () => {
      if (decryptRaf) cancelAnimationFrame(decryptRaf)
      ctx.revert()
    }
  }, [])

  return (
    <section ref={containerRef} className="py-16 px-4 sm:px-6 md:px-12 bg-slate-100 overflow-hidden">
      <div
        ref={cardRef}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl md:rounded-[40px] shadow-xl p-6 sm:p-10 border border-slate-200/80"
      >
        {/* IMAGE SIDE */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-200">
            <img
              ref={imageRef}
              src={images[imgIndex]}
              alt="Travel destination"
              loading="lazy"
              className="w-full h-full object-cover select-none"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="lg:col-span-7">
          <h3
            ref={headingRef}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 font-serif"
          >
            Why Travellers Love Us ✈️
          </h3>

          <div className="space-y-4">
            {points.map((point, i) => (
              <div
                key={i}
                ref={(el) => (pointRefs.current[i] = el)}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm transition hover:shadow-md hover:bg-indigo-50/50"
              >
                {/* NUMBER CIRCLE */}
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-lg shrink-0 shadow-md">
                  {i + 1}
                </div>

                <p className="text-slate-800 font-semibold text-base sm:text-lg">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyTravelersLoveUs
