import flights from "../../data/flights.json"
import { useNavigate } from "react-router-dom"

const FlightList = ({ from, to }) => {
  const navigate = useNavigate()

  const filtered = flights.filter(
    f => f.from.toLowerCase().includes(from.toLowerCase())
      && f.to.toLowerCase().includes(to.toLowerCase())
  )

  return (
    <div className="mt-6 space-y-4">
      {filtered.map(f => (
        <div key={f.id} className="p-4 bg-slate-100 rounded flex justify-between">
          <div>
            <h3 className="font-bold">{f.airline}</h3>
            <p>{f.from} → {f.to}</p>
          </div>
          <div>
            <p>₹{f.price}</p>
            <button
              onClick={() => navigate(`/seats/${f.id}`)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Select
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FlightList
