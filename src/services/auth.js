/**
 * Secure frontend authentication and session helper.
 * Provides safe localStorage parsing, input sanitization, and SHA-256 client-side password hashing.
 */

const STORAGE_KEY = "flightUser"

/**
 * Safely retrieves user from localStorage without throwing JSON parse exceptions.
 */
export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return typeof parsed === "object" && parsed !== null ? parsed : null
  } catch (err) {
    console.error("Failed to parse user storage:", err)
    return null
  }
}

/**
 * Safely persists user to localStorage.
 */
export const setStoredUser = (user) => {
  try {
    if (!user) {
      localStorage.removeItem(STORAGE_KEY)
      return
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } catch (err) {
    console.error("Failed to save user storage:", err)
  }
}

/**
 * Client-side cryptographic hash using Web Crypto API SHA-256.
 */
export const hashPassword = async (password) => {
  if (!password) return ""
  try {
    if (window.crypto && window.crypto.subtle) {
      const msgBuffer = new TextEncoder().encode(password)
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgBuffer)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    }
  } catch (err) {
    console.warn("Crypto API unavailable, falling back to simple hash:", err)
  }
  // Fallback simple hash for older environments
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0
  }
  return "h_" + Math.abs(hash).toString(16)
}

/**
 * Verify plaintext password matches stored password or hash
 */
export const verifyPassword = async (inputPassword, storedPassword) => {
  if (!inputPassword || !storedPassword) return false
  if (inputPassword === storedPassword) return true
  const hashedInput = await hashPassword(inputPassword)
  return hashedInput === storedPassword
}

/**
 * Check if the user is authenticated
 */
export const isAuthenticated = () => {
  const user = getStoredUser()
  return Boolean(user && user.isLoggedIn)
}

/**
 * Perform safe logout
 */
export const logoutUser = () => {
  const user = getStoredUser()
  if (user) {
    setStoredUser({ ...user, isLoggedIn: false })
  }
}
