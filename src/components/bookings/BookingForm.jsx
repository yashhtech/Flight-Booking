import { useState } from "react"
import { Calendar, Trash2, Plus } from "lucide-react"

const BookingForm = ({ flight, searchData, onBack }) => {
  const [passengers, setPassengers] = useState([
    { name: "", age: "", medical: "" }
  ])

  const [departDate, setDepartDate] = useState(searchData?.departDate || "")
  const [returnDate, setReturnDate] = useState(searchData?.returnDate || "")

  const addPassenger = () => {
    setPassengers([...passengers, { name: "", age: "", medical: "" }])
  }

  const removePassenger = (index) => {
    if (passengers.length === 1) return
    setPassengers(passengers.filter((_, i) => i !== index))
  }

  const updatePassenger = (i, field, value) => {
    const copy = [...passengers]
    copy[i][field] = value
    setPassengers(copy)
  }

  return (
    <div className="max-w-6xl mx-auto p-12 rounded-[36px]
      bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100
      text-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.15)]
      animate-fade-in">

      {/* BACK */}
      <button
        onClick={onBack}
        className="mb-8 text-indigo-700 hover:text-indigo-900 font-semibold transition"
      >
        ← Back to Flights
      </button>

      <h2 className="text-4xl font-extrabold mb-12 text-indigo-900">
        ✈️ Flight Booking Details
      </h2>

      {/* ROUTE */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="label">From</label>
          <input value={flight.from} disabled className="input-glass" />
        </div>
        <div>
          <label className="label">To</label>
          <input value={flight.to} disabled className="input-glass" />
        </div>
      </div>

      {/* DATES */}
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div>
          <label className="label">Departure Date</label>
          <div className="relative">
            <Calendar className="icon-left" />
            <input
              type="date"
              value={departDate}
              onChange={e => setDepartDate(e.target.value)}
              className="input-glass pl-12 cursor-pointer"
            />
          </div>
        </div>

        {searchData?.tripType === "roundtrip" && (
          <div>
            <label className="label">Return Date</label>
            <div className="relative">
              <Calendar className="icon-left" />
              <input
                type="date"
                value={returnDate}
                onChange={e => setReturnDate(e.target.value)}
                className="input-glass pl-12 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* PREFERENCES */}
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div>
          <label className="label">Seat Preference</label>
          <select className="input-glass">
            <option>Window</option>
            <option>Middle</option>
            <option>Aisle</option>
          </select>
        </div>

        <div>
          <label className="label">Travel Class</label>
          <select className="input-glass">
            <option>Economy</option>
            <option>Business</option>
            <option>First Class</option>
          </select>
        </div>

        <div>
          <label className="label">
            Meal <span className="text-sm text-indigo-600">(extra charges)</span>
          </label>
          <select className="input-glass">
            <option>Veg Meal (+₹250)</option>
            <option>Non-Veg Meal (+₹350)</option>
            <option>No Meal</option>
          </select>
        </div>
      </div>

      {/* PASSENGERS */}
      <div className="mt-14 space-y-10">
        <h3 className="text-2xl font-bold text-indigo-900">
          👤 Passenger Information
        </h3>

        {passengers.map((p, i) => (
          <div
            key={i}
            className="relative grid md:grid-cols-3 gap-6
              bg-white/70 backdrop-blur-xl
              p-6 rounded-2xl shadow
              hover:shadow-lg transition"
          >
            <div>
              <label className="label-sm">Full Name</label>
              <input
                className="input-glass"
                value={p.name}
                onChange={e => updatePassenger(i, "name", e.target.value)}
              />
            </div>

            <div>
              <label className="label-sm">Age</label>
              <input
                className="input-glass"
                value={p.age}
                onChange={e => updatePassenger(i, "age", e.target.value)}
              />
            </div>

            <div>
              <label className="label-sm">Medical (optional)</label>
              <input
                className="input-glass"
                value={p.medical}
                onChange={e => updatePassenger(i, "medical", e.target.value)}
              />
            </div>

            {passengers.length > 1 && (
              <button
                onClick={() => removePassenger(i)}
                className="absolute -top-4 -right-4 bg-red-500 text-white p-2 rounded-full
                  hover:scale-110 transition shadow-lg"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addPassenger}
          className="flex items-center gap-2 px-8 py-4
            bg-indigo-600 text-white font-bold rounded-full
            hover:scale-105 hover:bg-indigo-700 transition"
        >
          <Plus /> Add Passenger
        </button>
      </div>

      {/* CONTACT */}
      <div className="grid md:grid-cols-3 gap-8 mt-14">
        <div>
          <label className="label">Email</label>
          <input className="input-glass" />
        </div>
        <div>
          <label className="label">Phone</label>
          <input className="input-glass" />
        </div>
        <div>
          <label className="label">Emergency Contact</label>
          <input className="input-glass" />
        </div>
      </div>

      {/* SUBMIT */}
      <button
        className="mt-16 w-full py-6 rounded-full text-2xl font-extrabold
          bg-gradient-to-r from-indigo-600 via-sky-500 to-purple-600
          text-white hover:scale-[1.04] transition shadow-xl"
      >
        Confirm & Pay ✈️
      </button>
    </div>
  )
}

export default BookingForm
