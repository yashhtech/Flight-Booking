import {
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaApplePay,
  FaGlobe,
  FaPlaneDeparture,
  FaMapLocationDot,
} from "react-icons/fa6"

const Footer = () => {
  return (
    <footer
      className="relative bg-cover bg-center text-white -mt-4"
      style={{ backgroundImage: "url('/footer.jpg')" }}
    >
      {/* OVERLAY */}
      <div className="bg-gradient-to-b from-[#00162e]/70 via-[#000f23]/95 to-black/95">

        {/* BRAND */}
        <div className="max-w-7xl mx-auto px-6 pt-24 text-center">
          <h2 className="text-4xl font-bold tracking-wide hover:text-sky-400">SkyRoute</h2>
          <p className="mt-4 max-w-xl mx-auto text-gray-300">
            Redefining global travel with seamless booking experiences.
          </p>

          <div className="flex justify-center gap-6 mt-6">
            {[FaInstagram, FaLinkedinIn, FaXTwitter].map((Icon, i) => (
              <Icon
                key={i}
                className="text-5xl text-gray-300 cursor-pointer transition-all duration-300 hover:text-sky-400 hover:-translate-y-1 hover:scale-110"
              />
            ))}
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12">

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-5">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Press & Media", "Careers", "Sustainability"].map((item, i) => (
                <li key={i} className="footer-link">{item}</li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-5 flex items-center gap-2">
              <FaPlaneDeparture className="text-sky-400" /> Services
            </h4>
            <ul className="space-y-3">
              {["Flight Booking", "Seat Selection", "In-Flight Meals", "Travel Insurance"].map((item, i) => (
                <li key={i} className="footer-link">{item}</li>
              ))}
            </ul>
          </div>

          {/* Global Services */}
          <div>
            <h4 className="text-lg font-semibold mb-5 flex items-center gap-2">
              <FaGlobe className="text-sky-400" /> Global Services
            </h4>
            <ul className="space-y-3">
              {["24/7 Worldwide Support", "Multi-Currency Payments", "Visa Assistance", "International Partnerships"].map((item, i) => (
                <li key={i} className="footer-link">{item}</li>
              ))}
            </ul>
          </div>

          {/* Network & Offices */}
          <div>
            <h4 className="text-lg font-semibold mb-5 flex items-center gap-2">
              <FaMapLocationDot className="text-sky-400" /> Global Network
            </h4>
            <ul className="space-y-3">
              {["North America", "Europe", "Asia-Pacific", "Middle East & Africa"].map((item, i) => (
                <li key={i} className="footer-link">{item}</li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-5">Legal</h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms & Conditions", "Cookie Preferences", "Accessibility"].map((item, i) => (
                <li key={i} className="footer-link">{item}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* TRUST BAR */}
        <div className="max-w-7xl mx-auto px-6 mt-20 py-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-6 text-3xl text-gray-300">
            <FaCcVisa className="text-7xl"/>
            <FaCcMastercard className="text-7xl"/>
            <FaCcAmex className="text-7xl" />
            <FaApplePay className="text-8xl" />
          </div>
          <p className="text-sm text-gray-400">
            🔒 SSL Encrypted · IATA Certified · Trusted Worldwide
          </p>
        </div>

        {/* UTILITIES */}
        <div className="max-w-7xl mx-auto px-6 mt-16 flex flex-wrap justify-between gap-6">
          <div className="flex gap-4">
            <select className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full outline-none">
              <option className="text-black">USD</option>
              <option className="text-black">EUR</option>
              <option className="text-black">GBP</option>
              <option className="text-black">INR</option>
            </select>

            <select className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full outline-none">
              <option className="text-black">English</option>
              <option className="text-black">Hindi</option>
              <option className="text-black">Español</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button className="px-6 py-2 rounded-full bg-sky-500 hover:bg-sky-600 transition">
              App Store
            </button>
            <button className="px-6 py-2 rounded-full bg-sky-500 hover:bg-sky-600 transition">
              Google Play
            </button>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-20 py-6 text-center text-xs text-gray-500">
          © 2026 SkyRoute. All rights reserved.
        </div>

      </div>

      {/* Tailwind reusable class */}
      <style>
        {`
          .footer-link {
            @apply text-gray-300 cursor-pointer transition-all duration-300 hover:text-sky-400 hover:translate-x-2;
          }
        `}
      </style>
    </footer>
  )
}

export default Footer
