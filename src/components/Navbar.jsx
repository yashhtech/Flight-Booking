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

      {/* NAVBAR */}
      <motion.nav
        animate={{ y: showTopBar ? 40 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="
          fixed top-0 z-40 w-full
          bg-gradient-to-r
          from-red-600/25 via-rose-500/20 to-red-700/25
          backdrop-blur-xl
          border-b border-white/10
        "
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center h-[72px]">

          {/* LOGO */}
          <motion.h2
            className="
              text-3xl font-extrabold
              text-white cursor-pointer
              font-serif tracking-wide
              hover:text-red-400 transition
            "
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
          >
            Flivain
          </motion.h2>

          {/* DESKTOP NAV */}
          <div className="hidden md:block">
            <GooeyNav
              items={navItems}
              particleCount={20}
              particleR={120}
              animationTime={700}
              timeVariance={300}
              colors={[
                "#EF4444", // red
                "#F43F5E", // rose
                "#DC2626", // dark red
                "#FB7185", // pinkish red
              ]}
              onClick={(href) => navigate(href)}
              hoverColor="#EF4444"   // 🔥 RED HOVER
            />
          </div>

          {/* CONTACT BUTTON */}
          <motion.button
            onClick={() => navigate("/contact")}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#EF4444",
              color: "#fff",
            }}
            className="
              hidden md:block
              bg-white/90 text-black
              px-5 py-2 rounded-full
              font-semibold
              shadow-lg
            "
          >
            Contact
          </motion.button>

          {/* MOBILE HAMBURGER */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              <motion.div
                className="w-6 h-0.5 bg-white my-1"
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              />
              <motion.div
                className="w-6 h-0.5 bg-white my-1"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.div
                className="w-6 h-0.5 bg-white my-1"
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="
              md:hidden
              bg-gradient-to-b from-red-700/40 to-black/80
              backdrop-blur-xl
              border border-white/10
              w-full px-6 pb-4
              flex flex-col gap-4
              shadow-2xl
            "
          >
            {navItems.map((item, i) => (
              <li
                key={i}
                onClick={() => {
                  navigate(item.href);
                  setIsOpen(false);
                }}
                className="
                  text-white py-2 px-2 rounded-md
                  cursor-pointer font-medium
                  hover:text-red-400
                  hover:bg-white/10
                  transition
                "
              >
                {item.label}
              </li>
            ))}

            <motion.button
              onClick={() => {
                navigate("/contact");
                setIsOpen(false);
              }}
              whileHover={{ scale: 1.05, backgroundColor: "#EF4444", color: "#fff" }}
              className="
                bg-white text-black
                px-4 py-2 rounded-full
                font-semibold
              "
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
