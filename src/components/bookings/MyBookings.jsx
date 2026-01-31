import { useEffect, useState } from "react"

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [tab, setTab] = useState("Upcoming")

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings")) || []
    setBookings(data)
  }, [])

  const cancelBooking = (id) => {
    const updated = bookings.map(b =>
      b.id === id ? { ...b, status: "Cancelled" } : b
    )
    setBookings(updated)
    localStorage.setItem("bookings", JSON.stringify(updated))
  }

  const filtered = bookings.filter(b => b.status === tab)

  return (
    <div>

      {/* SUB TABS */}
      <div className="flex gap-4 mb-6">
        {["Upcoming", "Cancelled"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full font-semibold
              ${tab === t
                ? "bg-blue-600 text-white"
                : "bg-white shadow"}
            `}
          >
            {t}
          </button>
        ))}
      </div>

      {/* LIST */}
      {filtered.length === 0 && (
        <p className="text-gray-500">
          No {tab} bookings found
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map(b => (
          <div key={b.id} className="bg-white p-6 rounded-xl shadow">

            <h3 className="font-bold text-lg">
              ✈ {b.flightId}
            </h3>

            <p>Seats: {b.seats.join(", ")}</p>
            <p>Passengers: {b.passengers.length}</p>
            <p className="font-semibold mt-2">
              Total: ₹{b.price}
            </p>

            {b.status === "Upcoming" && (
              <button
                onClick={() => cancelBooking(b.id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full"
              >
                Cancel Booking
              </button>
            )}

            {b.status === "Cancelled" && (
              <p className="mt-3 text-red-500 font-semibold">
                Refund in 5–7 days
              </p>
            )}

          </div>
        ))}
      </div>

    </div>
  )
}

export default MyBookings
