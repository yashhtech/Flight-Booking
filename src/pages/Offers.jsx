import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  FaFire,
  FaClock,
  FaCrown,
  FaBell,
  FaEnvelope ,
  FaGlobe,
  FaTag,
  FaCopy,
  FaPlane,
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
    id: 1,
    city: "Santorini, Greece",
    route: "New York → Santorini",
    location: "Santorini, Greece",
    price: 449,
    rating: 4.9,
    reviews: "23.9k",
    tag: "65% OFF",
    badge: "24h left",
    img: "/offers/idk.jpg",
    type: "flash",
  },
  {
    id: 2,
    city: "Bali, Indonesia",
    route: "Los Angeles → Bali",
    location: "Bali, Indonesia",
    price: 719,
    rating: 4.7,
    reviews: "18.1k",
    tag: "55% OFF",
    badge: "Flash Sale",
    img: "/offers/bali.jpg",
    type: "last",
  },
  {
    id: 3,
    city: "Maldives",
    route: "Miami → Maldives",
    location: "Maldives",
    price: 999,
    rating: 5.0,
    reviews: "3.1k",
    tag: "60% OFF",
    badge: "Premium",
    img: "/offers/maldives.jpg",
    type: "premium",
  },
]

const upcomingDeals = [
  {
    id: 1,
    title: "Spring in Japan",
    subtitle: "Cherry Blossom Season Special",
    img: "/offers/japan.jpg",
    launchIn: "5 Days",
    discount: "50% OFF",
    period: "Mar 20 - Apr 15",
    price: "$599",
  },
  {
    id: 2,
    title: "Iceland Aurora",
    subtitle: "Northern Lights Experience",
    img: "/offers/iceland.jpg",
    launchIn: "12 Days",
    discount: "45% OFF",
    period: "Sep 15 - Oct 30",
    price: "$749",
  },
]


const coupons = [
  {
    label: "FLASH SALE",
    title: "$100 OFF",
    desc: "On bookings above $1000",
    code: "FLASH100",
    validity: "Valid until Dec 31",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    label: "MEMBER SPECIAL",
    title: "15% OFF",
    desc: "All international flights",
    code: "MEMBER15",
    validity: "Valid for 30 days",
    gradient: "from-blue-500 to-sky-500",
  },
  {
    label: "FIRST BOOKING",
    title: "$50 OFF",
    desc: "For new customers",
    code: "WELCOME50",
    validity: "One-time use",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    label: "GROUP BOOKING",
    title: "20% OFF",
    desc: "For 5+ passengers",
    code: "GROUP20",
    validity: "No expiry date",
    gradient: "from-emerald-500 to-green-500",
  },
]

const affordableDeals = [
  {
    city: "Lisbon, Portugal",
    from: "NYC",
    price: 289,
    img: "/src/assets/lisbon.jpg",
  },
  {
    city: "Prague, Czech",
    from: "Chicago",
    price: 319,
    img: "/src/assets/prague.jpg",
  },
  {
    city: "Mexico City",
    from: "LA",
    price: 199,
    img: "/src/assets/mexico.jpg",
  },
  {
    city: "Budapest, Hungary",
    from: "Boston",
    price: 339,
    img: "/src/assets/budapest.jpg",
  },
  {
    city: "Marrakech",
    from: "Miami",
    price: 379,
    img: "/src/assets/marrakech.jpg",
  },
  {
    city: "Krakow, Poland",
    from: "NYC",
    price: 299,
    img: "/src/assets/krakow.jpg",
  },
  {
    city: "Athens, Greece",
    from: "JFK",
    price: 349,
    img: "/src/assets/athens.jpg",
  },
  {
    city: "Istanbul, Turkey",
    from: "Chicago",
    price: 389,
    img: "/src/assets/istanbul.jpg",
  },
]

/* ===================== COMPONENT ===================== */

