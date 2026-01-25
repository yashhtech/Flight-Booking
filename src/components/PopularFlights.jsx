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

const images = ["/10112781.jpg", "/boarding.jpg"]

const WhyTravelersLoveUs = () => {
  const cardRef = useRef(null)
  const headingRef = useRef(null)
  const pointsRef = useRef([])
  const imageRef = useRef(null)

  const [imgIndex, setImgIndex] = useState(0)

  /* 🔁 IMAGE SWAP */
  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  /* 🎬 ANIMATIONS */
  useEffect(() => {
    // FLOAT CARD
    gsap.fromTo(
      cardRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
        },
      }
    )

    // HEADING PUZZLE EFFECT
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*"
    const original = headingRef.current.innerText
    let frame = 0

    const scramble = () => {
      headingRef.current.innerText = original
        .split("")
        .map((char, i) =>
          i < frame ? original[i] : chars[Math.floor(Math.random() * chars.length)]
        )
        .join("")

      frame++
      if (frame <= original.length) requestAnimationFrame(scramble)
    }

    ScrollTrigger.create({
      trigger: headingRef.current,
      start: "top 85%",
      once: true,
      onEnter: scramble,
    })

    // BULLET POINT STAIR EFFECT
    gsap.fromTo(
      pointsRef.current,
      { x: 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.25,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 75%",
        },
      }
    )
  }, [])

  return (
    <section className="py-24 px-6 bg-white">
      <div
        ref={cardRef}
        className="
          max-w-6xl mx-auto
          grid md:grid-cols-2 gap-14
          bg-white rounded-3xl
          shadow-[0_40px_90px_rgba(0,0,0,0.15)]
          p-10
        "
      >
        {/* LEFT IMAGE */}
        <div className="flex justify-center items-center">
          <img
            ref={imageRef}
            key={imgIndex}
            src={images[imgIndex]}
            alt="ticket"
            className="
              w-full max-w-sm
              transition-all duration-700
              hover:scale-105
              drop-shadow-2xl
            "
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h3
            ref={headingRef}
            className="text-4xl font-extrabold mb-8 text-indigo-700"
          >
            Why travelers love us
          </h3>

          <div className="space-y-4">
            {points.map((point, i) => (
              <div
                key={i}
                ref={(el) => (pointsRef.current[i] = el)}
                className={`
                  flex items-center gap-4
                  px-6 py-4 rounded-full
                  font-semibold text-white
                  shadow-lg
                  hover:scale-105 transition
                  ${[
                    "bg-gradient-to-r from-blue-500 to-indigo-500",
                    "bg-gradient-to-r from-emerald-500 to-teal-500",
                    "bg-gradient-to-r from-pink-500 to-rose-500",
                    "bg-gradient-to-r from-orange-400 to-yellow-400",
                  ][i]}
                `}
              >
                <span className="text-xl">✔</span>
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyTravelersLoveUs
