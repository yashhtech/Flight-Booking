import { useState } from "react"
import FlightSearch from "../components/flights/FlightSearch"
import MyBookings from "../components/bookings/MyBookings"
import Offers from "../components/Offers"

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("flightUser"))
  const [tab, setTab] = useState("flights")

  const logout = () => {
    localStorage.setItem("flightUser", JSON.stringify({
      ...user,
      isLoggedIn: false
    }))
    window.location.href = "/signin"
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <div className="bg-white shadow p-6 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-xl">{user.fullName}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-full bg-red-500 text-white"
        >
          Logout
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-6 justify-center mt-6">
        {["flights", "bookings", "offers"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2 rounded-full font-semibold
              ${tab === t ? "bg-blue-600 text-white" : "bg-white"}
            `}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {tab === "flights" && <FlightSearch />}
        {tab === "bookings" && <MyBookings />}
        {tab === "offers" && <Offers />}
      </div>

    </div>
  )
}

export default Profile
