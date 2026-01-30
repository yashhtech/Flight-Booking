import React from "react"
import TopBar from "../components/TopBar"
import Navbar from "../components/Navbar"
import Footer from '../components/Footer'
import DestinationCard from "../components/DestinationCard"
import { useState, useMemo } from "react"

const DESTINATIONS = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    image: "/destinations/bali.jpg",
    tagline: "Island of Gods",
  },
  {
    id: 2,
    name: "Dubai",
    country: "UAE",
    region: "Middle East",
    image: "/destinations/dubai.jpg",
    tagline: "Luxury & Skyscrapers",
  },
  {
    id: 3,
    name: "Paris",
    country: "France",
    region: "Europe",
    image: "/destinations/paris.jpg",
    tagline: "City of Love",
  },
  {
    id: 4,
    name: "Bangkok",
    country: "Thailand",
    region: "Asia",
    image: "/destinations/bangkok.jpg",
    tagline: "Vibrant Street Life",
  },
  {
    id: 5,
    name: "Maldives",
    country: "Maldives",
    region: "Asia",
    image: "/destinations/maldives.jpg",
    tagline: "Tropical Paradise",
  },
  {
    id: 6,
    name: "Cairo",
    country: "Egypt",
    region: "Africa",
    image: "/destinations/egypt.jpg",
    tagline: "Land of Pharaohs",
  },
]

const REGIONS = ["All", "Asia", "Europe", "Middle East", "Africa"]

const Destinations = () => {
  const [search, setSearch] = useState("")
  const [region, setRegion] = useState("All")

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter(d => {
      const matchSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.country.toLowerCase().includes(search.toLowerCase())

      const matchRegion = region === "All" || d.region === region

      return matchSearch && matchRegion
    })
  }, [search, region])

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0b1d3a] to-[#020617] text-white">
         <Navbar/>
      {/* 🌍 HERO */}
      <div className="relative h-[70vh] flex items-center justify-center text-center px-6">
        <img
          src="/places/paris.jpg"
          alt="Explore world"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Explore The World
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Discover breathtaking destinations & unforgettable journeys
          </p>

          {/* 🔍 SEARCH */}
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search city or country..."
            className="mt-8 w-full px-6 py-4 rounded-full text-black font-semibold outline-none"
          />
        </div>
      </div>

      {/* 🌐 FILTERS */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap gap-4 justify-center">
        {REGIONS.map(r => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={`px-6 py-2 rounded-full font-semibold transition
              ${
                region === r
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 hover:bg-white/20"
              }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* 🧭 DESTINATIONS GRID */}
      <div className="max-w-7xl mx-auto px-6 pb-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDestinations.map(dest => (
          <div
            key={dest.id}
            className="group relative rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl transition duration-500"
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-[360px] object-cover group-hover:scale-110 transition duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-2xl font-bold">
                {dest.name}
              </h3>
              <p className="text-sm text-gray-200">
                {dest.country} • {dest.tagline}
              </p>

              <button className="mt-4 inline-block px-5 py-2 bg-white text-black font-bold rounded-full hover:bg-blue-500 hover:text-white transition">
                Explore →
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </section>
  )
}

export default Destinations
