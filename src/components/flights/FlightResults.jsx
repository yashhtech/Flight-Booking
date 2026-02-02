import { motion } from "framer-motion"

const FlightResults = ({ flights, departDate }) => {
  if (flights.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg">
        No flights found ✈️
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
      {flights.map(flight => (
        <motion.div
          key={flight.id}
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition border"
        >
          {/* TOP */}
          <div className="flex items-center justify-between mb-4">
            <img
              src={flight.logo}
              alt={flight.airline}
              className="h-10 object-contain"
            />
            <span className="text-sm text-yellow-500 font-semibold">
              ⭐ {flight.rating}
            </span>
          </div>

          {/* ROUTE */}
          <h3 className="text-xl font-bold mb-2">
            {flight.from} → {flight.to}
          </h3>

          {/* DETAILS */}
          <div className="text-gray-600 text-sm space-y-1">
            <p>🕒 Duration: {flight.duration}</p>
            <p>📅 Departure: {departDate}</p>
          </div>

          {/* BOTTOM */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-2xl font-extrabold text-indigo-600">
              ₹{flight.price}
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl font-semibold transition">
              Book Now
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default FlightResults
