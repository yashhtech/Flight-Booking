import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import BestTravelerCard from "../components/BestTravelerCard"
import TopBar from "../components/TopBar"
import Navbar from "../components/Navbar"
import DestinationCard from "../components/DestinationCard"
import Footer from "../components/Footer"
import { ScrollTrigger } from "gsap/ScrollTrigger"


gsap.registerPlugin(MotionPathPlugin)
gsap.registerPlugin(ScrollTrigger)

/* ✈️ PAPER PLANE */
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
      strokeWidth="4"
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

  const heroTitleRef = useRef(null)
  const travelersTitleRef = useRef(null)
  const travelersOrbitRef = useRef(null)


  const planeRef = useRef(null)

  const handleSearch = () => {
    if (!origin || !destination || !departureDate) {
      alert("Please fill all required fields")
      return
    }
    console.log({ tripType, origin, destination, departureDate, returnDate })
  }
   
   
useEffect(() => {
  if (!travelersOrbitRef.current) return

  const cards = travelersOrbitRef.current.querySelectorAll(
    ".travelers-cards > div"
  )

  // 🚀 INITIAL SET
  gsap.set(cards, {
    y: -140,
    opacity: 0,
    scale: 0.9,
    willChange: "transform",
  })

  // 🌧 DROP + SPREAD (ON SCROLL)
  gsap.to(cards, {
    y: 0,
    opacity: 1,
    scale: 1,
    duration: 1.4,
    stagger: 0.18,
    ease: "power4.out",
    scrollTrigger: {
      trigger: travelersOrbitRef.current,
      start: "top 75%",
    },
  })

  // 🌬 FLOATING IDLE MOTION (SUBTLE PREMIUM FEEL)
  cards.forEach((card, i) => {
    gsap.to(card, {
      y: "+=14",
      duration: 3 + i * 0.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: i * 0.2,
    })

    gsap.to(card, {
      rotation: i % 2 === 0 ? 1.5 : -1.5,
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    })
  })
}, [])



