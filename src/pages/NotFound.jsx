import { Link } from "react-router-dom"
import { PlaneTakeoff, Home } from "lucide-react"

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0B1220] to-[#020617] text-white px-6">
      <div className="text-center max-w-lg">
        <div className="inline-flex p-6 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 text-blue-400 animate-bounce">
          <PlaneTakeoff size={54} />
        </div>
        <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold mb-3">Lost in the Clouds?</h2>
        <p className="text-gray-400 text-lg mb-8">
          The page or flight destination you're looking for seems to have departed or does not exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-bold text-white shadow-lg shadow-blue-500/25 transition transform hover:scale-105"
        >
          <Home size={20} />
          Return to Runway (Home)
        </Link>
      </div>
    </div>
  )
}

export default NotFound
