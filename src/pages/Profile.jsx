import { useState } from "react"
import { useLocation } from "react-router-dom"
import TopHeader from "../components/TopHeader"
import ProfileHeader from "../components/ProfileHeader"
import FlightSearchBox from "../components/flights/FlightSearch"
import MyBookings from "../components/bookings/MyBookings"
import Offers from "../components/Offers"
import FlightList from "../components/flights/FlightList"
import FlightResults from "../components/flights/FlightResults"
import flightsData from "../data/flights.json"
import BookingForm from "../components/bookings/BookingForm"
import Payment from "../components/payment/Payment"
import Accounts from "../components/payment/Accounts";
import Settings from "../components/Settings"
import { getStoredUser } from "../services/auth"

const Profile = () => {
  const location = useLocation()
  const [user, setUser] = useState(() => getStoredUser())
  const [tab, setTab] = useState(location.state?.tab || "Flights")

  const [selectedFlight, setSelectedFlight] = useState(null)
  const [showPayment, setShowPayment] = useState(false)
  const [bookingData, setBookingData] = useState(null)

  /* 🔍 SEARCH STATE */
  const [searchQuery, setSearchQuery] = useState(location.state?.searchQuery || null)

  /* ✅ NORMALIZE FLIGHTS DATA (MOST IMPORTANT FIX) */
  const flights = Array.isArray(flightsData)
    ? flightsData
    : flightsData.flights || []

  /* 🔎 FILTERED FLIGHTS */
  const filteredFlights = searchQuery
    ? flights.filter(f =>
        f.from.toLowerCase().includes(searchQuery.from.toLowerCase()) ||
        f.to.toLowerCase().includes(searchQuery.to.toLowerCase())
      )
    : []

  const handleTabChange = (nextTab) => {
    if (nextTab === "Flights") {
      setSelectedFlight(null)
      setShowPayment(false)
      setBookingData(null)
    }
    setTab(nextTab)
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* TOP BAR */}
      <TopHeader />

      <div className="p-6">
        <ProfileHeader user={user} setUser={setUser} />

        {/* TABS */}
        <div className="flex justify-center items-center gap-4 mt-8 bg-emerald-300 p-3 rounded-2xl shadow">
          {["Flights", "My Bookings", "Deals & Offers", "Accounts", "Settings"].map(t => (
            <button
              key={t}
              onClick={() => handleTabChange(t)}
              className={`px-6 py-2 rounded-full font-semibold transition
                ${tab === t
                  ? "bg-blue-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"}`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="mt-6">

          {/* ✈️ FLIGHTS TAB */}
         {tab === "Flights" && (
  <>
    {!selectedFlight && !showPayment && (
      <>
        <FlightSearchBox onSearch={setSearchQuery} />
        {searchQuery ? (
          <FlightResults
            flights={filteredFlights}
            searchData={searchQuery}
            onBookFlight={setSelectedFlight}
          />
        ) : (
          <FlightList onBookFlight={setSelectedFlight} />
        )}
      </>
    )}

    {selectedFlight && !showPayment && (
      <BookingForm
        flight={selectedFlight}
        searchData={searchQuery}
        onBack={() => setSelectedFlight(null)}
        onProceedToPay={(data) => {
          setBookingData(data);
          setShowPayment(true);
        }}
      />
    )}

    {showPayment && bookingData && (
      <Payment
        booking={bookingData}
        onBack={() => setShowPayment(false)}
        onSuccess={() => {
          setSelectedFlight(null)
          setShowPayment(false)
          setBookingData(null)
          setTab("My Bookings")
        }}
      />
    )}
  </>
)}




          {/* 📘 BOOKINGS */}
          {tab === "My Bookings" && <MyBookings />}

          {/* 🎁 OFFERS */}
          {tab === "Deals & Offers" && <Offers />}

          {/* 🎁 Accounts */}
          {tab === "Accounts" && <Accounts />}

           {/* 🎁 Settings */}
          {tab === "Settings" && <Settings />}

        </div>
      </div>
    </div>
  )
}

export default Profile
