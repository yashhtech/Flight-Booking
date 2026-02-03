import { useState, useEffect } from "react";
import { Plane, Users, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ===== DESTINATIONS DATA ===== */
const destinations = [
  { name: "Santorini, Greece", image: "/offers/greece.jpg" },
  { name: "Bali, Indonesia", image: "/offers/bali.jpg" },
  { name: "Maldives", image: "/offers/maldives.jpg" },
  { name: "Kyoto, Japan", image: "/offers/japan.jpg" },
  { name: "Paris, France", image: "/offers/poland.jpg" },
];

const FlightSearchBox = ({ onSearch }) => {
  /* ===== BACKGROUND SLIDER STATE ===== */
  const [activeBg, setActiveBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBg((prev) => (prev + 1) % destinations.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  /* ===== FORM STATE ===== */
  const [tripType, setTripType] = useState("roundtrip");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState("economy");
  const [showPassengers, setShowPassengers] = useState(false);
  const [showClass, setShowClass] = useState(false);

  /* 🔍 SEARCH HANDLER (ADDED – SAFE) */
  const handleSearch = () => {
    if (!from || !to || !departDate) return;

    onSearch({
      from,
      to,
      departDate,
      returnDate,
      passengers,
      travelClass,
      tripType,
    });
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* ===== BACKGROUND ===== */}
      <AnimatePresence initial={false}>
        <motion.div
          key={activeBg}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${destinations[activeBg].image})` }}
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.05, ease: "easeOut" }}
        >
          <div className="absolute top-8 left-8 bg-black/40 text-white px-6 py-3 rounded-full text-lg font-semibold backdrop-blur-md">
            {destinations[activeBg].name}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ===== CONTENT ===== */}
      <div className="relative z-20 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-6xl">
          {/* HEADING */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white">
              Book Your Next Journey
            </h1>
            <p className="text-white/80 mt-3 text-lg">
              Explore the world with comfort, class & confidence
            </p>
          </div>

          {/* SEARCH CARD */}
          <div className="bg-white/10 backdrop-blur-sm rounded-4xl p-6 md:p-10 border border-white/20 shadow-2xl">
            {/* TRIP TYPE */}
            <div className="flex justify-center gap-4 mb-6">
              {["roundtrip", "oneway"].map((type) => (
                <button
                  key={type}
                  onClick={() => setTripType(type)}
                  className={`px-6 py-2 rounded-full font-semibold transition ${
                    tripType === type
                      ? "bg-indigo-600 text-white"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {type === "roundtrip" ? "Round Trip" : "One Way"}
                </button>
              ))}
            </div>

            {/* INPUTS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input label="From" value={from} setValue={setFrom} icon={<Plane />} />
              <Input label="To" value={to} setValue={setTo} icon={<ArrowRight />} />
              <DateInput label="Departure" value={departDate} setValue={setDepartDate} />
              <DateInput
                label="Return"
                value={returnDate}
                setValue={setReturnDate}
                disabled={tripType === "oneway"}
              />
            </div>

            {/* BOTTOM ROW */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-6">
              {/* PASSENGERS */}
              <div className="relative md:col-span-3">
                <Label text="Passengers" />
                <button
                  onClick={() => setShowPassengers(!showPassengers)}
                  className="glass-input flex justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Users size={18} /> {passengers}
                  </span>
                  <ChevronDown />
                </button>

                <AnimatePresence>
                  {showPassengers && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="dropdown"
                    >
                      <button onClick={() => setPassengers(Math.max(1, passengers - 1))}>−</button>
                      <span>{passengers}</span>
                      <button onClick={() => setPassengers(passengers + 1)}>+</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CLASS */}
              <div className="relative md:col-span-3">
                <Label text="Class" />
                <button
                  onClick={() => setShowClass(!showClass)}
                  className="glass-input flex justify-between capitalize"
                >
                  {travelClass} <ChevronDown />
                </button>

                <AnimatePresence>
                  {showClass && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="dropdown"
                    >
                      {["economy", "business", "first class"].map((cls) => (
                        <button
                          key={cls}
                          onClick={() => {
                            setTravelClass(cls);
                            setShowClass(false);
                          }}
                        >
                          {cls}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SEARCH */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                className="md:col-span-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl font-bold text-lg py-3 flex items-center justify-center gap-3 shadow-xl"
              >
                <Plane /> Search Flights
              </motion.button>
            </div>
          </div>

          {/* DOT INDICATOR */}
          <div className="flex justify-center gap-3 mt-6">
            {destinations.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveBg(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  activeBg === i ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ===== REUSABLE UI ===== */
const Label = ({ text }) => (
  <label className="text-white/80 text-sm font-medium mb-1 block">{text}</label>
);

const Input = ({ label, value, setValue, icon }) => (
  <div>
    <Label text={label} />
    <div className="relative">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="City or airport"
        className="glass-input"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
        {icon}
      </span>
    </div>
  </div>
);

const DateInput = ({ label, value, setValue, disabled }) => (
  <div>
    <Label text={label} />
    <input
      type="date"
      value={value}
      disabled={disabled}
      onChange={(e) => setValue(e.target.value)}
      className="glass-input"
    />
  </div>
);

export default FlightSearchBox;
