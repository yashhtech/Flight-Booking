import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "./TopBar";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTopBar, setShowTopBar] = useState(false);

  // Nav items with emoji
  const navItems = [
    { label: "Home", href: "/", icon: "🏠" },
    { label: "About", href: "/about", icon: "ℹ️" },
    { label: "Offers", href: "/offers", icon: "💰" },
    { label: "Destinations", href: "/destinations", icon: "🌍" },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY <= 100) setShowTopBar(true);
      else setShowTopBar(false);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <div className="w-full">
      {/* TopBar */}
      <AnimatePresence>
        {showTopBar && <TopBar show={showTopBar} />}
      </AnimatePresence>

      {/* Floating Navbar */}
      <motion.nav
        animate={{ y: showTopBar ? 40 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 
                   bg-white/80 backdrop-blur-md border border-black/20 
                   shadow-lg rounded-full px-10 md:px-16 py-3 flex items-center"
      >
        {/* Logo */}
        <motion.div
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-2 cursor-pointer select-none mr-8"
        >
          <motion.span
            whileHover={{ rotate: -8, scale: 1.2 }}
            className="text-3xl text-yellow-500 drop-shadow-[0_0_20px_rgba(255,215,0,0.9)]"
          >
            ✈️
          </motion.span>
          <span className="text-xl md:text-2xl font-extrabold text-black drop-shadow-lg">
            SkyRoute
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href} className="relative">
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`relative z-10 px-5 py-2 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "bg-black text-white scale-105"
                      : "text-black hover:bg-black hover:text-white hover:scale-105"
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Contact Button */}
        <motion.button
          onClick={() => navigate("/contact")}
          whileHover={{ scale: 1.05, backgroundColor: "green", color: "#fff" }}
          className="hidden md:block bg-red-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg ml-8 transition-all"
        >
          Contact
        </motion.button>
      </motion.nav>
    </div>
  );
};

export default Navbar;
