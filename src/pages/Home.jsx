import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import TopBar from "../components/TopBar"
import Navbar from "../components/Navbar"
import FeatureCard from "../components/FeatureCard"
import DestinationCard from "../components/DestinationCard"
import Footer from "../components/Footer"

gsap.registerPlugin(MotionPathPlugin)

/* ✈️ PAPER PLANE WITH SMOKE */
const PaperPlane = () => (
  <svg width="90" height="90" viewBox="0 0 24 24" fill="none">
    {/* Plane */}
    <path
      d="M2 12L22 2L15 22L11 13L2 12Z"
      fill="white"
    />
    {/* Smoke */}
    <path
      d="M-40 18 C -20 10, -10 26, 10 18"
      stroke="white"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
)

const Home = () => {
  const [tripType, setTripType] = useState("One-way")
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [departureDate, setDepartureDate] = useState(null)
  const [returnDate, setReturnDate] = useState(null)

  const titleRef = useRef(null)
  const planeRef = useRef(null)

  const handleSearch = () => {
    if (!origin || !destination || !departureDate) {
      alert("Please fill all required fields")
      return
    }
    console.log({ tripType, origin, destination, departureDate, returnDate })
  }

  /* 🔥 GSAP TEXT + PLANE */
  useEffect(() => {
    // TEXT DROP + BOUNCE
    gsap.fromTo(
      titleRef.current.children,
      { y: -120, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.18,
        ease: "bounce.out",
        duration: 1.6
      }
    )

    // ✈️ PLANE ORBIT (SAFE)
    gsap.to(planeRef.current, {
      duration: 10,
      repeat: -1,
      ease: "none",
      motionPath: {
        path: [
          { x: -140, y: -80 },
          { x: 160, y: -140 },
          { x: 260, y: 0 },
          { x: 160, y: 140 },
          { x: -140, y: 80 }
        ],
        curviness: 1.8,
        autoRotate: true
      }
    })

    // ☁️ SMOKE ANIMATION
    gsap.fromTo(
      planeRef.current.querySelector("path:nth-child(2)"),
      { strokeDasharray: "5 15", opacity: 0.2 },
      {
        strokeDasharray: "20 5",
        opacity: 0.8,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut"
      }
    )
  }, [])

  return (
    <div className="bg-[#0E1626] text-white overflow-x-hidden">

      <TopBar />
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* VIDEO */}
        <video
          src="https://res.cloudinary.com/dttbwsozv/video/upload/v1769223916/265858_opekh0.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

        <div className="relative z-10 w-full px-10 md:px-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* LEFT TEXT */}
            <div className="relative">

              {/* ✈️ PLANE */}
              <div
                ref={planeRef}
                className="absolute top-1/2 left-1/2 z-30 pointer-events-none"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <PaperPlane />
              </div>

              <p className="text-sky-300 tracking-widest text-sm mb-4">
                THE YEAR IS 2026
              </p>

              <motion.h1
  ref={titleRef}
  whileHover={{ scale: 1.05 }}
  transition={{ type: "spring", stiffness: 120 }}
  className="text-[52px] md:text-[72px] font-extrabold leading-tight cursor-default"
>
  <span className="block hover:text-sky-300 transition">
    Journey
  </span>
  <span className="block hover:text-indigo-300 transition">
    Beyond
  </span>
  <span className="block hover:text-purple-300 transition">
    Tomorrow.
  </span>
</motion.h1>


              <p className="mt-6 text-2xl text-gray-200 block hover:text-indigo-300 transition">
                “I fly like paper, get high like planes, if you catch me at the border I’ve got visas in my name..!!”
              </p>
            </div>

            {/* SEARCH CARD */}
            <motion.div
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 30 }}
  transition={{ duration: 1 }}
  whileHover={{
    scale: 1.04,
    boxShadow: "0 0 40px rgba(255,255,255,0.35)"
  }}
  className="mt-20 w-full max-w-\[520px\] rounded-[36px] border border-white bg-transparent p-8"
>


              {/* TABS */}
              <div className="flex gap-3 mb-6 bg-white/90 rounded-full p-1">
                {["One-way", "Round-trip", "Multi-city"].map(t => (
                  <button
                    key={t}
                    onClick={() => setTripType(t)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition
                      ${tripType === t
                        ? "bg-white text-black shadow"
                        : "text-gray-600 hover:bg-white/70"}
                    `}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* INPUTS */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="📍 Origin"
                  value={origin}
                  onChange={e => setOrigin(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-white text-gray-700
                   transition hover:scale-[1.03] hover:shadow-lg"
                />

                <DatePicker
                  selected={departureDate}
                  onChange={setDepartureDate}
                  placeholderText="📅 Departure"
                  className="w-full px-4 py-3 rounded-xl bg-white text-gray-700"
                />

                <input
                  placeholder="📍 Destination"
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-white text-gray-700"
                />

                <DatePicker
                  selected={returnDate}
                  onChange={setReturnDate}
                  placeholderText="📅 Return"
                  disabled={tripType === "One-way"}
                  className="w-full px-4 py-3 rounded-xl bg-white text-gray-700"
                />
              </div>

              <motion.button
                onClick={handleSearch}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg"
              >
                Search Flights
              </motion.button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-12 py-28 bg-[#F5F7FB] text-[#0E1626]">
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard />
          <FeatureCard />
          <FeatureCard />
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="px-12 py-28 bg-[#EDF1F7] text-[#0E1626]">
        <h2 className="text-4xl font-bold mb-14">
          Travel to make memories all around the world
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <DestinationCard />
          <DestinationCard />
          <DestinationCard />
          <DestinationCard />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
