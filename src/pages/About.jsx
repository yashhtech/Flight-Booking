import { useEffect } from "react"
import { motion } from "framer-motion"
import { FaPlane, FaBuilding, FaStar, FaAward, FaGlobe } from "react-icons/fa"
import TopBar from "../components/TopBar"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"


const marquee = {
  animate: {
    x: [0, -2000],
    transition: {
      x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" }
    }
  }
}

const About = () => {
  useEffect(() => {
    document.title = "SkyRoute – About"
  }, [])


  return (
    <>
      <TopBar />
      <Navbar />

      {/* HERO – PREMIUM VIDEO */}
      <section className="relative h-[100vh] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover scale-110"
          src="https://res.cloudinary.com/dttbwsozv/video/upload/v1769448822/11737964-hd_1920_1080_60fps_dt2rio.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-indigo-900/20 to-black/40" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-indigo-300 hover:text-amber-300"
          >
            Fly Beyond Borders
          </motion.h1>


           <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 max-w-4xl text-xl md:text-2xl text-gray-200"
           >
            SkyRoute is not just travel. It’s a premium global aviation experience.
          </motion.p>
        </div>
       </section>

       {/* INFINITE LOGO / TEXT SCROLL */}
      <section className="overflow-hidden bg-gray-500 py-10">
        <motion.div
          variants={marquee}
          animate="animate"
          className="flex gap-20 text-white text-3xl font-bold whitespace-nowrap"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-black to-indigo-500">
              ✈ SKYROUTE • PREMIUM AVIATION • GLOBAL NETWORK
            </span>
          ))}
        </motion.div>
      </section>

      {/* WHO WE ARE */}
      <section className="relative py-32 bg-gradient-to-br from-sky-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <motion.div whileHover={{ rotateY: 8 }} className="p-10 rounded-3xl bg-white shadow-2xl">
            <h2 className="text-4xl font-extrabold mb-6 text-indigo-700">Who We Are</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              SkyRoute is a luxury aviation platform connecting the world with speed, trust and technology.
              We operate across continents delivering elite airline services.
            </p>
          </motion.div>

          <motion.div whileHover={{ rotateY: -8 }} className="p-10 rounded-3xl bg-gradient-to-br from-indigo-600 to-sky-500 text-white shadow-2xl">
            <h2 className="text-4xl font-extrabold mb-6">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              To redefine global air travel with innovation, comfort and world-class digital experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES – GLASS CARDS */}
      <section className="py-32 bg-black">
        <h2 className="text-center text-5xl font-extrabold text-white mb-20">Premium Services</h2>
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-12">
          {["Global Booking", "Live Tracking", "Luxury Cabins", "24/7 Elite Support"].map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -20, scale: 1.05 }}
              className="relative p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-2xl"
            >
              <FaPlane className="text-5xl text-sky-400 mb-6" />
              <h4 className="text-2xl font-bold">{service}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GLOBAL OFFICES */}
      <section className="py-32 bg-gradient-to-br from-indigo-50 to-sky-100">
        <h2 className="text-center text-5xl font-extrabold mb-20">Worldwide Presence</h2>
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-12">
          {["New York", "London", "Dubai", "Singapore"].map((city, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.12 }}
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <img src={`/about/office${i + 1}.jpg`} className="h-60 w-full object-cover" />
              <div className="p-6 bg-white text-center">
                <FaBuilding className="text-indigo-600 text-2xl mx-auto mb-2" />
                <h4 className="text-xl font-bold">{city}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AWARDS */}
      <section className="py-32 bg-gradient-to-r from-indigo-700 via-sky-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16 text-center">
          <motion.div whileHover={{ scale: 1.2 }}>
            <FaStar className="text-5xl mx-auto mb-4" />
            <h3 className="text-3xl font-bold">4.9 ★ Rating</h3>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }}>
            <FaAward className="text-5xl mx-auto mb-4" />
            <h3 className="text-3xl font-bold">Best Airline 2025</h3>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }}>
            <FaGlobe className="text-5xl mx-auto mb-4" />
            <h3 className="text-3xl font-bold">120+ Countries</h3>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default About