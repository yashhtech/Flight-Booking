import { useState } from "react"
import { motion } from "framer-motion"
import {
  FaFire,
  FaClock,
  FaCrown,
  FaGlobe,
  FaTag,
  FaHeart,
  FaPlaneDeparture,
} from "react-icons/fa"

import TopBar from "../components/TopBar"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

/* ===================== DATA ===================== */

const categories = [
  { id: "flash", title: "Flash Sales", icon: <FaFire />, gradient: "from-pink-500 to-rose-500", count: 156 },
  { id: "last", title: "Last Minute", icon: <FaClock />, gradient: "from-blue-500 to-sky-500", count: 89 },
  { id: "premium", title: "Premium", icon: <FaCrown />, gradient: "from-purple-500 to-indigo-500", count: 42 },
  { id: "multi", title: "Multi-City", icon: <FaGlobe />, gradient: "from-emerald-500 to-green-500", count: 67 },
]

const deals = [
  {
    city: "Santorini, Greece",
    route: "New York → Santorini",
    price: 449,
    rating: 4.9,
    reviews: "23.9k",
    tag: "65% OFF",
    img: "/src/assets/deal1.jpg",
    type: "flash",
  },
  {
    city: "Bali, Indonesia",
    route: "Los Angeles → Bali",
    price: 719,
    rating: 4.7,
    reviews: "18.1k",
    tag: "55% OFF",
    img: "/src/assets/deal2.jpg",
    type: "last",
  },
  {
    city: "Maldives",
    route: "Miami → Maldives",
    price: 999,
    rating: 5.0,
    reviews: "3.1k",
    tag: "60% OFF",
    img: "/src/assets/deal3.jpg",
    type: "premium",
  },
]

const coupons = [
  { title: "$100 OFF", code: "FLASH100", note: "On bookings above $1000", gradient: "from-pink-500 to-rose-500" },
  { title: "15% OFF", code: "MEMBER15", note: "All international flights", gradient: "from-blue-500 to-sky-500" },
  { title: "$50 OFF", code: "WELCOME50", note: "For new customers", gradient: "from-purple-500 to-indigo-500" },
  { title: "20% OFF", code: "GROUP20", note: "Group bookings", gradient: "from-green-500 to-emerald-500" },
]

/* ===================== COMPONENT ===================== */

const Offers = () => {
  const [active, setActive] = useState("flash")

  return (
    <>
      <TopBar />
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative h-[90vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 h-full w-full object-cover"
          src="/src/assets/sky.mp4"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white max-w-xl"
          >
            <span className="inline-flex items-center gap-2 bg-red-500 px-4 py-1 rounded-full text-sm mb-6">
              🔥 Limited Time Offers
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Unbeatable <span className="text-orange-400">Flight</span><br />Deals
            </h1>
            <p className="mt-6 text-white/90">
              Save up to 70% on flights worldwide. Exclusive offers updated daily!
            </p>
            <div className="mt-8 flex gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-full font-semibold">
                Browse All Deals →
              </button>
              <button className="border border-white/40 hover:bg-white/10 transition px-6 py-3 rounded-full">
                🔔 Set Alert
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CATEGORY CARDS ================= */}
      <section className="-mt-24 relative z-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(c => (
            <motion.div
              key={c.id}
              whileHover={{ y: -10, scale: 1.05 }}
              onClick={() => setActive(c.id)}
              className={`cursor-pointer bg-gradient-to-r ${c.gradient} text-white p-6 rounded-2xl shadow-xl`}
            >
              <div className="text-3xl">{c.icon}</div>
              <h3 className="mt-3 font-bold text-lg">{c.title}</h3>
              <p className="text-white/90 text-sm mt-1">{c.count} Deals Available</p>
            </motion.div>
          ))}
n        </div>
      </section>

      {/* ================= HOT DEALS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
          🔥 Hot Deals This Week
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {deals
            .filter(d => d.type === active)
            .map((d, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="relative">
                  <img src={d.img} alt={d.city} className="h-56 w-full object-cover" />
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                    {d.tag}
                  </span>
                  <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
                    <FaHeart className="text-gray-500" />
                  </button>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500">{d.city}</p>
                  <h3 className="font-bold text-lg">{d.route}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    ⭐ {d.rating} ({d.reviews} reviews)
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-blue-600">${d.price}</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl">
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* ================= COUPONS ================= */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
            🎁 Promo Codes & Coupons
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {coupons.map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.08 }}
                className={`bg-gradient-to-r ${c.gradient} text-white rounded-2xl p-6 shadow-xl`}
              >
                <FaTag className="text-3xl mb-4" />
                <h3 className="text-2xl font-bold">{c.title}</h3>
                <p className="text-sm mt-2">{c.note}</p>
                <div className="mt-4 bg-white/20 px-4 py-2 rounded-full inline-block text-sm font-semibold">
                  {c.code}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MULTI CITY ================= */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center">
            ✈️ Multi-City Adventures
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/10 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">European Explorer</h3>
              <p className="text-white/80">London → Paris → Rome</p>
              <p className="mt-6 text-3xl font-extrabold">$1,139</p>
              <button className="mt-6 bg-blue-500 px-6 py-2 rounded-xl">Book Package</button>
            </div>
            <div className="bg-white/10 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">Asian Highlights</h3>
              <p className="text-white/80">Tokyo → Seoul → Bangkok</p>
              <p className="mt-6 text-3xl font-extrabold">$1,429</p>
              <button className="mt-6 bg-orange-500 px-6 py-2 rounded-xl">Book Package</button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SUBSCRIBE ================= */}
      <section className="bg-gradient-to-r from-yellow-400 to-orange-500 py-20">
        <div className="max-w-3xl mx-auto text-center px-6">
          <FaPlaneDeparture className="mx-auto text-4xl text-white mb-4" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Never Miss a Deal!
          </h2>
          <p className="text-white/90 mt-3">
            Subscribe to get exclusive offers delivered weekly
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <input
              className="flex-1 px-5 py-3 rounded-xl outline-none"
              placeholder="Enter your email address"
            />
            <button className="bg-black text-white px-8 py-3 rounded-xl">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Offers
