import { useParams, useNavigate } from "react-router-dom"
import seatsData from "../data/seats.json"
import { useState } from "react"

const SeatSelection = () => {
  const { flightId } = useParams()
  const navigate = useNavigate()

  const seatConfig = seatsData[flightId]
  const [selectedSeats, setSelectedSeats] = useState([])

  if (!seatConfig) {
    return <p className="p-10 text-center">Invalid flight</p>
  }

  const toggleSeat = (seat) => {
    if (seatConfig.bookedSeats.includes(seat)) return

    setSelectedSeats(prev =>
      prev.includes(seat)
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <h2 className="text-3xl font-bold text-center mb-6">
        Select Your Seats ✈️
      </h2>

      {/* SEAT GRID */}
      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-xl shadow-lg">

          {Array.from({ length: seatConfig.rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-2 justify-center mb-2">

              {seatConfig.columns.map(col => {
                const seat = `${rowIndex + 1}${col}`
                const isBooked = seatConfig.bookedSeats.includes(seat)
                const isSelected = selectedSeats.includes(seat)

                return (
                  <button
                    key={seat}
                    onClick={() => toggleSeat(seat)}
                    disabled={isBooked}
                    className={`
                      w-10 h-10 rounded-md text-sm font-bold
                      transition-all
                      ${isBooked && "bg-gray-400 cursor-not-allowed"}
                      ${isSelected && "bg-green-500 text-white scale-110"}
                      ${!isBooked && !isSelected && "bg-blue-100 hover:bg-blue-300"}
                    `}
                  >
                    {seat}
                  </button>
                )
              })}

            </div>
          ))}

        </div>
      </div>

      {/* LEGEND */}
      <div className="flex justify-center gap-6 mt-6 text-sm">
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-200 rounded" /> Available
        </span>
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded" /> Selected
        </span>
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded" /> Booked
        </span>
      </div>

      {/* CONTINUE */}
      <div className="text-center mt-8">
        <button
          disabled={selectedSeats.length === 0}
          onClick={() =>
            navigate("/passengers", {
              state: {
                flightId,
                selectedSeats
              }
            })
          }
          className="
            px-8 py-3 rounded-full font-bold text-white
            bg-green-600 hover:bg-green-700
            disabled:bg-gray-400
          "
        >
          Continue ({selectedSeats.length} seats)
        </button>
      </div>

    </div>
  )
}

export default SeatSelection
