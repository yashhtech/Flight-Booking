import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import mealsData from "../data/meals.json"

const Passengers = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) return <p className="p-10 text-center">No booking data</p>

  const { flightId, selectedSeats } = state

  const [passengers, setPassengers] = useState(
    selectedSeats.map(seat => ({
      seat,
      name: "",
      age: "",
      gender: "",
      meal: "",
      snack: "",
      drink: ""
    }))
  )

  const handleChange = (index, field, value) => {
    const updated = [...passengers]
    updated[index][field] = value
    setPassengers(updated)
  }

  const calculatePrice = () => {
    let total = selectedSeats.length * 5000 // base fare
    passengers.forEach(p => {
      const meal = mealsData.meals.find(m => m.id === p.meal)
      const snack = mealsData.snacks.find(s => s.id === p.snack)
      const drink = mealsData.drinks.find(d => d.id === p.drink)
      total += (meal?.price || 0) + (snack?.price || 0) + (drink?.price || 0)
    })
    return total
  }

  const handleConfirm = () => {
    const booking = {
      id: Date.now(),
      flightId,
      seats: selectedSeats,
      passengers,
      price: calculatePrice(),
      status: "Upcoming",
      date: new Date().toISOString()
    }

    const existing = JSON.parse(localStorage.getItem("bookings")) || []
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]))

    navigate("/booking-confirmed")
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <h2 className="text-3xl font-bold text-center mb-8">
        Passenger Details 🧑‍✈️
      </h2>

      {passengers.map((p, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow p-6 mb-6 animate-fade-in"
        >
          <h3 className="font-bold mb-4">
            Passenger {i + 1} — Seat {p.seat}
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              placeholder="Name"
              className="input"
              onChange={e => handleChange(i, "name", e.target.value)}
            />
            <input
              placeholder="Age"
              type="number"
              className="input"
              onChange={e => handleChange(i, "age", e.target.value)}
            />
            <select
              className="input"
              onChange={e => handleChange(i, "gender", e.target.value)}
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          {/* MEAL */}
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <select
              className="input"
              onChange={e => handleChange(i, "meal", e.target.value)}
            >
              <option value="">Meal</option>
              {mealsData.meals.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} ₹{m.price}
                </option>
              ))}
            </select>

            <select
              className="input"
              onChange={e => handleChange(i, "snack", e.target.value)}
            >
              <option value="">Snack</option>
              {mealsData.snacks.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ₹{s.price}
                </option>
              ))}
            </select>

            <select
              className="input"
              onChange={e => handleChange(i, "drink", e.target.value)}
            >
              <option value="">Drink</option>
              {mealsData.drinks.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ₹{d.price}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}

      {/* PRICE */}
      <div className="text-center text-xl font-bold mb-6">
        Total Price: ₹{calculatePrice()}
      </div>

      <div className="text-center">
        <button
          onClick={handleConfirm}
          className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold"
        >
          Confirm Booking ✈️
        </button>
      </div>

    </div>
  )
}

export default Passengers
