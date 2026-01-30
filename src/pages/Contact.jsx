import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const Contact = () => {
  return (
    <>
      <Navbar />

      {/* 🌍 HERO */}
      <section className="relative h-[55vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src="/hero1.jpg"
          alt="SkyRoute Contact"
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />
        <div className="absolute" />

        <div className="relative z-10 text-amber-300 px-6 animate-fadeIn">
         
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide">
            Contact SkyRoute
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            We’re here to help you plan your perfect journey
          </p>
        </div>
      </section>

      {/* 📩 CONTACT SECTION */}
      <section className="bg-gradient-to-b from-[#f5f7ff] to-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* 📝 CONTACT FORM */}
          <div className="bg-white rounded-[40px] shadow-xl p-10 transition hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-[#0d1b3d] mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="👤 Your Name"
                className="w-full px-5 py-4 rounded-full border-2 font-semibold focus:ring-2 focus:ring-blue-500 transition"
              />

              <input
                type="email"
                placeholder="📧 Email Address"
                className="w-full px-5 py-4 rounded-full border-2 font-semibold focus:ring-2 focus:ring-blue-500 transition"
              />

              <input
                type="tel"
                placeholder="📞 Contact Number"
                className="w-full px-5 py-4 rounded-full border-2 font-semibold focus:ring-2 focus:ring-blue-500 transition"
              />

              <textarea
                rows="4"
                placeholder="💬 Your Message"
                className="w-full px-5 py-4 rounded-[30px] border-2 font-semibold focus:ring-2 focus:ring-blue-500 transition resize-none"
              />

              <button
                type="submit"
                className="w-full h-[55px] rounded-full bg-blue-600 text-white text-lg font-bold
                hover:bg-green-500 transition-all duration-500 hover:scale-105"
              >
                ✈️ Submit Message
              </button>
            </form>
          </div>

          {/* 📍 MAP + INFO */}
          <div className="space-y-8">

            {/* 🗺 GOOGLE MAP */}
            <div className="rounded-[40px] overflow-hidden shadow-xl h-[300px]">
              <iframe
                title="SkyRoute Location"
                src="https://www.google.com/maps?q=New%20Delhi%20India&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>

            {/* ☎ SUPPORT INFO */}
            <div className="bg-[#0b1d3a] text-white rounded-[40px] p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">
                Help & Support
              </h3>

              <ul className="space-y-4 text-gray-200">
                <li>📞 <span className="font-semibold">24/7 Support:</span> +91 98765 43210</li>
                <li>📧 <span className="font-semibold">Email:</span> support@skyroute.com</li>
                <li>🌍 <span className="font-semibold">Head Office:</span> New Delhi, India</li>
                <li>✈️ <span className="font-semibold">Booking Help:</span> Flights, Hotels, Tours</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ⭐ EXTRA TRUST SECTION */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

          <div className="p-6 rounded-[30px] shadow hover:shadow-xl transition">
            <h3 className="text-xl font-bold">🌐 Global Destinations</h3>
            <p className="mt-2 text-gray-600">
              Travel to 150+ countries worldwide
            </p>
          </div>

          <div className="p-6 rounded-[30px] shadow hover:shadow-xl transition">
            <h3 className="text-xl font-bold">💳 Secure Payments</h3>
            <p className="mt-2 text-gray-600">
              100% safe & encrypted transactions
            </p>
          </div>

          <div className="p-6 rounded-[30px] shadow hover:shadow-xl transition">
            <h3 className="text-xl font-bold">⭐ Trusted by Travelers</h3>
            <p className="mt-2 text-gray-600">
              Thousands of happy SkyRoute customers
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}

export default Contact
