import { useEffect, useState } from "react"

const AutoSuggestInput = ({ value, onChange, placeholder }) => {
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!value || value.length < 2) {
      setSuggestions([])
      return
    }

    const controller = new AbortController()

    const fetchCities = async () => {
      try {
        setLoading(true)

        const res = await fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${value}&limit=6&sort=-population`,
          {
            signal: controller.signal,
            headers: {
              "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
              "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
          }
        )

        const data = await res.json()
        setSuggestions(data.data || [])
      } catch (err) {
        if (err.name !== "AbortError") console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCities()
    return () => controller.abort()
  }, [value])

  return (
    <div className="relative">
      <input
        value={value}
        placeholder={placeholder}
        onChange={e => {
          onChange(e.target.value)
          setOpen(true)
        }}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="w-full px-4 py-3 rounded-full border-2 font-semibold
        hover:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
      />

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg">
          {loading && (
            <div className="px-4 py-3 text-sm text-gray-400">
              Loading...
            </div>
          )}

          {!loading && suggestions.map(city => (
            <div
              key={city.id}
              onMouseDown={() => {
              onChange(`${city.city}, ${city.region}, ${city.country}`)
              setOpen(false)
               }}
              className="px-4 py-3 cursor-pointer hover:bg-blue-100 text-sm"
            >
              📍 <b>{city.city}</b>, {city.region}, {city.country}
            </div>
          ))}

          {!loading && suggestions.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-400">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AutoSuggestInput
