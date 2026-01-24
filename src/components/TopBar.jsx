import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TopBar = ({ show }) => {
  const navigate = useNavigate();

  return (
    <motion.div
  initial={{ y: -80, opacity: 0 }}
  animate={show ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
  transition={{ type: "spring", stiffness: 200, damping: 20 }}
  className="
    fixed top-0 left-0 w-full px-10 py-2 text-sm
    bg-blaack
    shadow-lg z-50
  "
>
      <div className="flex justify-between items-center">
        {/* Left Links */}
<div className="flex gap-4 font-medium">
  {["Support", "Language"].map((item, i) => (
    <motion.span
      key={i}
      whileHover={{
        scale: 1.1,
        color: "blue",
        textShadow: "0 0 10px rgba(16,185,129,0.6)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className="cursor-pointer font-semibold text-gray-800"
    >
      {item}
    </motion.span>
  ))}
</div>


        {/* Right Buttons */}
        <div className="flex gap-3">
          <motion.button
            onClick={() => navigate("/Signin")}
            whileHover={{ scale: 1.05, backgroundColor: "#10B981", color: "#fff" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="px-4 py-1 bg-black rounded-full border border-white text-white font-semibold shadow-sm"
          >
            Sign In
          </motion.button>

          <motion.button
            onClick={() => navigate("/Signup")}
            whileHover={{ scale: 1.05, backgroundColor: "#06B6D4", color: "#fff" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="px-4 py-1 rounded-full bg-black text-white font-semibold shadow-sm"
          >
            Sign Up
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TopBar;
