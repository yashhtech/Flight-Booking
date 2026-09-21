import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Check, Info } from "lucide-react"
import Navbar from "../components/Navbar"

const SEAT_ROWS = 12
const SEAT_LETTERS = ["A", "B", "C", "D", "E", "F"]

// Generate initial seat layout
const generateSeats = () => {
  const seats = []
  for (let r = 1; r <= SEAT_ROWS; r++) {
    for (const letter of SEAT_LETTERS) {
      const id = `${r}${letter}`
      const isBusiness = r <= 3
      const isPremium = r > 3 && r <= 6
      const isOccupied = (r * 7 + letter.charCodeAt(0)) % 5 === 0

      seats.push({
        id,
        row: r,
        letter,
        tier: isBusiness ? "Business" : isPremium ? "Premium" : "Economy",
        price: isBusiness ? 1200 : isPremium ? 600 : 250,
        occupied: isOccupied,
      })
    }
  }
  return seats
}

const SeatSelection = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const flight = location.state?.flight || {
    airline: "Air India",
    flightNumber: "AI-202",
    from: "Delhi",
    to: "Mumbai",
  }

  const [seats] = useState(generateSeats)
  const [selectedSeats, setSelectedSeats] = useState([])

  const toggleSeat = (seat) => {
    if (seat.occupied) return
    if (selectedSeats.find((s) => s.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id))
    } else {
      setSelectedSeats([...selectedSeats, seat])
    }
  }

  const totalSeatPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0)

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="text-right">
            <h1 className="text-xl md:text-2xl font-bold text-white">Select Your Seat</h1>
            <p className="text-sm text-cyan-400">
              {flight.airline} • {flight.flightNumber || "Flight"} ({flight.from} → {flight.to})
            </p>
          </div>
        </div>

        {/* LEGEND */}
        <div className="flex flex-wrap items-center justify-center gap-6 p-4 bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700/60 mb-8 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-slate-700 border border-slate-600 block" />
            <span>Available (₹250)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-indigo-600 border border-indigo-500 block" />
            <span>Premium (₹600)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-purple-600 border border-purple-500 block" />
            <span>Business (₹1,200)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-cyan-400 text-slate-950 flex items-center justify-center font-bold text-[10px]">
              ✓
            </span>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-slate-800 text-slate-600 border border-slate-800 block cursor-not-allowed opacity-50" />
            <span>Occupied</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CABIN MAP */}
          <div className="lg:col-span-2 bg-slate-950/70 p-6 md:p-10 rounded-3xl border border-slate-800 flex flex-col items-center">
            {/* NOSE CONE */}
            <div className="w-32 h-12 border-t-2 border-x-2 border-slate-700 rounded-t-full mb-6 flex items-center justify-center text-xs text-slate-500 font-semibold uppercase tracking-widest">
              Cockpit
            </div>

            {/* SEAT GRID */}
            <div className="space-y-3 w-full max-w-md">
              {Array.from({ length: SEAT_ROWS }).map((_, rIndex) => {
                const rowNum = rIndex + 1
                return (
                  <div key={rowNum} className="flex items-center justify-between gap-2">
                    <span className="w-6 text-center text-xs font-semibold text-slate-500">
                      {rowNum}
                    </span>

                    {/* Left 3 seats (A, B, C) */}
                    <div className="flex gap-2">
                      {["A", "B", "C"].map((letter) => {
                        const seat = seats.find((s) => s.row === rowNum && s.letter === letter)
                        const isSelected = selectedSeats.some((s) => s.id === seat.id)

                        let bgColor = "bg-slate-700 hover:bg-slate-600 border-slate-600"
                        if (seat.tier === "Business") bgColor = "bg-purple-900/80 hover:bg-purple-800 border-purple-600 text-purple-200"
                        if (seat.tier === "Premium") bgColor = "bg-indigo-900/80 hover:bg-indigo-800 border-indigo-600 text-indigo-200"
                        if (seat.occupied) bgColor = "bg-slate-800/40 border-slate-800 text-slate-600 cursor-not-allowed opacity-40"
                        if (isSelected) bgColor = "bg-cyan-400 text-slate-950 font-bold border-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.5)]"

                        return (
                          <motion.button
                            key={seat.id}
                            whileTap={!seat.occupied ? { scale: 0.92 } : {}}
                            disabled={seat.occupied}
                            onClick={() => toggleSeat(seat)}
                            aria-label={`Seat ${seat.id} ${seat.tier}`}
                            className={`w-9 h-10 rounded-lg text-xs font-medium border flex items-center justify-center transition-colors ${bgColor}`}
                          >
                            {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : letter}
                          </motion.button>
                        )
                      })}
                    </div>

                    {/* Aisle */}
                    <div className="w-6 text-center text-[10px] text-slate-600 font-mono">
                      |
                    </div>

                    {/* Right 3 seats (D, E, F) */}
                    <div className="flex gap-2">
                      {["D", "E", "F"].map((letter) => {
                        const seat = seats.find((s) => s.row === rowNum && s.letter === letter)
                        const isSelected = selectedSeats.some((s) => s.id === seat.id)

                        let bgColor = "bg-slate-700 hover:bg-slate-600 border-slate-600"
                        if (seat.tier === "Business") bgColor = "bg-purple-900/80 hover:bg-purple-800 border-purple-600 text-purple-200"
                        if (seat.tier === "Premium") bgColor = "bg-indigo-900/80 hover:bg-indigo-800 border-indigo-600 text-indigo-200"
                        if (seat.occupied) bgColor = "bg-slate-800/40 border-slate-800 text-slate-600 cursor-not-allowed opacity-40"
                        if (isSelected) bgColor = "bg-cyan-400 text-slate-950 font-bold border-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.5)]"

                        return (
                          <motion.button
                            key={seat.id}
                            whileTap={!seat.occupied ? { scale: 0.92 } : {}}
                            disabled={seat.occupied}
                            onClick={() => toggleSeat(seat)}
                            aria-label={`Seat ${seat.id} ${seat.tier}`}
                            className={`w-9 h-10 rounded-lg text-xs font-medium border flex items-center justify-center transition-colors ${bgColor}`}
                          >
                            {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : letter}
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* SUMMARY SIDEBAR */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 flex flex-col justify-between h-fit space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Seat Summary</h2>

              {selectedSeats.length === 0 ? (
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-700/60 text-center text-slate-400">
                  <Info className="w-8 h-8 mx-auto mb-2 text-cyan-400 opacity-80" />
                  <p className="text-sm">Click on any available seat on the map to select it.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedSeats.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-sm"
                    >
                      <div>
                        <span className="font-bold text-cyan-400">Seat {s.id}</span>
                        <span className="text-xs text-slate-400 block">{s.tier} Class</span>
                      </div>
                      <span className="font-semibold text-white">₹{s.price}</span>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-slate-700 flex justify-between items-center text-lg font-bold">
                    <span>Seat Total:</span>
                    <span className="text-cyan-400">₹{totalSeatPrice}</span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                if (selectedSeats.length === 0) {
                  alert("Please select at least one seat before continuing.")
                  return
                }
                navigate("/profile", {
                  state: {
                    tab: "Flights",
                    selectedSeats: selectedSeats.map((s) => s.id),
                    seatTotal: totalSeatPrice,
                  },
                })
              }}
              disabled={selectedSeats.length === 0}
              className="w-full py-4 rounded-2xl bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Confirm Seats ({selectedSeats.length})
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SeatSelection
