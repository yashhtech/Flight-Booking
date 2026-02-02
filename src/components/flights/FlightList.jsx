import { useEffect, useRef, useState } from "react"
import FlightCard from "./FlightCard"

const sections = [
  { title: "🔥 Trending Flights", type: "trending", bg: "bg-gradient-to-r from-rose-100 to-pink-200" },
  { title: "💸 Economy Flights", type: "economy", bg: "bg-gradient-to-r from-emerald-100 to-green-200" },
  { title: "🇮🇳 National Flights", type: "national", bg: "bg-gradient-to-r from-sky-100 to-blue-200" },
  { title: "🌍 International Flights", type: "international", bg: "bg-gradient-to-r from-violet-100 to-purple-200" }
]

const cities = ["All", "Delhi", "Mumbai", "Bangalore", "Jaipur"]

const FlightList = () => {
  const [flightsData, setFlightsData] = useState([])
  const [search, setSearch] = useState("")
  const [activeCity, setActiveCity] = useState("All")
  const [visibleCount, setVisibleCount] = useState({})
  const sectionRefs = useRef([])

  /* 🔽 FETCH DATA */
  useEffect(() => {
    fetch("http://localhost:3001/flights")
      .then(res => res.json())
      .then(data => setFlightsData(data))
      .catch(err => console.log(err))
  }, [])

  /* 🔥 SCROLL ANIMATION */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
          }
        })
      },
      { threshold: 0.2 }
    )

    sectionRefs.current.forEach(sec => sec && observer.observe(sec))
  }, [])

  /* 🔢 SHOW MORE HELPERS */
  const getVisible = type => visibleCount[type] || 8

  const showMore = type => {
    setVisibleCount(prev => ({
      ...prev,
      [type]: getVisible(type) + 8
    }))
  }

  const showLess = type => {
    setVisibleCount(prev => ({
      ...prev,
      [type]: 8
    }))
  }

  return (
    <div className="w-full">

      {/* 🌆 CITY FILTER BUTTONS */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur p-6 shadow">
        <div className="flex flex-wrap justify-center gap-4">
          {cities.map(city => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300
                ${activeCity === city
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white scale-105 shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:scale-105 hover:bg-gray-300"}
              `}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* 🔽 SECTIONS */}
      {sections.map((sec, index) => {
        const filteredFlights = flightsData.filter(f =>
          f.type === sec.type &&
          (activeCity === "All" ||
            f.from === activeCity ||
            f.to === activeCity) &&
          (f.from.toLowerCase().includes(search.toLowerCase()) ||
           f.to.toLowerCase().includes(search.toLowerCase()))
        )

        return (
          <section
            key={sec.type}
            ref={el => (sectionRefs.current[index] = el)}
            className={`${sec.bg} w-full py-16 px-6 transition-all duration-700
              opacity-0 translate-y-20`}
          >
            <div className="max-w-7xl mx-auto">

              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-3xl font-extrabold text-gray-800">
                  {sec.title}
                </h2>

                <input
                  type="text"
                  placeholder="Search city..."
                  className="px-5 py-3 rounded-full outline-none shadow-md focus:ring-2 focus:ring-indigo-400"
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              {/* ✈️ FLIGHT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredFlights
                  .slice(0, getVisible(sec.type))
                  .map(flight => (
                    <div
                      key={flight.id}
                      className="transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                    >
                      <FlightCard flight={flight} />
                    </div>
                  ))}
              </div>

              {/* 🔽 SHOW MORE / LESS */}
             <div className="flex justify-center gap-4 mt-12">
  <button
    disabled={filteredFlights.length <= getVisible(sec.type)}
    onClick={() => showMore(sec.type)}
    className={`px-10 py-3 rounded-full font-bold transition
      ${filteredFlights.length > getVisible(sec.type)
        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:scale-105"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"}
    `}
  >
    Show More ✈️
  </button>

  {getVisible(sec.type) > 8 && (
    <button
      onClick={() => showLess(sec.type)}
      className="px-10 py-3 rounded-full font-bold
        bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
    >
      Show Less ⬆️
    </button>
  )}
</div>


            </div>
          </section>
        )
      })}
    </div>
  )
}

export default FlightList
