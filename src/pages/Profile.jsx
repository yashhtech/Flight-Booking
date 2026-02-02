import { useState } from "react"
import TopHeader from "../components/TopHeader"
import ProfileHeader from "../components/ProfileHeader"
import FlightSearchBox from "/src/components/flights/FlightSearch"
import MyBookings from "../components/bookings/MyBookings"
import Offers from "../components/Offers"
import FlightList from "../components/flights/FlightList"

const Profile = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("flightUser"))
  )

  const [tab, setTab] = useState("flights")

  return (
    <div className="min-h-screen bg-slate-100">

      {/* TOP BAR */}
      <TopHeader />

      <div className="p-6">
        <ProfileHeader user={user} setUser={setUser} />

        {/* TABS */}
        <div className="flex justify-center items-center  gap-4 mt-8 bg-emerald-300 p-3 rounded-2xl  shadow">
          {["Flights", "My Bookings", "Deals & Offers" , "Payment" , "Settings"].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 rounded-full font-semibold transition
                ${tab === t
                  ? "bg-blue-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"}
              `}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="mt-6">
          {tab === "Flights" && (
            <>
              <FlightSearchBox />
              <FlightList />
              </>
              )}



          {tab === "My Bookings" && <MyBookings />}
          {tab === "Offers" && <Offers />}
        </div>
      </div>

    </div>
  )
}

export default Profile
