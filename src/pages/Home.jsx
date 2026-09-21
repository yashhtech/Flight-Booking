import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import gsap from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import * as THREE from "three"
import GLOBE from "vanta/dist/vanta.globe.min"

import BestTravelerCard from "../components/BestTravelerCard"
import Navbar from "../components/Navbar"
import DestinationCard from "../components/DestinationCard"
import Footer from "../components/Footer"
import MacDock from "../components/MacDock"
import WhyTravelersLoveUs from "../components/PopularFlights"
import Newsletter from "../components/Newsletter"
import AutoSuggestInput from "../components/AutoSuggestInput"

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger)

/* ✈️ PAPER PLANE */
const PaperPlane = () => (
  <svg width="90" height="90" viewBox="0 0 24 24" fill="none">
    {/* Plane */}
    <path d="M2 12L22 2L15 22L11 13L2 12Z" fill="white" />
    {/* Smoke */}
    <path
      d="M-40 18 C -20 10, -10 26, 10 18"
      stroke="white"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
)

const Home = () => {
  const navigate = useNavigate()
  const [tripType, setTripType] = useState("One-way")
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [departureDate, setDepartureDate] = useState(null)
  const [returnDate, setReturnDate] = useState(null)
  const [travelClass, setTravelClass] = useState("Economy")
  const [travellers, setTravellers] = useState("1 Adult")

  const mainContainerRef = useRef(null)
  const heroTitleRef = useRef(null)
  const travelersTitleRef = useRef(null)
  const travelersOrbitRef = useRef(null)
  const planeRef = useRef(null)
  const globeRef = useRef(null)
  const vantaEffect = useRef(null)

  const handleSearch = () => {
    if (!origin || !destination || !departureDate) {
      alert("Please fill all required fields (Origin, Destination, Departure Date)")
      return
    }

    const depFormatted = departureDate ? departureDate.toISOString().split("T")[0] : ""
    const retFormatted = returnDate ? returnDate.toISOString().split("T")[0] : ""

    navigate("/profile", {
      state: {
        tab: "Flights",
        searchQuery: {
          from: origin,
          to: destination,
          departDate: depFormatted,
          returnDate: retFormatted,
          travelClass,
          passengers: parseInt(travellers) || 1,
          tripType,
        },
      },
    })
  }

  /* 🌍 VANTA EFFECT CLEANUP */
  useEffect(() => {
    if (!globeRef.current) return

    try {
      vantaEffect.current = GLOBE({
        el: globeRef.current,
        THREE,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        color: 0xff3f81,
        color2: 0xffffff,
        size: 1.1,
        backgroundColor: 0x111111,
      })
    } catch (err) {
      console.warn("Vanta globe effect skipped:", err)
    }

    return () => {
      if (vantaEffect.current && typeof vantaEffect.current.destroy === "function") {
        vantaEffect.current.destroy()
        vantaEffect.current = null
      }
    }
  }, [])

  /* 🎬 GSAP CONTEXT (PROPER LIFECYCLE MANAGEMENT) */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return

      // HERO TITLE ENTRANCE
      if (heroTitleRef.current && heroTitleRef.current.children) {
        gsap.fromTo(
          heroTitleRef.current.children,
          { y: -60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: "power3.out",
            duration: 1.2,
          }
        )
      }

      // PAPER PLANE ORBIT
      if (planeRef.current) {
        gsap.to(planeRef.current, {
          duration: 12,
          repeat: -1,
          ease: "none",
          motionPath: {
            path: [
              { x: -140, y: -80 },
              { x: 160, y: -140 },
              { x: 260, y: 0 },
              { x: 160, y: 140 },
              { x: -140, y: 80 },
            ],
            curviness: 1.8,
            autoRotate: true,
          },
        })

        const smokePath = planeRef.current.querySelector("path:nth-child(2)")
        if (smokePath) {
          gsap.fromTo(
            smokePath,
            { strokeDasharray: "5 15", opacity: 0.2 },
            {
              strokeDasharray: "20 5",
              opacity: 0.8,
              repeat: -1,
              yoyo: true,
              duration: 1.2,
              ease: "power1.inOut",
            }
          )
        }
      }

      // TRAVELERS CARDS ENTRANCE
      if (travelersOrbitRef.current) {
        const cards = gsap.utils.toArray(
          travelersOrbitRef.current.querySelectorAll(".travelers-cards > div")
        )

        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: travelersOrbitRef.current,
                start: "top 80%",
                once: true,
              },
            }
          )
        }
      }

      // TRAVELERS TITLE SCROLL SYNC
      if (travelersTitleRef.current) {
        gsap.fromTo(
          travelersTitleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: travelersTitleRef.current,
              start: "top 85%",
              once: true,
            },
          }
        )
      }
    }, mainContainerRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div ref={mainContainerRef} className="bg-white text-slate-800 overflow-x-hidden">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative min-h-[90vh] md:h-screen overflow-hidden flex items-center">
        <video
          src="https://res.cloudinary.com/dttbwsozv/video/upload/v1769223916/265858_opekh0.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

        <div className="relative z-10 px-6 sm:px-12 md:px-24 pt-28 md:pt-36 w-full max-w-7xl mx-auto">
          <div className="max-w-2xl relative">
            <div
              ref={planeRef}
              className="absolute top-1/2 left-1/2 pointer-events-none hidden md:block"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <PaperPlane />
            </div>

            <motion.h1
              ref={heroTitleRef}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-white cursor-default"
            >
              <span className="block text-sky-400">Journey</span>
              <span className="block">Beyond</span>
              <span className="block text-fuchsia-400">Tomorrow.</span>
            </motion.h1>

            <p className="mt-6 text-lg sm:text-2xl text-gray-200 font-light leading-relaxed">
              “I fly like paper, get high like planes, if you catch me at the border I’ve got visas in my name..!!”
            </p>
          </div>
        </div>
      </section>

      {/* ================= SEARCH BOX ================= */}
      <section className="relative z-30 px-4 sm:px-8 -mt-16 md:-mt-24 max-w-6xl mx-auto">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl md:rounded-[40px] shadow-2xl border border-slate-200 p-6 sm:p-8 text-slate-800 transition duration-300">
          {/* TRIP TYPE */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-6 bg-slate-100 rounded-full p-1.5 w-fit mx-auto sm:mx-0">
            {["One-way", "Round-trip", "Multi-city"].map((t) => (
              <button
                key={t}
                onClick={() => setTripType(t)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition ${
                  tripType === t
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
              >
                ✈️ {t}
              </button>
            ))}
          </div>

          {/* ROW 1: ORIGIN, DEPARTURE, DESTINATION, RETURN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">
                Origin
              </label>
              <AutoSuggestInput
                placeholder="📍 Source City"
                value={origin}
                onChange={setOrigin}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">
                Departure Date
              </label>
              <DatePicker
                selected={departureDate}
                onChange={setDepartureDate}
                placeholderText="📅 Departure Date"
                dateFormat="yyyy-MM-dd"
                className="w-full px-4 py-3 rounded-full border-2 border-slate-200 font-semibold hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">
                Destination
              </label>
              <AutoSuggestInput
                placeholder="📍 Destination City"
                value={destination}
                onChange={setDestination}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">
                Return Date
              </label>
              <DatePicker
                selected={returnDate}
                onChange={setReturnDate}
                disabled={tripType === "One-way"}
                placeholderText="📅 Return Date"
                dateFormat="yyyy-MM-dd"
                className={`w-full px-4 py-3 rounded-full border-2 border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  tripType === "One-way" ? "bg-slate-100 cursor-not-allowed opacity-60" : "hover:border-blue-500"
                }`}
              />
            </div>
          </div>

          {/* ROW 2: CLASS, TRAVELLERS, SUBMIT */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">
                🎟 Travel Class
              </label>
              <select
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
                className="w-full px-4 py-3 rounded-full border-2 border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">
                👥 Travellers
              </label>
              <select
                value={travellers}
                onChange={(e) => setTravellers(e.target.value)}
                className="w-full px-4 py-3 rounded-full border-2 border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="1 Adult">1 Adult</option>
                <option value="2 Adults">2 Adults</option>
                <option value="3 Adults">3 Adults</option>
                <option value="4+ Adults">4+ Adults</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <button
                onClick={handleSearch}
                className="w-full px-6 h-[50px] rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition transform hover:scale-[1.02] active:scale-[0.98]"
              >
                🔍 Find Ticket
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BEST TRAVELERS ================= */}
      <section className="px-6 sm:px-12 pt-24 pb-20 bg-white text-slate-900 relative z-10">
        <div ref={globeRef} className="absolute inset-0 z-0 opacity-80" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <h2
            ref={travelersTitleRef}
            className="text-3xl sm:text-5xl font-bold text-center mb-12 text-slate-900 font-serif"
          >
            Best Travelers Of This Month 🏆
          </h2>

          <div
            ref={travelersOrbitRef}
            className="relative flex justify-center items-center min-h-[380px]"
          >
            <div className="travelers-cards flex flex-wrap justify-center gap-8 md:gap-12">
              <BestTravelerCard
                placeImage="/places/dubai.jpg"
                personImage="/persons/raju.jpg"
                name="Raju Mullah"
                quote='"Exploring skies & cities worldwide"'
              />

              <BestTravelerCard
                placeImage="/places/london.jpg"
                personImage="/persons/tanya.jpg"
                name="Tanya Vetros"
                quote='"Wanderer. Dreamer. Explorer."'
              />

              <BestTravelerCard
                placeImage="/places/paris.jpg"
                personImage="/persons/marcus.jpg"
                name="Marcus Dias"
                quote='"Collecting moments, not things"'
              />

              <BestTravelerCard
                placeImage="/places/switzerland.jpg"
                personImage="/persons/zubair.jpg"
                name="Zubair Dyna"
                quote='"SkyRoute makes every trip magical"'
              />
            </div>
          </div>
        </div>
      </section>

      {/* DOCK & POPULAR FLIGHTS */}
      <MacDock />
      <WhyTravelersLoveUs />

      {/* DESTINATIONS */}
      <DestinationCard />

      {/* NEWSLETTER & FOOTER */}
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home
