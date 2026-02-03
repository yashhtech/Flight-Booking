import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.bookings || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading bookings...</p>;
  }

  if (!bookings.length) {
    return <p className="text-center text-gray-500 mt-10">No bookings yet</p>;
  }

  const today = new Date();
  const upcoming = bookings.filter(b => new Date(b.departDate) >= today);
  const past = bookings.filter(b => new Date(b.departDate) < today);

  const renderBookingCard = (b) => (
    <div
      key={b.id}
      className="relative flex items-center justify-between bg-gradient-to-r from-indigo-50 to-white hover:shadow-lg transition p-6 rounded-2xl shadow"
    >
      <button className="absolute top-4 right-4 text-indigo-600 hover:text-indigo-800">
        <FaDownload size={18} />
      </button>

      <div className="flex items-center gap-4">
        <img
          src={b.flight?.logo || b.flight?.image}
          alt={b.flight?.airline}
          className="w-16 h-16 rounded-full object-cover border-2 border-indigo-300"
        />
        <div>
          <h3 className="text-2xl font-bold text-indigo-700">
            {b.flight?.from} → {b.flight?.to}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {b.flight?.departure} - {b.flight?.arrival} ({b.flight?.duration})
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Meal: {b.meal} | Class: {b.travelClass}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Booked On: {new Date(b.bookedAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between h-full">
        <div className="flex flex-col gap-2">
          <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition">
            Cancel Flight
          </button>
          <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg font-semibold transition">
            Reschedule
          </button>
        </div>
        <p className="mt-4 font-bold text-green-600">
          Paid: ₹{b.total}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-10 p-6">
      {/* Upcoming Flights */}
      {upcoming.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Upcoming Flights</h2>
          <div className="flex flex-col gap-6">
            {upcoming.map(renderBookingCard)}
          </div>
        </div>
      )}

      {/* Past Flights */}
      {past.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Past Flights</h2>
          <div className="flex flex-col gap-6">
            {past.map(renderBookingCard)}
          </div>
        </div>
      )}

      {/* Booking History */}
      <div>
        <h2 className="text-xl font-bold mb-4">Booking History</h2>
        <div className="flex flex-col gap-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <div>
                <p className="font-semibold text-indigo-700">
                  {b.flight?.from} → {b.flight?.to}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(b.departDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">₹{b.total}</p>
                <p className="text-sm text-gray-400">{b.paymentStatus}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
