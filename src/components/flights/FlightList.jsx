import { useEffect, useState } from "react"
import FlightCard from "./FlightCard"

const sections = [
  { title: "🔥 Trending Flights", type: "trending", bg: "bg-rose-100" },
  { title: "💸 Economy Flights", type: "economy", bg: "bg-emerald-100" },
  { title: "🇮🇳 National Flights", type: "national", bg: "bg-sky-100" },
  { title: "🌍 International Flights", type: "international", bg: "bg-violet-100" }
]

const FlightList = () => {
  const [flightsData, setFlightsData] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
  fetch("http://localhost:3001/flights")
    .then(res => res.json())
    .then(data => {
      console.log("Flights fetched:", data)
      setFlightsData(data)
    })
    .catch(err => console.log("Error fetching flights:", err))
}, [])


  return (
    <div className="space-y-16">
      {sections.map(sec => (
        <section
          key={sec.type}
          className={`${sec.bg} p-6 rounded-3xl shadow-inner`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold">{sec.title}</h2>
            <input
              type="text"
              placeholder="Search destination..."
              className="px-4 py-2 rounded-full outline-none shadow"
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slideUp">
            {flightsData
              .filter(
                f =>
                  f.type === sec.type &&
                  (f.from.toLowerCase().includes(search.toLowerCase()) ||
                    f.to.toLowerCase().includes(search.toLowerCase()))
              )
              .slice(0, 8)
              .map(flight => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default FlightList
