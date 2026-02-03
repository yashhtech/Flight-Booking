import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";

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

  /* ================= CANCEL ================= */
  const handleCancel = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to cancel this ticket?"
    );
    if (!ok) return;

    await fetch(`http://localhost:5000/bookings/${id}`, {
      method: "DELETE",
    });

    setBookings((prev) => prev.filter((b) => b.id !== id));

    alert(
      "Ticket has been cancelled.\nRefunded amount can be in your account within 72 hours."
    );
  };

  /* ================= RESCHEDULE ================= */
  const handleReschedule = async (booking) => {
    const newDate = prompt(
      "Enter new travel date (YYYY-MM-DD)",
      booking.departDate
    );

    if (!newDate) return;

    const updatedBooking = {
      ...booking,
      departDate: newDate,
    };

    await fetch(`http://localhost:5000/bookings/${booking.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ departDate: newDate }),
    });

    setBookings((prev) =>
      prev.map((b) => (b.id === booking.id ? updatedBooking : b))
    );

    alert("Your flight has been rescheduled successfully ✈️");
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-xl font-semibold text-indigo-500 animate-pulse">
        ✈️ Fetching your flight memories...
      </p>
    );
  }

  if (!bookings.length) {
    return (
      <p className="text-center text-gray-400 mt-20 text-xl">
        No journeys booked yet 😕
      </p>
    );
  }

  const today = new Date();
  const upcoming = bookings.filter(
    (b) => new Date(b.departDate) >= today
  );
  const past = bookings.filter(
    (b) => new Date(b.departDate) < today
  );

  const renderBookingCard = (b, index) => (
    <motion.div
      key={b.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.04, y: -8 }}
      className="relative flex items-center justify-between
        bg-gradient-to-br from-indigo-50 via-white to-violet-100
        p-6 rounded-[28px] shadow-lg hover:shadow-indigo-300/40
        border border-indigo-200/60 transition-all"
    >
      {/* Download */}
      <button className="absolute top-4 right-4 text-indigo-600 hover:text-purple-700 transition">
        <FaDownload size={18} />
      </button>

      {/* LEFT */}
      <div className="flex items-center gap-5">
        <div className="p-[3px] rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500">
          <img
            src={b.flight?.logo || b.flight?.image}
            alt={b.flight?.airline}
            className="w-16 h-16 rounded-full object-cover bg-white"
          />
        </div>

        <div>
          <h3 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {b.flight?.from} → {b.flight?.to}
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            {b.flight?.departure} – {b.flight?.arrival} •{" "}
            {b.flight?.duration}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            🍽 {b.meal} • 💺 {b.travelClass}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Booked on {new Date(b.bookedAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end gap-3">
        <div className="flex gap-2">
          <button
            onClick={() => handleCancel(b.id)}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600
              hover:scale-105 text-white rounded-xl font-semibold transition"
          >
            Cancel
          </button>

          <button
            onClick={() => handleReschedule(b)}
            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500
              hover:scale-105 text-white rounded-xl font-semibold transition"
          >
            Reschedule
          </button>
        </div>

        <p className="font-extrabold text-xl bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
          ₹{b.total}
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-purple-100 px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">

        {/* UPCOMING */}
        {upcoming.length > 0 && (
          <div>
            <h2 className="text-3xl font-extrabold mb-8 text-indigo-800">
              ✈️ Upcoming Flights
            </h2>
            <div className="flex flex-col gap-10">
              {upcoming.map(renderBookingCard)}
            </div>
          </div>
        )}

        {/* PAST */}
        {past.length > 0 && (
          <div>
            <h2 className="text-3xl font-extrabold mb-8 text-gray-700">
              🕘 Past Flights
            </h2>
            <div className="flex flex-col gap-10">
              {past.map(renderBookingCard)}
            </div>
          </div>
        )}

        {/* HISTORY */}
        <div>
          <h2 className="text-3xl font-extrabold mb-8 text-gray-800">
            📜 Booking History
          </h2>

          <div className="flex flex-col gap-4">
            {bookings.map((b, i) => (
              <motion.div
                key={b.id}
                whileHover={{ scale: 1.03 }}
                transition={{ delay: i * 0.03 }}
                className="flex justify-between items-center
                  bg-gradient-to-r from-white to-indigo-50
                  p-4 rounded-2xl shadow hover:shadow-indigo-200 transition"
              >
                <div>
                  <p className="font-bold text-indigo-700">
                    {b.flight?.from} → {b.flight?.to}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(b.departDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-green-600 text-lg">
                    ₹{b.total}
                  </p>
                  <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                    {b.paymentStatus}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyBookings;