useEffect(() => {
  if (!travelersTitleRef.current) return

  gsap.fromTo(
    travelersTitleRef.current,
    {
      y: 60,
      opacity: 0,
      willChange: "transform, opacity",
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.4,
      ease: "power3.out",
      force3D: true,
      scrollTrigger: {
        trigger: travelersTitleRef.current,
        start: "top 85%",
        end: "top 65%",
        scrub: 0.6,        // 👈 SMOOTH SCROLL SYNC
      },
    }
  )
}, [])




  useEffect(() => {
    gsap.fromTo(
      heroTitleRef.current.children,
      { y: -120, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.18,
        ease: "bounce.out",
        duration: 1.6
      }
    )

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
    <div className="bg-[#fff] text-white overflow-x-hidden">

      <TopBar />
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative h-screen overflow-hidden pb-40 rounded">
        <video
          src="https://res.cloudinary.com/dttbwsozv/video/upload/v1769223916/265858_opekh0.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

        <div className="relative z-10 px-10 md:px-24 pt-40 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div
              ref={planeRef}
              className="absolute top-1/2 left-1/2 pointer-events-none"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <PaperPlane />
            </div>

            <motion.h1
  ref={heroTitleRef}
  whileHover={{ scale: 1.05 }}
  transition={{ type: "spring", stiffness: 120 }}
  className="text-[52px] md:text-[72px] font-extrabold leading-tight cursor-default"
>
  <span className="block text-sky-400 hover:text-amber-300 transition">
    Journey
  </span>
  <span className="block hover:text-shadow-red-400 transition">
    Beyond
  </span>
  <span className="block hover:text-fuchsia-400 transition">
    Tomorrow.
  </span>
</motion.h1>

            <p className="mt-5 text-2xl text-gray-200 block hover:text-sky-300 transition">
                “I fly like paper, get high like planes, if you catch me at the border I’ve got visas in my name..!!” </p>
          </div>
        </div>
      </section>

      {/* ================= SEARCH (HALF OVERLAP FIXED) ================= */}
      <section className="relative z-30 px-6 -mt-26">
        <div className="mx-auto max-w-6xl bg-white rounded-[50px] shadow border-b-black-4 p-5 text-gray-800 transition-transform duration-500 ease-in-out hover:scale-105">

          {/* TRIP TYPE */}
          <div className="flex gap-3 mb-6 bg-gray-100 rounded-full p-2   w-fit ml-90"> 
            {["One-way", "Round-trip", "Multi-city"].map(t => (
              <button
                key={t}
                onClick={() => setTripType(t)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition 
                  ${tripType === t
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-blue-100"}
                `}
              >
                ✈️ {t}
              </button>
            ))}
          </div>

          {/* ROW 1 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <input
                placeholder="📍 Source"
                value={origin}
                onChange={e => setOrigin(e.target.value)}
                className="w-full px-4 py-3 rounded-full border-2 font-semibold
                hover:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <DatePicker
                selected={departureDate}
                onChange={setDepartureDate}
                placeholderText="📅 Departure"
                className="w-full px-4 py-3 rounded-full border-2 font-semibold hover:border-red-500 transition"
              />
            </div>

            <div>
              <input
                placeholder="📍 Destination"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                className="w-full px-4 py-3 rounded-full border-2 font-semibold
                hover:border-blue-500 transition"
              />
            </div>

            <div>
              <DatePicker
                selected={returnDate}
                onChange={setReturnDate}
                disabled={tripType === "One-way"}
                placeholderText="📅 Return"
                className="w-full px-4 py-3 rounded-full border-2 font-semibold hover:border-red-500 transition"
              />
            </div>
          </div>

          {/* ROW 2 */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div>
              <label className="font-semibold mb-1 block">🎟 Travel Class</label>
              <select className="w-full px-4 py-3 rounded-full border-2 font-semibold hover:border-blue-500 transition">
                <option>Economy</option>
                <option>Business</option>
              </select>
            </div>

            <div>
              <label className="font-semibold mb-1 block">👥 Travellers</label>
              <select className="w-full px-4 py-3 rounded-full border-2 font-semibold hover:border-red-500 transition">
                <option>1 Adult</option>
                <option>2 Adults</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button
                onClick={handleSearch}
                className="w-full
               px-6 h-[54px] 
               rounded-full
               bg-red-600 hover:bg-green-500
               text-white text-lg font-bold
               flex items-center justify-center gap-2
               transition
               ">
                🔍 Find Ticket
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* BEST TRAVELERS */}
   <section className="px-12 pt-28 pb-28 bg-white text-[#161f32] relative z-10 ">
   
   <h2
    ref={travelersTitleRef}
    className="text-5xl font-bold text-center mb-14 font-serif pb-25 "
  >
    Best Travelers Of This Month
  </h2>
    <div
  ref={travelersOrbitRef}
  className="relative flex justify-center items-center min-h-[420px] pt-10 perspective-[1200px]"
>


  <div className="travelers-cards flex flex-wrap justify-center gap-16">

    <BestTravelerCard
      placeImage="places/dubai.jpg"
      personImage="persons/raju.jpg"
      name="Raju Mullah"
      quote=' "Exploring skies & cities worldwide" '
    />

    <BestTravelerCard
      placeImage="places/london.jpg"
      personImage="persons/tanya.jpg"
      name="Tanya Vetros"
      quote= '"Wanderer. Dreamer. Explorer."'
    />

    <BestTravelerCard
      placeImage="places/paris.jpg"
      personImage="persons/marcus.jpg"
      name="Marcus Dias"
      quote= ' "Collecting moments, not things" '
    />

    <BestTravelerCard
      placeImage="places/switzerland.jpg"
      personImage="persons/zubair.jpg"
      name="Zubair Dyna"
      quote="Collecting moments, not things"
    />
  </div>

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
