import { useEffect, useState, useMemo } from "react"

const POPULAR_CITIES = [
  { id: "del", city: "Delhi", region: "Delhi", country: "India" },
  { id: "bom", city: "Mumbai", region: "Maharashtra", country: "India" },
  { id: "blr", city: "Bangalore", region: "Karnataka", country: "India" },
  { id: "hyd", city: "Hyderabad", region: "Telangana", country: "India" },
  { id: "goa", city: "Goa", region: "Goa", country: "India" },
  { id: "ccu", city: "Kolkata", region: "West Bengal", country: "India" },
  { id: "dxb", city: "Dubai", region: "Dubai", country: "United Arab Emirates" },
  { id: "lhr", city: "London", region: "England", country: "United Kingdom" },
  { id: "cdg", city: "Paris", region: "Île-de-France", country: "France" },
  { id: "jfk", city: "New York", region: "New York", country: "United States" },
  { id: "sin", city: "Singapore", region: "Central", country: "Singapore" },
  { id: "bkk", city: "Bangkok", region: "Bangkok", country: "Thailand" },
  { id: "hnd", city: "Tokyo", region: "Kanto", country: "Japan" },
]

const AutoSuggestInput = ({ value, onChange, placeholder, className = "" }) => {
  const [remoteSuggestions, setRemoteSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // Local fallback matching
  const localMatches = useMemo(() => {
    if (!value || value.trim().length < 2) return []
    const q = value.toLowerCase()
    return POPULAR_CITIES.filter(
      (c) =>
        c.city.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q)
    )
  }, [value])

  useEffect(() => {
    const query = value?.trim()
    if (!query || query.length < 2) {
      return
    }

    const apiKey = import.meta.env.VITE_RAPID_API_KEY
    if (!apiKey || apiKey.includes("your_rapidapi_key")) {
      return
    }

    const controller = new AbortController()
    const timer = setTimeout(async () => {
      try {
        setLoading(true)
        const res = await fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(query)}&limit=6&sort=-population`,
          {
            signal: controller.signal,
            headers: {
              "X-RapidAPI-Key": apiKey,
              "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
          }
        )

        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data.data)) {
            setRemoteSuggestions(data.data)
          }
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          // Silent fallback to local suggestions
        }
      } finally {
        setLoading(false)
      }
    }, 250)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [value])

  const suggestions = remoteSuggestions.length > 0 ? remoteSuggestions : localMatches

  return (
    <div className="relative w-full">
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        className={
          className ||
          "w-full px-4 py-3 rounded-full border-2 border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition"
        }
      />

      {open && value && value.trim().length >= 2 && (
        <div className="absolute left-0 right-0 z-50 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-60 overflow-y-auto">
          {loading && (
            <div className="px-4 py-3 text-xs font-medium text-slate-400 animate-pulse">
              Searching destinations...
            </div>
          )}

          {!loading &&
            suggestions.map((city) => (
              <div
                key={city.id || `${city.city}-${city.country}`}
                onMouseDown={() => {
                  onChange(`${city.city}, ${city.country}`)
                  setOpen(false)
                }}
                className="px-4 py-3 cursor-pointer hover:bg-indigo-50 text-sm flex items-center gap-2 border-b border-slate-100 last:border-b-0 text-slate-700 transition"
              >
                <span>📍</span>
                <div>
                  <b className="text-slate-900">{city.city}</b>
                  <span className="text-xs text-slate-500 ml-1.5">
                    {city.region ? `${city.region}, ` : ""}
                    {city.country}
                  </span>
                </div>
              </div>
            ))}

          {!loading && suggestions.length === 0 && (
            <div className="px-4 py-3 text-xs text-slate-500 text-center">
              No matching airports or cities found
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AutoSuggestInput
