import { motion } from "framer-motion"
import { ArrowRight, Clock, Calendar, Utensils, Briefcase, Armchair } from "lucide-react"

const FlightResults = ({ flights, searchData, onBookFlight }) => {
  if (!flights || flights.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg mt-10">
        No flights found ✈️
      </p>
    )
  }

const handleBookFlight = (flight) => {
  setSelectedFlight(flight)
}


  return (
    <div className="space-y-6 px-4 max-w-6xl mx-auto">
      {flights.map((flight, index) => (
        <motion.div
          key={flight.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
          whileHover={{ scale: 1.015 }}
          className="relative bg-gradient-to-r from-white to-indigo-50
                     rounded-2xl p-6 shadow-lg hover:shadow-2xl
                     border border-indigo-100 overflow-hidden"
        >
          {/* AVAILABLE TAG */}
          <span className="absolute top-4 right-4 bg-green-500 text-white
                           text-xs font-bold px-3 py-1 rounded-full">
            AVAILABLE
          </span>

          {/* TOP ROW */}
          <div className="flex items-center gap-6">
            {/* LOGO */}
            <div className="w-20 h-20 bg-white rounded-xl shadow
                            flex items-center justify-center">
              <img
                src={flight.logo}
                alt={flight.airline}
                className="h-12 object-contain"
              />
            </div>

            {/* ROUTE */}
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                {flight.from}
                <ArrowRight className="text-indigo-600" size={28} />
                {flight.to}
              </h2>

              {/* DETAILS */}
              <div className="flex flex-wrap gap-6 mt-3 text-sm text-gray-600 font-medium">
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-indigo-500" />
                  {flight.duration}
                </span>

                <span className="flex items-center gap-2 font-bold text-green-600">
                  <Calendar size={16} />
                  {searchData?.departDate || "Date not selected"}
                </span>
              </div>
            </div>

            {/* PRICE */}
            <div className="text-right">
              <p className="text-3xl font-extrabold text-indigo-600">
                ₹{flight.price}
              </p>
              <p className="text-sm text-gray-500">
                {flight.airline}
              </p>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="my-5 h-px bg-indigo-100" />

          {/* BOTTOM ROW */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* FEATURES */}
            <div className="flex gap-6 text-sm text-gray-700 font-semibold">
              <span className="flex items-center gap-2">
                <Utensils className="text-orange-500" size={18} />
                Meals
              </span>

              <span className="flex items-center gap-2">
                <Briefcase className="text-blue-500" size={18} />
                Baggage
              </span>

              <span className="flex items-center gap-2">
                <Armchair className="text-purple-500" size={18} />
                Comfort
              </span>
            </div>

            {/* CTA */}
            <motion.button
              onClick={() => onBookFlight(flight)}
              whileHover={{ scale: 1.07 }}
             whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 to-blue-600
             hover:from-indigo-700 hover:to-blue-700
             text-white px-8 py-3 rounded-xl
             font-bold shadow-lg"
               >
               Book Now
            </motion.button>

          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default FlightResults
