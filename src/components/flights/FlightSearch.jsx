import { useState } from "react";
import { motion } from "framer-motion";
import cities from "../../data/cities.json";
import FlightList from "./FlightList";

const API_KEY = import.meta.env.VITE_GBDB_API_KEY;

const FlightSearch = () => {
  const [tripType, setTripType] = useState("national");
  const [journeyType, setJourneyType] = useState("oneway");

  const [legs, setLegs] = useState([
    { from: "", to: "", fromList: [], toList: [], date: "" },
  ]);

  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");
  const [showResults, setShowResults] = useState(false);

  // 🌍 API city fetch
  const fetchCities = async (query, setter) => {
    if (query.length < 2) return setter([]);
    try {
      const res = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5`,
        {
          headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );
      const data = await res.json();
      setter(data.data || []);
    } catch {
      setter([]);
    }
  };

  const filterIndianCities = (query, setter) => {
    if (!query) return setter([]);
    setter(
      cities
        .filter((c) => c.city.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 6)
    );
  };

  const updateLeg = (i, key, value) => {
    const copy = [...legs];
    copy[i][key] = value;
    setLegs(copy);
  };

  const addLeg = () => {
    setLegs([...legs, { from: "", to: "", fromList: [], toList: [], date: "" }]);
  };

  const removeLeg = (i) => {
    if (legs.length === 1) return;
    setLegs(legs.filter((_, idx) => idx !== i));
  };

  const handleSearch = () => {
    for (let leg of legs) {
      if (!leg.from || !leg.to || !leg.date) {
        alert("Please fill all fields");
        return;
      }
      if (leg.from === leg.to) {
        alert("From & To cannot be same");
        return;
      }
    }
    setShowResults(true);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('bg.jpg')",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full  bg-transparent rounded-3xl p-8"
      >
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Flight Search
        </h1>

        {/* TRIP TYPE */}
        <div className="flex gap-4 border-b pb-4 mb-6">
          {["oneway", "round", "multi"].map((j) => (
            <button
              key={j}
              onClick={() => {
                setJourneyType(j);
                setLegs([{ from: "", to: "", fromList: [], toList: [], date: "" }]);
              }}
              className={`px-5 py-2 rounded-md font-semibold transition
                ${
                  journeyType === j
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              {j === "oneway" && "One Way"}
              {j === "round" && "Round Trip"}
              {j === "multi" && "Multi City"}
            </button>
          ))}
        </div>

        {/* FLIGHT LEGS */}
        {legs.map((leg, i) => (
          <div
            key={i}
            className="grid md:grid-cols-3 gap-4 mb-4 relative"
          >
            {/* FROM */}
            <div>
              <label className="text-sm text-gray-500">FROM</label>
              <input
                className="w-full border rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter city"
                value={leg.from}
                onChange={(e) => {
                  const val = e.target.value;
                  updateLeg(i, "from", val);
                  tripType === "international"
                    ? fetchCities(val, (l) => updateLeg(i, "fromList", l))
                    : filterIndianCities(val, (l) =>
                        updateLeg(i, "fromList", l)
                      );
                }}
              />
            </div>

            {/* TO */}
            <div>
              <label className="text-sm text-gray-500">TO</label>
              <input
                className="w-full border rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter city"
                value={leg.to}
                onChange={(e) => {
                  const val = e.target.value;
                  updateLeg(i, "to", val);
                  tripType === "international"
                    ? fetchCities(val, (l) => updateLeg(i, "toList", l))
                    : filterIndianCities(val, (l) =>
                        updateLeg(i, "toList", l)
                      );
                }}
              />
            </div>

            {/* DATE */}
            <div>
              <label className="text-sm text-gray-500">DEPART</label>
              <input
                type="date"
                className="w-full border rounded-md px-4 py-3"
                value={leg.date}
                onChange={(e) => updateLeg(i, "date", e.target.value)}
              />
            </div>

            {journeyType === "multi" && (
              <button
                onClick={() => removeLeg(i)}
                className="absolute -right-3 top-6 text-red-500"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        {journeyType === "multi" && (
          <button
            onClick={addLeg}
            className="text-blue-600 font-semibold mb-6"
          >
            + Add another city
          </button>
        )}

        {/* PASSENGERS */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <select
            className="border px-4 py-3 rounded-md"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n}>{n} Passenger</option>
            ))}
          </select>

          <select
            className="border px-4 py-3 rounded-md"
            value={travelClass}
            onChange={(e) => setTravelClass(e.target.value)}
          >
            <option>Economy</option>
            <option>Business</option>
            <option>First Class</option>
          </select>
        </div>

        {/* SEARCH */}
        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-md font-bold text-lg"
        >
          Search Flights
        </button>

        {showResults && (
          <div className="mt-8">
            <FlightList
              legs={legs}
              passengers={passengers}
              travelClass={travelClass}
              tripType={tripType}
              journeyType={journeyType}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FlightSearch;
