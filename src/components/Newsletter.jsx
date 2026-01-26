import { motion } from "framer-motion"

const Newsletter = () => {
  return (
    <section className="relative w-full min-h-[90vh] overflow-hidden  text-white flex items-center">
      
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 opacity-90"
        style={{ backgroundImage: "url(/travelnews2.jpg)" }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/20" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full grid md:grid-cols-2 items-center gap-16 ">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="text-sm tracking-widest text-black/80 mb-4">
            STAY UP-TO-DATE
          </p>

          <h2 className="text-4xl font-serif md:text-5xl font-bold leading-tight mb-6 hover:text-cyan-400 hover:scale-105">
            With our Travel  
            <span className="block text-white hover:text-fuchsia-500">Newsletter</span>
          </h2>

          <p className=" font-bold italic max-w-md mb-10 text-green-400">
             Exclusive flight deals, hidden destinations and premium travel
            insights — no spam, only experiences...
          </p>

          {/* INPUT */}
          <div className="flex items-center bg-white rounded-full max-w-fullmd overflow-hidden">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-6 py-4 text-black outline-none"
            />
            <button className="px-12 py-4 bg-black text-white font-semibold hover:bg-neutral-900 transition">
              SEND
            </button>
          </div>

          <p className="text-xs font-bold text-black/70 mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="hidden md:flex justify-center"
        >
          <div className="relative w-[480px] h-[480px] rounded-full border border-white/20 overflow-hidden">
            <img
              src="/travelnews.jpg"
              alt="travel"
              className="w-full h-full object-cover opacity-100"
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Newsletter
