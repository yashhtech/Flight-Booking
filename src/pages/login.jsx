// src/pages/Login.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import bgVideo from "../assets/vecteezy_summer-travel-around-the-world-concept-with-beach_9265750.mp4";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("flightUser"));

    if (
      savedUser &&
      savedUser.email === formData.email &&
      savedUser.password === formData.password
    ) {
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        window.location.href = "/"; // HOME PAGE
      }, 2000);
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden">

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover brightness-110 contrast-110 saturate-125"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/35" />

      {/* BACK BUTTON */}
<div className="absolute top-6 left-6 z-20">
  <button
    onClick={() => window.history.back()}
    className="
      flex items-center gap-2
      text-white font-semibold tracking-wide
      hover:text-cyan-300
      transition-all duration-300
    "
  >
    <span className="text-2xl leading-none">←</span>
    Back
  </button>
   </div>


      {/* CONTENT */}
      <div className="relative z-10 flex h-full flex-col lg:flex-row">

        {/* LEFT TEXT */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-10 py-10 lg:py-0">
          <motion.h1
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center lg:text-left text-white leading-tight drop-shadow-2xl"
          >
            Life is short,
            <br />
            <span className="bg-linear-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              book the trip
            </span>
          </motion.h1>
        </div>

        {/* LOGIN FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1 }}
          className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-16 lg:px-24 space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-xl">
            Ready for Flight ✈️
          </h2>

          {/* EMAIL */}
          <div>
            <label className="text-sm uppercase tracking-widest text-cyan-300">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
              placeholder="you@example.com"
              className="w-full mt-2 px-5 py-4 rounded-full bg-white/25 backdrop-blur-xl text-white border border-white/40 focus:ring-4 focus:ring-cyan-400 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm uppercase tracking-widest text-cyan-300">
              Password
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              required
              placeholder="••••••••"
              className="w-full mt-2 px-5 py-4 rounded-full bg-white/25 backdrop-blur-xl text-white border border-white/40 focus:ring-4 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-sm font-semibold">{error}</p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="py-4 rounded-full bg-linear-to-r from-cyan-400 to-blue-500 text-black font-bold text-lg hover:scale-105 transition-all"
          >
            Login
          </button>
        </motion.form>
      </div>

      {/* SUCCESS ALERT */}
      {showSuccess && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <div className="bg-white/15 backdrop-blur-2xl border border-white/30 rounded-3xl px-10 py-8 text-center text-white shadow-[0_0_50px_rgba(56,189,248,0.8)]">
            <h2 className="text-3xl font-extrabold mb-2">
              ✅ Login Successful
            </h2>
            <p className="text-white/80">
              Welcome aboard ✈️
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Login;
