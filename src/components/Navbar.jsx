import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa"
import { getStoredUser } from "../services/auth"

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const user = getStoredUser()

  const navItems = [
    { label: "Home", href: "/", icon: "✈︎" },
    { label: "About", href: "/about", icon: "ⓘ" },
    { label: "Offers", href: "/offers", icon: "🏷️" },
    { label: "Destinations", href: "/destinations", icon: "🗺️" },
  ]

  const handleProfileClick = () => {
    if (user && user.isLoggedIn) {
      navigate("/profile")
    } else {
      navigate("/signin")
    }
  }

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className="pointer-events-auto bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xl rounded-full px-6 sm:px-8 py-3 flex items-center justify-between gap-6 max-w-5xl w-full"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 select-none group transition transform hover:scale-105"
        >
          <span className="text-2xl transform transition group-hover:rotate-12">✈️</span>
          <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            SkyRoute
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`px-4 py-2 rounded-full font-bold text-sm sm:text-base transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                      : "text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                  }`}
                >
                  <span className="text-xs">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/contact"
            className="text-slate-700 hover:text-blue-600 px-4 py-2 rounded-full font-semibold text-sm transition"
          >
            Support & Contact
          </Link>

          <button
            onClick={handleProfileClick}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-blue-600 text-white font-medium text-sm transition-all shadow-md hover:scale-105"
            aria-label="User Account"
          >
            <FaUserCircle className="text-lg" />
            <span>{user && user.isLoggedIn ? (user.fullName?.split(" ")[0] || "Profile") : "Sign In"}</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={handleProfileClick}
            className="p-2 text-slate-800 hover:text-blue-600 transition"
            aria-label="User Profile"
          >
            <FaUserCircle className="text-2xl" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-800 hover:text-blue-600 transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 bg-slate-900/90 backdrop-blur-md z-40 p-6 pointer-events-auto md:hidden flex flex-col justify-between">
          <ul className="space-y-4 pt-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-5 py-3 rounded-2xl text-lg font-bold transition ${
                    location.pathname === item.href
                      ? "bg-blue-600 text-white"
                      : "text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-5 py-3 rounded-2xl text-lg font-bold text-slate-200 hover:bg-slate-800 transition"
              >
                <span className="mr-3">📞</span> Contact Us
              </Link>
            </li>
          </ul>

          <div className="pb-8 space-y-3">
            {user && user.isLoggedIn ? (
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-3.5 rounded-full bg-blue-600 text-white text-center font-bold text-lg shadow-lg"
              >
                Go to Profile ({user.fullName || "User"})
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 rounded-full bg-slate-800 text-white text-center font-bold"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 rounded-full bg-blue-600 text-white text-center font-bold"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
