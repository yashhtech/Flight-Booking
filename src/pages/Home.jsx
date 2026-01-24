import { useState } from "react"
import { motion } from "framer-motion"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import TopBar from "../components/TopBar"
import Navbar from "../components/Navbar"
import FeatureCard from "../components/FeatureCard"
import DestinationCard from "../components/DestinationCard"
import Footer from "../components/Footer"


const Home = () => {
  const [tripType, setTripType] = useState("One-way")
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [departureDate, setDepartureDate] = useState(null)
  const [returnDate, setReturnDate] = useState(null)

  const handleSearch = () => {
    if (!origin || !destination || !departureDate) {
      alert("Please fill all required fields")
      return
    }

    console.log({
      tripType,
      origin,
      destination,
      departureDate,
      returnDate
    })
  }

  return (
    <div className="bg-[#0E1626] text-white overflow-x-hidden">

      <TopBar />
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        <video
          src="https://res.cloudinary.com/dttbwsozv/video/upload/v1769223241/264848_medium_qg0wjx.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/40" />

        <div className="relative z-10 w-full px-10 md:px-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* LEFT TEXT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="text-sky-300 tracking-widest text-sm mb-4">
                THE YEAR IS 2026
              </p>

              <h1 className="text-[52px] md:text-[72px] font-extrabold leading-tight">
                Journey <br /> Beyond <br /> Tomorrow.
              </h1>

              <p className="mt-6 text-xl text-gray-200">
                Your Future Awaits.
              </p>
            </motion.div>

            {/* 🔥 SEARCH CARD — IMAGE STYLE (NO GLASS) */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 30 }}
              transition={{ duration: 1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 40px 120px rgba(0,0,0,0.45)"
              }}
              className="
                mt-20
                w-full max-w-\[520px\]
                rounded-[36px]
                border border-white
                bg-transparent
                p-8
              "
            >

              {/* TABS */}
              <div className="flex gap-3 mb-6 bg-white/90 rounded-full p-1">
                {[
                  { label: "One-way", icon: "🛫" },
                  { label: "Round-trip", icon: "🔁" },
                  { label: "Multi-city", icon: "🌐" }
                ].map(t => (
                  <button
                    key={t.label}
                    onClick={() => setTripType(t.label)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition
                      ${tripType === t.label
                        ? "bg-white text-black shadow"
                        : "text-gray-600 hover:bg-white/70"}
                    `}
                  >
                    <span>{t.icon}</span> {t.label}
                  </button>
                ))}
              </div>

              {/* INPUTS */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="📍 Origin"
                  value={origin}
                  onChange={e => setOrigin(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none"
                />

                <DatePicker
                  selected={departureDate}
                  onChange={date => setDepartureDate(date)}
                  placeholderText="📅 Departure"
                  className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 focus:outline-none"
                />

                <input
                  placeholder="📍 Destination"
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none"
                />

                <DatePicker
                  selected={returnDate}
                  onChange={date => setReturnDate(date)}
                  placeholderText="📅 Return"
                  disabled={tripType === "One-way"}
                  className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 focus:outline-none"
                />
              </div>

              {/* BUTTON (COLOR CHANGED) */}
              <motion.button
                onClick={handleSearch}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 60px rgba(59,130,246,0.7)"
                }}
                whileTap={{ scale: 0.95 }}
                className="
                  mt-6 w-full py-3 rounded-xl
                  bg-linear-to-r from-blue-500 to-indigo-600
                  text-white font-semibold text-lg
                "
              >
                Search Flights
              </motion.button>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="px-12 py-28 bg-[#F5F7FB] text-[#0E1626]">
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard />
          <FeatureCard />
          <FeatureCard />
        </div>
      </section>

      {/* ================= DESTINATIONS ================= */}
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