const Offers = () => {
const navigate = useNavigate()
  const [active, setActive] = useState("flash")

  const [copied, setCopied] = useState(null)

  const handleCopy = code => {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

const [destination, setDestination] = useState("All")
const [sort, setSort] = useState("low")
const [showAll, setShowAll] = useState(false)

const filteredDeals = deals
  .filter(d =>
    destination === "All" ? true : d.location.includes(destination)
  )
  .sort((a, b) =>
    sort === "low" ? a.price - b.price : b.price - a.price
  )

const visibleDeals = showAll ? filteredDeals : filteredDeals.slice(0, 3)


  return (
    <>
      <TopBar />
      <Navbar />

{/* ================= HERO ================= */}
<section className="relative min-h-[90vh] pt-[30px] w-full overflow-hidden">
  {/* Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
    src="https://res.cloudinary.com/dttbwsozv/video/upload/v1769622808/314697_medium_1_zfisdc.mp4"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/90 via-[#0b1220]/60 to-transparent" />

  {/* HERO CONTENT */}
  <div className="relative z-10 min-h-[90vh] flex items-center">
    <div className="max-w-7xl mx-auto px-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="max-w-xl text-white"
      >
        <span className="inline-flex items-center gap-2 bg-red-500/90 px-4 py-1 rounded-full text-xs font-semibold mb-6">
          ⚡ LIMITED TIME OFFERS
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Unbeatable <span className="text-orange-400">Flight</span>
          <br />Deals
        </h1>

        <p className="mt-6 text-white/80 text-base md:text-lg">
          Save up to 70% on flights worldwide. Exclusive offers updated daily!
        </p>

        {/* ✅ BUTTONS FIXED HERE */}
        <div className="mt-8 flex gap-4">
          <button className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-full font-semibold shadow-lg">
            Browse All Deals →
          </button>

          <button className="border border-white/40 hover:bg-white/10 transition px-6 py-3 rounded-full">
            🔔 Set Alert
          </button>
        </div>
      </motion.div>
    </div>
  </div>
</section>


    {/* ================= CATEGORY CARDS ================= */}
<section className="-mt-16 relative z-20 max-w-7xl mx-auto px-6">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {categories.map(c => (
      <motion.div
        key={c.id}
        whileHover={{ y: -12, scale: 1.04 }}
        transition={{ type: "spring", stiffness: 200 }}
        onClick={() => setActive(c.id)}
        className={`relative cursor-pointer bg-gradient-to-br ${c.gradient} text-white p-6 rounded-2xl shadow-2xl`}
      >
        {/* Badge */}
        <span className="absolute top-4 right-4 bg-white/20 text-[10px] px-2 py-0.5 rounded-full font-semibold">
          HOT
        </span>

        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl mb-4">
          {c.icon}
        </div>

        <h3 className="font-bold text-lg">{c.title}</h3>
        <p className="text-white/80 text-sm mt-1">
          {c.count} Deals Available
        </p>
      </motion.div>
    ))}
  </div>
</section>


<section className="max-w-7xl mx-auto px-6 py-24">
  {/* HEADER */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
    <div>
      <span className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold mb-3">
        🔥 TRENDING NOW
      </span>
      <h2 className="text-3xl md:text-4xl font-extrabold">
        Hot Deals This Week
      </h2>
      <p className="text-gray-500 mt-2">
        Limited availability – Book before they're gone!
      </p>
    </div>

    {/* FILTERS */}
    <div className="flex gap-3">
      <select
        onChange={e => setDestination(e.target.value)}
        className="border rounded-xl px-4 py-2 text-sm"
      >
        <option value="All">All Destinations</option>
        <option value="Santorini">Santorini</option>
        <option value="Bali">Bali</option>
        <option value="Maldives">Maldives</option>
      </select>

      <select
        onChange={e => setSort(e.target.value)}
        className="border rounded-xl px-4 py-2 text-sm"
      >
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>
    </div>
  </div>

  {/* CARDS */}
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {visibleDeals.map(d => (
      <motion.div
        key={d.id}
        whileHover={{ y: -10, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* IMAGE */}
        <div className="relative">
          <img
            src={d.img}
            alt={d.city}
            className="h-56 w-full object-cover"
          />

          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            {d.tag}
          </span>

          <span className="absolute top-12 left-4 bg-black/70 text-white text-[11px] px-2 py-1 rounded-full">
            {d.badge}
          </span>

          <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
            ❤️
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          <p className="text-xs text-gray-500">{d.location}</p>

          <h3 className="font-bold text-lg mt-1">
            {d.route}
          </h3>

          <p className="text-sm text-gray-400 mt-1">
            ⭐ {d.rating} ({d.reviews} reviews)
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-2xl font-extrabold">
                ${d.price}
              </p>
              <p className="text-xs text-gray-400">per person</p>
            </div>

            <button 
            onClick={() => navigate("/Signin")}
            className="bg-gray-600 hover:bg-amber-300 transition text-white px-5 py-2 rounded-xl"
            
            >
              Book Now
            </button>
          </div>
        </div>
      </motion.div>
    ))}
  </div>

  {/* VIEW ALL */}
  {!showAll && (
    <div className="mt-14 text-center">
      <button
        onClick={() => setShowAll(true)}
        className="px-6 py-3 rounded-full border hover:bg-gray-100 transition"
      >
        View All Hot Deals →
      </button>
    </div>
  )}
</section>

<section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs font-semibold">
            ⏳ COMING SOON
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-4">
            Upcoming Seasonal Offers
          </h2>
          <p className="text-gray-500 mt-2">
            Set reminders for these amazing deals launching soon
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-10">
          {upcomingDeals.map(deal => (
            <motion.div
              key={deal.id}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* IMAGE */}
              <div className="relative h-60">
                <img
                  src={deal.img}
                  alt={deal.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{deal.title}</h3>
                  <p className="text-sm opacity-90">{deal.subtitle}</p>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-gray-400">Launches in</p>
                  <p className="font-bold text-blue-600">
                    {deal.launchIn}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-400">
                    Expected Discount
                  </p>
                  <p className="font-bold text-red-500">
                    {deal.discount}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Travel Period
                  </p>
                  <p className="font-semibold">{deal.period}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-400">
                    Starting From
                  </p>
                  <p className="font-semibold">{deal.price}</p>
                </div>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6">
                <button className="w-full flex items-center justify-center gap-2 bg-amber-300 hover:bg-amber-200 text-white py-3 rounded-xl transition">
                  <FaBell />
                  Set Reminder
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>


      {/* ================= COUPONS ================= */}
<section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-1 rounded-full text-xs font-semibold">
            🎟️ EXCLUSIVE COUPONS
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-4">
            Promo Codes & Coupons
          </h2>
          <p className="text-gray-500 mt-2">
            Extra savings with our exclusive discount codes
          </p>
        </div>

        {/* COUPONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {coupons.map((c, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -12 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`relative bg-gradient-to-br ${c.gradient} text-white rounded-2xl p-6 shadow-xl`}
            >
              {/* Label */}
              <span className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                {c.label}
              </span>

              <FaTag className="text-3xl mb-6 opacity-90" />

              <h3 className="text-3xl font-extrabold">
                {c.title}
              </h3>

              <p className="text-sm mt-2 opacity-90">
                {c.desc}
              </p>

              {/* Coupon Code */}
              <div className="mt-6 border border-dashed border-white/40 rounded-xl p-3 flex items-center justify-between">
                <span className="font-mono text-sm tracking-wider">
                  {c.code}
                </span>
                <button
                  onClick={() => handleCopy(c.code)}
                  className="bg-white text-black px-3 py-1 rounded-lg text-xs font-semibold hover:bg-gray-200 transition flex items-center gap-1"
                >
                  <FaCopy />
                  {copied === c.code ? "Copied" : "Copy"}
                </button>
              </div>

              <p className="text-xs opacity-80 mt-4">
                {c.validity}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>


{/* AFFORDABLE PRICE DETAILS.... */}


    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-xs font-semibold">
            💰 BUDGET FRIENDLY
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-4">
            Affordable Flight Deals
          </h2>
          <p className="text-gray-500 mt-2">
            Amazing destinations that won’t break the bank
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {affordableDeals.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* IMAGE */}
              <div className="relative h-40">
                <img
                  src={d.img}
                  alt={d.city}
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  BEST VALUE
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="font-bold text-sm">
                  {d.city}
                </h3>

                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <FaPlaneDeparture className="text-blue-500" />
                  From {d.from}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 font-extrabold text-lg">
                      ${d.price}
                    </p>
                    <p className="text-xs text-gray-400">
                      Round trip
                    </p>
                  </div>

                  <button className="bg-yellow-300 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg transition">
                    View
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

     
     {/* ================= MULTI CITY ================= */}
     
      <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-xs font-semibold">
            🧭 EXPLORE MORE
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-4">
            Multi-City Adventures
          </h2>
          <p className="text-gray-500 mt-2">
            Visit multiple destinations in one trip and save big
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* EUROPE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="bg-blue-50 rounded-2xl p-8 shadow-lg relative"
          >
            <span className="absolute top-6 right-6 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
              40% OFF
            </span>

            <h3 className="text-xl font-extrabold">
              European Explorer
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              3 Cities, 14 Days
            </p>

            <div className="mt-6 space-y-6">
              {[
                { n: 1, city: "London, UK", nights: "5 nights • Dec 15–20" },
                { n: 2, city: "Paris, France", nights: "4 nights • Dec 20–24" },
                { n: 3, city: "Rome, Italy", nights: "5 nights • Dec 24–29" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center">
                    {c.n}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">
                      {c.city}
                    </p>
                    <p className="text-xs text-gray-500">
                      {c.nights}
                    </p>
                  </div>
                  <FaPlane className="text-blue-500" />
                </div>
              ))}
            </div>

            {/* PRICE */}
            <div className="mt-8 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 line-through">
                  $1,899
                </p>
                <p className="text-3xl font-extrabold text-blue-600">
                  $1,139
                </p>
                <p className="text-xs text-gray-500">
                  per person
                </p>
              </div>

              <button 
              onClick={() => navigate("/Signin")}

              className="bg-yellow-300 hover:bg-yellow-300 text-white px-6 py-3 rounded-xl transition">
                Book Package
              </button>
            </div>
          </motion.div>

          {/* ASIA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="bg-orange-50 rounded-2xl p-8 shadow-lg relative"
          >
            <span className="absolute top-6 right-6 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
              45% OFF
            </span>

            <h3 className="text-xl font-extrabold">
              Asian Highlights
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              4 Cities, 18 Days
            </p>

            <div className="mt-6 space-y-6">
              {[
                { n: 1, city: "Tokyo, Japan", nights: "5 nights • Jan 10–15" },
                { n: 2, city: "Seoul, Korea", nights: "4 nights • Jan 15–19" },
                { n: 3, city: "Bangkok, Thailand", nights: "5 nights • Jan 19–24" },
                { n: 4, city: "Singapore", nights: "4 nights • Jan 24–28" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-orange-500 text-white text-sm flex items-center justify-center">
                    {c.n}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">
                      {c.city}
                    </p>
                    <p className="text-xs text-gray-500">
                      {c.nights}
                    </p>
                  </div>
                  <FaPlane className="text-orange-500" />
                </div>
              ))}
            </div>

            {/* PRICE */}
            <div className="mt-8 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 line-through">
                  $2,599
                </p>
                <p className="text-3xl font-extrabold text-orange-600">
                  $1,429
                </p>
                <p className="text-xs text-gray-500">
                  per person
                </p>
              </div>

              <button 
              onClick={() => navigate("/Signin")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition">
                Book Package
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>


      {/* ================= SUBSCRIBE ================= */}
       <section className="bg-gradient-to-r from-gray-400 via-gray-400 to-gray-600 py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* ICON */}
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full">
              <FaEnvelope className="text-white text-2xl" />
            </div>
          </div>

          {/* TEXT */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Never Miss a Deal!
          </h2>

          <p className="text-white/90 mt-3 text-sm md:text-base">
            Subscribe to get exclusive offers delivered to your inbox weekly
          </p>

          {/* INPUT */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center">
            <div className="flex w-full sm:w-[520px] bg-white rounded-full overflow-hidden shadow-lg">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 text-sm outline-none"
              />
              <button className="bg-black hover:bg-gray-900 text-white px-8 text-sm font-semibold transition">
                Subscribe
              </button>
            </div>
          </div>

          {/* TRUST TEXT */}
          <p className="text-white/80 text-xs mt-4">
            Join <span className="font-semibold">500,000+</span> travelers getting the best deals
          </p>
        </motion.div>
      </div>
    </section>

      <Footer />
    </>
  )
}

export default Offers
