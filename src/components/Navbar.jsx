import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "./TopBar";
import GooeyNav from "./GooeyNav";

const Navbar = () => {
  const navigate = useNavigate();
  const [showTopBar, setShowTopBar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Offers", href: "/offers" },
    { label: "Destinations", href: "/destinations" },
  ];

  // Topbar appear on cursor anywhere
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY <= 100) setShowTopBar(true);
      else setShowTopBar(false);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="w-full">
      {/* TopBar */}
      <AnimatePresence>
        {showTopBar && <TopBar show={showTopBar} />}
      </AnimatePresence>

      {/* Navbar */}
      <motion.nav
        animate={{ y: showTopBar ? 40 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="w-full fixed top-0 z-40 bg-gradient-to-r from-teal-300/70 to-green-200/70 shadow-lg backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center h-16">
          {/* Logo */}
          <motion.h2
            className="text-3xl font-extrabold text-teal-900 cursor-pointer font-serif hover:text-teal-700 transition duration-300"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
          >
            Flivain
          </motion.h2>

          {/* Desktop GooeyNav Links */}
          <div className="hidden md:block">
            <GooeyNav
             items={navItems}
             particleCount={20}
             particleR={120}
              animationTime={700}
              timeVariance={300}
             colors={["#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#8B5CF6", "#EC4899"]}
              onClick={(href) => navigate(href)}
              />
          </div>

          {/* Contact Button */}
          <motion.button
            onClick={() => navigate("/contact")}
            whileHover={{ scale: 1.05, backgroundColor: "#06B6D4", color: "#fff" }}
            className="hidden md:block bg-white text-teal-600 px-5 py-2 rounded-full font-semibold shadow-md"
          >
            Contact
          </motion.button>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              <motion.div
                className="w-6 h-0.5 bg-teal-900 my-1"
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              />
              <motion.div
                className="w-6 h-0.5 bg-teal-900 my-1"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.div
                className="w-6 h-0.5 bg-teal-900 my-1"
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-gradient-to-r from-teal-200/70 to-green-200/70 w-full px-6 pb-4 flex flex-col gap-4 shadow-lg rounded-xl"
          >
            {navItems.map((item, i) => (
              <li
                key={i}
                onClick={() => {
                  navigate(item.href);
                  setIsOpen(false);
                }}
                className="text-teal-900 py-2 px-2 rounded-md cursor-pointer font-medium hover:scale-105 transition"
              >
                {item.label}
              </li>
            ))}
            <motion.button
              onClick={() => {
                navigate("/contact");
                setIsOpen(false);
              }}
              whileHover={{ scale: 1.05, backgroundColor: "#06B6D4", color: "#fff" }}
              className="bg-white text-teal-600 px-4 py-2 rounded-full font-semibold shadow-md"
            >
              Contact
            </motion.button>
          </motion.ul>
        )}
      </motion.nav>
    </div>
  );
};

export default Navbar;
