import TopBar from "../components/TopBar"
import Navbar from "../components/Navbar"
import SearchCard from "../components/SearchCard"
import FeatureCard from "../components/FeatureCard"
import DestinationCard from "../components/DestinationCard"
import Footer from "../components/Footer"

import plane from "../assets/plane.png"
import skyVideo from "../assets/sky.mp4"

const Home = () => {
  return (
    <>
      <TopBar />
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative mx-4 mt-6 rounded-[48px] bg-[#eaf2ff] overflow-hidden">

        <div className="relative flex flex-col items-center pt-24 pb-40">

          {/* HEADING */}
          <h1 className="text-center text-[44px] md:text-[64px] font-bold text-[#0f172a] leading-tight">
            Find And Book <br /> A Great Experience
          </h1>

          {/* CAPSULE + PLANE */}
          <div className="relative mt-20 w-[88%] md:w-[70%] h-[260px] md:h-[340px]">

            {/* CAPSULE (VIDEO ONLY) */}
            <div className="absolute inset-0 rounded-[200px] overflow-hidden shadow-[0_50px_120px_rgba(0,0,0,0.25)]">
              <video
                src={skyVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            {/* PLANE (STATIC – ABOVE CAPSULE) */}
            <img
              src={plane}
              alt="Aeroplane"
              className="
                absolute 
                left-1/2 
                -translate-x-1/2 
                -bottom-20 
                w-[120%] 
                md:w-[130%] 
                z-20 
                drop-shadow-[0_40px_60px_rgba(0,0,0,0.35)]
              "
            />
          </div>

          {/* SEARCH CARD */}
          <div className="relative z-30 mt-36 w-[92%] md:w-[75%]">
            <SearchCard />
          </div>

        </div>
      </section>

      {/* ================= TRAVEL SUPPORT ================= */}
      <section className="px-10 py-24 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <h2 className="text-4xl font-bold text-[#0f172a]">
            Plan your travel with confidence
          </h2>

          <ul className="mt-8 space-y-4 text-lg text-gray-700">
            <li>✔ Travel requirements for Dubai</li>
            <li>✔ Multi-risk travel insurance</li>
            <li>✔ Travel requirements by destination</li>
          </ul>
        </div>

        <div className="flex gap-6 justify-center">
          <img
            src="img2"
            className="rounded-full w-40 h-40 object-cover shadow-lg"
          />
          <img
            src="img3"
            className="rounded-full w-40 h-40 object-cover shadow-lg"
          />
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="px-10 py-20 grid md:grid-cols-3 gap-8">
        <FeatureCard title="Book & Relax" />
        <FeatureCard title="Smart Checklist" />
        <FeatureCard title="Save More" />
      </section>

      {/* ================= DESTINATIONS ================= */}
      <section className="px-10 py-24">
        <h2 className="text-3xl font-bold mb-12 text-[#0f172a]">
          Travel to make memories all around the world
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          <DestinationCard />
          <DestinationCard />
          <DestinationCard />
          <DestinationCard />
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home
