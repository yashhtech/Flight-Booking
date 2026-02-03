import { motion } from "framer-motion"

const offersData = [
  {
    tag: "🔥 HOT DEAL",
    code: "FLY500",
    title: "₹500 OFF on Domestic Flights",
    desc: "Book domestic flights & save instantly",
    color: "from-blue-500 to-indigo-600",
  },
  {
    tag: "🌍 INTERNATIONAL",
    code: "INTL10",
    title: "10% OFF on International Trips",
    desc: "Explore the world at discounted prices",
    color: "from-emerald-500 to-teal-600",
  },
  {
    tag: "🏨 HOTELS",
    code: "HOTEL200",
    title: "₹200 OFF on Hotels",
    desc: "Luxury & budget stays at best price",
    color: "from-yellow-400 to-orange-500",
  },
  {
    tag: "💎 PREMIUM",
    code: "FIRSTCLASS",
    title: "Exclusive Premium Deals",
    desc: "Special fares for premium users",
    color: "from-purple-500 to-pink-600",
  },
  {
    tag: "⚡ LIMITED",
    code: "FLASH24",
    title: "Flash Sale – 24 Hours",
    desc: "Hurry! Limited time only",
    color: "from-red-500 to-rose-600",
  },
  {
    tag: "🆕 NEW USER",
    code: "WELCOME300",
    title: "₹300 OFF for New Users",
    desc: "First booking special offer",
    color: "from-cyan-500 to-sky-600",
  },
]

const Offers = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-950 dark:to-gray-900 px-4 py-12">

      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-14 text-center"
      >
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
          ✈️ Super Saver Deals
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Best prices. Trusted bookings. Limited-time offers.
        </p>

        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow text-sm">
            ✔ No Hidden Charges
          </span>
          <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow text-sm">
            ✔ Instant Confirmation
          </span>
          <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow text-sm">
            ✔ Secure Payments
          </span>
        </div>
      </motion.div>

      {/* OFFERS GRID */}
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {offersData.map((offer, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -8 }}
            transition={{ type: "spring", stiffness: 180 }}
            className={`rounded-3xl p-6 text-white shadow-2xl bg-gradient-to-br ${offer.color} relative`}
          >
            <span className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
              {offer.tag}
            </span>

            <h3 className="text-2xl font-bold mb-2">
              {offer.title}
            </h3>

            <p className="text-white/90 mb-6">
              {offer.desc}
            </p>

            <div className="flex items-center justify-between bg-black/25 rounded-xl px-4 py-3">
              <span className="tracking-widest font-bold text-lg">
                {offer.code}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(offer.code)
                  alert(`Coupon ${offer.code} copied 🎉`)
                }}
                className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
              >
                Copy
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* EXTRA SECTION – WHY CHOOSE US */}
      <div className="max-w-7xl mx-auto mt-20 grid md:grid-cols-3 gap-8">
        {[
          { title: "Lowest Price Guarantee", icon: "💰" },
          { title: "24×7 Customer Support", icon: "📞" },
          { title: "Trusted by 1M+ Users", icon: "⭐" },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow text-center"
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <h4 className="font-bold text-lg text-gray-800 dark:text-white">
              {item.title}
            </h4>
          </motion.div>
        ))}
      </div>

      {/* CALL TO ACTION */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto mt-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-center text-white shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-3">
          Ready to Book Your Next Trip?
        </h2>
        <p className="mb-6 text-white/90">
          Apply these coupons & save big on your journey ✨
        </p>
        <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition">
          Start Booking
        </button>
      </motion.div>
    </div>
  )
}

export default Offers
