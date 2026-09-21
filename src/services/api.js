/**
 * Frontend API Service layer.
 * Preserves exact existing backend API endpoints and request/response contracts:
 * - Flights: http://localhost:3002/flights
 * - Bookings: http://localhost:5000/bookings & http://localhost:3000/bookings
 * - Cards: http://localhost:3001/cards
 * 
 * Provides timeout resilience and graceful offline/Vercel fallback to ensure
 * production deployments don't crash when backend micro-servers are not reachable.
 */

import initialFlights from "../data/flights.json"
import initialBookings from "../data/bookings.json"
import initialCards from "../data/cards.json"

const FLIGHTS_API = import.meta.env.VITE_FLIGHTS_API || "http://localhost:3002/flights"
const BOOKINGS_API = import.meta.env.VITE_BOOKINGS_API || "http://localhost:5000/bookings"
const CARDS_API = import.meta.env.VITE_CARDS_API || "http://localhost:3001/cards"

const REQUEST_TIMEOUT_MS = 3000

const safeFetch = async (url, options = {}) => {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(id)
    return res
  } catch (err) {
    clearTimeout(id)
    throw err
  }
}

// -------------------------------------------------------------
// LOCAL FALLBACK STORAGE HELPERS
// -------------------------------------------------------------
const getFallback = (key, defaultData) => {
  try {
    const item = localStorage.getItem(`skyroute_${key}`)
    if (item) return JSON.parse(item)
  } catch (e) {
    console.warn(`Error reading ${key} from storage:`, e)
  }
  return defaultData
}

const setFallback = (key, data) => {
  try {
    localStorage.setItem(`skyroute_${key}`, JSON.stringify(data))
  } catch (e) {
    console.warn(`Error writing ${key} to storage:`, e)
  }
}

// -------------------------------------------------------------
// FLIGHTS API
// -------------------------------------------------------------
export const getFlights = async () => {
  try {
    const res = await safeFetch(FLIGHTS_API)
    if (res.ok) {
      const data = await res.json()
      return Array.isArray(data) ? data : data.flights || []
    }
  } catch {
    // Network or server error - use fallback data
  }
  const defaultList = Array.isArray(initialFlights) ? initialFlights : initialFlights.flights || []
  return getFallback("flights", defaultList)
}

// -------------------------------------------------------------
// BOOKINGS API
// -------------------------------------------------------------
export const getBookings = async () => {
  try {
    const res = await safeFetch(BOOKINGS_API)
    if (res.ok) {
      const data = await res.json()
      return Array.isArray(data) ? data : data.bookings || []
    }
  } catch {
    // Fallback to secondary port or localStorage
    try {
      const altRes = await safeFetch("http://localhost:3000/bookings")
      if (altRes.ok) {
        const data = await altRes.json()
        return Array.isArray(data) ? data : data.bookings || []
      }
    } catch {
      // Backend not running
    }
  }
  const defaultList = Array.isArray(initialBookings) ? initialBookings : initialBookings.bookings || []
  return getFallback("bookings", defaultList)
}

export const createBooking = async (bookingData) => {
  const payload = {
    ...bookingData,
    id: bookingData.id || ("bk_" + Date.now().toString(36)),
    bookedAt: bookingData.bookedAt || new Date().toISOString(),
  }

  try {
    const res = await safeFetch(BOOKINGS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      const saved = await res.json()
      // sync local
      const current = await getBookings()
      setFallback("bookings", [saved, ...current])
      return saved
    }
  } catch {
    // Backend offline
  }

  // Update local fallback
  const current = await getBookings()
  const updated = [payload, ...current]
  setFallback("bookings", updated)
  return payload
}

export const cancelBooking = async (id) => {
  try {
    await safeFetch(`${BOOKINGS_API}/${id}`, {
      method: "DELETE",
    })
  } catch {
    // Continue with local update
  }
  const current = await getBookings()
  const filtered = current.filter((b) => b.id !== id)
  setFallback("bookings", filtered)
  return true
}

export const rescheduleBooking = async (id, newDate) => {
  try {
    await safeFetch(`${BOOKINGS_API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ departDate: newDate }),
    })
  } catch {
    // Continue with local update
  }
  const current = await getBookings()
  const updated = current.map((b) => (b.id === id ? { ...b, departDate: newDate } : b))
  setFallback("bookings", updated)
  return updated.find((b) => b.id === id)
}

// -------------------------------------------------------------
// CARDS API
// -------------------------------------------------------------
export const getCards = async () => {
  try {
    const res = await safeFetch(CARDS_API)
    if (res.ok) {
      const data = await res.json()
      return Array.isArray(data) ? data : data.cards || []
    }
  } catch {
    // Backend offline
  }
  const defaultList = Array.isArray(initialCards) ? initialCards : initialCards.cards || []
  return getFallback("cards", defaultList)
}

export const addCard = async (cardData) => {
  const current = await getCards()
  const newCard = {
    ...cardData,
    id: cardData.id || ("cd_" + Date.now().toString(36)),
    isDefault: cardData.isDefault ?? current.length === 0,
  }

  try {
    const res = await safeFetch(CARDS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCard),
    })
    if (res.ok) {
      const saved = await res.json()
      setFallback("cards", [...current, saved])
      return saved
    }
  } catch {
    // Backend offline
  }

  const updated = [...current, newCard]
  setFallback("cards", updated)
  return newCard
}

export const setDefaultCard = async (id) => {
  const current = await getCards()
  const updated = current.map((c) => ({
    ...c,
    isDefault: c.id === id,
  }))

  try {
    await Promise.all(
      updated.map((c) =>
        safeFetch(`${CARDS_API}/${c.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isDefault: c.isDefault }),
        })
      )
    )
  } catch {
    // Backend offline
  }

  setFallback("cards", updated)
  return updated
}

export const deleteCard = async (id) => {
  try {
    await safeFetch(`${CARDS_API}/${id}`, {
      method: "DELETE",
    })
  } catch {
    // Backend offline
  }
  const current = await getCards()
  const filtered = current.filter((c) => c.id !== id)
  setFallback("cards", filtered)
  return true
}
