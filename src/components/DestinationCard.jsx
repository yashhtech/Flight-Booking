import { motion, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"

const destinations = [
  {
    city: "Paris",
    country: "France",
    image: "/places/paris.jpg",
    reason: '"Romantic streets, timeless art, iconic landmarks and café culture."',
  },
  {
    city: "Dubai",
    country: "UAE",
    image: "/places/dubai.jpg",
    reason: '"Luxury lifestyle, futuristic skyline and unforgettable desert safaris."',
  },
  {
    city: "London",
    country: "United Kingdom",
    image: "/places/london.jpg",
    reason: '"Historic grandeur, world-renowned theatre, vibrant culture and parks."',
  },
  {
    city: "Switzerland",
    country: "Switzerland",
    image: "/places/switzerland.jpg",
    reason: '"Alpine peaks, crystalline lakes, scenic railways and timeless peace."',
  },
]

const DestinationCard = () => {
  const controls = useAnimation()
  const sectionRef = useRef(null)

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 28,
        ease: "linear",
        repeat: Infinity,
      },
    })
  }, [controls])

  return (
    <section
      ref={sectionRef}
      className="relative px-6 sm:px-12 py-20 overflow-hidden bg-[#0B1220] text-white"
    >
      {/* BACKGROUND ACCENT */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.3),transparent_65%)] pointer-events-none" />

      {/* HEADING */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-extrabold mb-16 text-center tracking-tight"
      >
        Travel to make memories...ᯓ ✈︎ <br />
        <span className="text-blue-400">all around the world 🌍</span>
      </motion.h2>

      {/* INFINITE SCROLL ROW */}
      <div className="relative z-10 overflow-hidden">
        <motion.div
          className="flex gap-8 w-max cursor-grab active:cursor-grabbing"
          animate={controls}
          onHoverStart={() => controls.stop()}
          onHoverEnd={() =>
            controls.start({
              x: ["0%", "-50%"],
              transition: {
                duration: 28,
                ease: "linear",
                repeat: Infinity,
              },
            })
          }
        >
          {[...destinations, ...destinations].map((item, i) => (
            <div
              key={i}
              className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#141B2D] to-[#0E1626] shadow-xl border border-white/10 w-[280px] sm:w-[320px] flex-shrink-0 transition-transform duration-300 hover:-translate-y-2"
            >
              {/* IMAGE */}
              <div className="h-60 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.city}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141B2D] via-transparent to-transparent opacity-80" />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-2xl font-bold tracking-wide text-white">
                  {item.city}
                </h3>
                <p className="text-xs uppercase tracking-widest font-extrabold text-blue-400 mt-1">
                  {item.country}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-300 italic">
                  {item.reason}
                </p>

                <div className="mt-4 h-[2px] w-12 bg-blue-500 group-hover:w-24 transition-all duration-300" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default DestinationCard
