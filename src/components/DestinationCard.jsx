import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion"
import { useEffect } from "react"

const destinations = [
  {
    city: "Paris",
    country: "France",
    image:
      "/places/paris.jpg",
    reason:
      '"Romantic streets, timeless art, iconic landmarks and café culture."',
  },
  {
    city: "Dubai",
    country: "UAE",
    image:
      "/places/dubai.jpg",
    reason:
      '"Luxury lifestyle, futuristic skyline and unforgettable desert safaris."',
  },
  {
    city: "Tokyo",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1549693578-d683be217e58?q=80&w=1200",
    reason:
      '"Tradition meets technology with vibrant streets and unique culture." ',
  },
  {
    city: "Rome",
    country: "Italy",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200",
    reason:
      '"Ancient history, stunning architecture and world-class cuisine." ',
  },
]

const DestinationCard = () => {
  /* cursor reactive background */
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const bgX = useTransform(x, [0, window.innerWidth], ["0%", "100%"])
  const bgY = useTransform(y, [0, window.innerHeight], ["0%", "100%"])

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  /* 🔁 infinite scroll controls */
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 32,
        ease: "linear",
        repeat: Infinity,
      },
    })
  }, [])

  return (
    <section className="relative px-12 py-20 overflow-hidden bg-[#0B1220] text-white">
      {/* CURSOR BACKGROUND EFFECT */}
      <motion.div
        style={{ backgroundPosition: `${bgX} ${bgY}` }}
        className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.35),transparent_55%)]"
      />

      {/* HEADING */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 text-4xl md:text-5xl font-extrabold mb-16 text-center tracking-tight"
      >
        Travel to make memories...ᯓ ✈︎ <br />
        <span className="text-blue-400">all around the world 🌍</span>
      </motion.h2>

      {/* INFINITE SCROLL ROW */}
      <motion.div
        className="relative z-10 flex gap-30 w-max"
        animate={controls}
        onHoverStart={() => controls.stop()}
        onHoverEnd={() =>
          controls.start({
            x: ["0%", "-50%"],
            transition: {
              duration: 32,
              ease: "linear",
              repeat: Infinity,
            },
          })
        }
      >
        {[...destinations, ...destinations].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.1,
              delay: i * 0.12,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -12,
              rotateX: 6,
              rotateY: -6,
            }}
            className="group relative rounded-t-[80px] rounded-b-[38px] overflow-hidden
              bg-gradient-to-br from-[#141B2D] to-[#0E1626]
              shadow-[0_30px_60px_rgba(0,0,0,0.6)]
              w-[280px] flex-shrink-0 
              hover:scale-110"
          >
            {/* IMAGE */}
            <div className="overflow-hidden">
              <img
                src={item.image}
                alt={item.city}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <h3 className="text-3xl font-bold tracking-wide">
                {item.city}
              </h3>
              <p className="text-sm uppercase tracking-widest font-extrabold text-blue-400 mt-1">
                {item.country}
              </p>
              <p className="mt-3 text-lg leading-relaxed text-gray-300 italic group-hover:text-gray-100 transition">
                {item.reason}
              </p>

              <div className="mt-4 h-[2px] w-12 bg-blue-500 group-hover:w-20 transition-all duration-500" />
            </div>

            {/* HOVER GLOW */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.35),transparent_60%)]" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default DestinationCard
