const FlightCard = ({ flight, onBookFlight }) => {
  const discountedPrice =
    flight.price - (flight.price * flight.discount) / 100

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden">
      <img
        src={flight.image}
        alt={flight.to}
        className="h-44 w-full object-cover group-hover:scale-105 transition duration-500"
      />

      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg text-slate-800">
          {flight.from} → {flight.to}
        </h3>

        <p className="text-sm text-gray-500">{flight.airline}</p>

        <div className="flex justify-between text-sm text-gray-600">
          <span>{flight.departure}</span>
          <span>{flight.duration}</span>
          <span>{flight.arrival}</span>
        </div>

        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="text-sm line-through text-gray-400">
              ₹{flight.price}
            </p>
            <p className="text-xl font-bold text-emerald-600">
              ₹{discountedPrice}
            </p>
          </div>

          <button
            onClick={() => onBookFlight(flight)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-full hover:scale-105 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default FlightCard
