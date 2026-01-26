import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const points = [
  "Instant ticket confirmation",
  "Top international airlines",
  "Smooth check-in experience",
  "Secure & fast payments ",
]

const images = ["/travelerlove/10112781.jpg", "/travelerlove/world.jpg","/travelerlove/bank.jpg","/travelerlove/passport.jpg","/travelerlove/flight.jpg"]

const WhyTravelersLoveUs = () => {
  const cardRef = useRef(null)
  const headingRef = useRef(null)
  const pointRefs = useRef([])
  const imageRef = useRef(null)

  const [imgIndex, setImgIndex] = useState(0)

  /* 🖼 IMAGE SWITCH (SLOW & PREMIUM) */
useEffect(() => {
  if (!imageRef.current) return

  gsap.fromTo(
    imageRef.current,
    {
      opacity: 0,
      scale: 1.08,
      filter: "blur(8px)",
    },
    {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.4,
      ease: "power3.out",
    }
  )
}, [imgIndex])

useEffect(() => {
  const interval = setInterval(() => {
    setImgIndex((p) => (p + 1) % images.length)
  }, 4200)

  return () => clearInterval(interval)
}, [])



  useEffect(() => {
    /* FLOAT CARD */
    gsap.fromTo(
      cardRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
      }
    )

    /* HEADING DECODE (SLOW) */
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    const original = headingRef.current.innerText
    let frame = 0

    const decrypt = () => {
      headingRef.current.innerText = original
        .split("")
        .map((c, i) =>
          i < frame ? original[i] : chars[Math.floor(Math.random() * chars.length)]
        )
        .join("")
      frame++
      if (frame <= original.length) requestAnimationFrame(decrypt)
    }

    ScrollTrigger.create({
      trigger: headingRef.current,
      start: "top 90%",
      once: true,
      onEnter: decrypt,
    })

    /* POINTS – SLOW STAIR */
    gsap.fromTo(
      pointRefs.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.35,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
        },
      }
    )

    /* IMAGE FLOAT */
    gsap.to(imageRef.current, {
      y: 14,
      rotate: 1.5,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    })
  }, [])

  return (
    <section className="py-14 px-6 bg-gray-700 ">
      <div
        ref={cardRef}
        className="
          max-w-8xl mx-auto 
          grid md:grid-cols-2 gap-12
          rounded-full
          bg-white
          shadow-[0_35px_90px_rgba(0,0,0,0.12)]
          p-10
          hover:scale-110
          
        "
      >
        {/* IMAGE SIDE */}
        <div className="relative flex justify-center items-center  w-[360px] h-[460px] rounded-full mt-10 ml-22 hover:shadow-2xl">
  
          <img
            ref={imageRef}
            src={images[imgIndex]}
            alt="ticket"
            className="
              relative z-10
              rounded-full
              w-[360px] h-[460px]
              object-cover
              will-change-transform
              transition-all duration-700
              hover:scale-110 hover:rotate-1
              drop-shadow-2xl
            "
          />
        </div>

        {/* CONTENT */}
        <div className=" -ml-40 mr-19 bg-white rounded-r-full">
          <h3
            ref={headingRef}
            className=" text-5xl font-extrabold text-slate-900 mb-10 font-serif"
          >
            Why Travellers love us 🗺️⁀જ✈︎
          </h3>

          <div className="space-y-6 bg-white rounded-4xl mb-5">
            {points.map((point, i) => (
              <div
                key={i}
                ref={(el) => (pointRefs.current[i] = el)}
                className="
                  flex items-center gap-5
                  p-5  rounded-full
                  bg-slate-50
                  border border-slate-200
                  shadow-sm
                  
                  transition-all duration-300
                  hover:shadow-xl hover:-translate-y-1
                "
              >
                {/* NUMBER CIRCLE */}
                <div
                  className="
                    w-11 h-11
                    flex items-center justify-center
                    rounded-full
                    bg-indigo-600
                    text-white font-bold text-3xl
                    shrink-0
                  "
                >
                  {i + 1}
                </div>

                <p className="text-slate-700 font-semibold text-3xl">
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
