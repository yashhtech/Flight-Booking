import { useState } from "react"
import { CheckCircle } from "lucide-react"

const GST = 0.18

const Payment = ({ booking, onSuccess , onBack}) => {
  const basePrice = booking.flight.price

  const mealPrice =
    booking.meal?.includes("Veg") ? 250 :
    booking.meal?.includes("Non") ? 350 : 0

  const passengerCount = booking.passengers.length
  const subtotal = (basePrice + mealPrice) * passengerCount
  const gstAmount = subtotal * GST

  const [promo, setPromo] = useState("")
  const [discount, setDiscount] = useState(0)
  const [loading, setLoading] = useState(false)

  const applyPromo = () => {
    if (promo === "FLY500") {
      setDiscount(500)
    } else {
      alert("❌ Invalid Promo Code")
    }
  }

  const total = subtotal + gstAmount - discount

  // ✅ UPDATED: POST METHOD (JSON SERVER)
  const confirmBooking = async () => {
    setLoading(true)

    const bookingPayload = {
      ...booking,
      total: Math.round(total),
      discount,
      gst: Math.round(gstAmount),
      paymentStatus: "PAID",
      bookedAt: new Date().toISOString()
    }

    try {
      await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingPayload)
      })

      alert("🎉 Booking Confirmed Successfully!")
      onSuccess()
    } catch (err) {
      console.error(err)
      alert("❌ Payment Failed. Try Again")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl shadow-2xl">
        <button
        onClick={onBack}
        className="mb-8 text-indigo-700 hover:text-indigo-900 font-semibold transition"
      >
        ← Back 
      </button>

      {/* ✈️ FLIGHT CARD */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl mb-8 shadow-md hover:shadow-xl transition">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center shadow">
            <img
              src={booking.flight.logo}
              alt="airline"
              className="w-10 h-10 object-contain rounded-full"
            />
          </div>

          <div>
            <p className="font-bold text-xl text-indigo-700">
              {booking.flight.from} → {booking.flight.to}
            </p>
            <p className="text-sm text-gray-500">
              {booking.departDate}
              {booking.returnDate && ` • Return: ${booking.returnDate}`}
            </p>
          </div>
        </div>

        <div className="text-right text-sm">
          <p className="font-semibold text-gray-800">
            {booking.flight.departure} - {booking.flight.arrival}
          </p>
          <p className="text-gray-500">
            {booking.flight.duration}
          </p>
        </div>
      </div>

      {/* 👤 PASSENGERS */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-3">👤 Passengers</h3>
        {booking.passengers.map((p, i) => (
          <p key={i} className="text-sm text-gray-700">
            {i + 1}. {p.name} ({p.age})
          </p>
        ))}
      </div>

      {/* 🎟 COUPONS */}
      <h3 className="text-xl font-bold mb-3">🎟 Offers & Coupons</h3>
      <div className="flex gap-4 mb-8">
        <input
          placeholder="Enter Promo Code"
          className="border px-4 py-3 rounded-xl flex-1 focus:ring-2 focus:ring-indigo-400 outline-none"
          value={promo}
          onChange={e => setPromo(e.target.value)}
        />
        <button
          onClick={applyPromo}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 rounded-xl font-semibold transition"
        >
          Apply
        </button>
      </div>

      {/* 🧾 BILLING */}
      <h3 className="text-xl font-bold mb-4">🧾 Fare Summary</h3>

      <div className="space-y-3 text-lg bg-white p-6 rounded-2xl shadow-inner">
        <div className="flex justify-between">
          <span>Base Fare</span>
          <span>₹{basePrice * passengerCount}</span>
        </div>

        <div className="flex justify-between">
          <span>Meal Charges</span>
          <span>₹{mealPrice * passengerCount}</span>
        </div>

        <div className="flex justify-between">
          <span>GST (18%)</span>
          <span>₹{gstAmount.toFixed(0)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600 font-semibold">
            <span>Promo Discount</span>
            <span>-₹{discount}</span>
          </div>
        )}

        <hr />

        <div className="flex justify-between text-2xl font-bold text-indigo-700">
          <span>Total</span>
          <span>₹{total.toFixed(0)}</span>
        </div>
      </div>

      {/* 💳 PAY BUTTON */}
      <button
        onClick={confirmBooking}
        disabled={loading}
        className="mt-10 w-full py-5 bg-gradient-to-r
        from-indigo-600 to-purple-600 text-white
        rounded-full text-2xl font-bold
        hover:scale-105 hover:shadow-xl transition
        disabled:opacity-60"
      >
        {loading ? "Processing Payment..." : "Pay & Book Now ✨"}
      </button>
    </div>
  )
}

export default Payment
