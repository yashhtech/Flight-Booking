import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const Settings = () => {
  const navigate = useNavigate()

  /* USER */
  const [user, setUser] = useState(null)

  /* UI STATES */
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [location, setLocation] = useState("New York, USA")

  /* PASSWORD */
  const [showPassword, setShowPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")

  /* LOAD USER */
  useEffect(() => {
    const saved = localStorage.getItem("flightUser")
    if (!saved) return navigate("/Signin")

    const parsed = JSON.parse(saved)
    if (!parsed?.email || !parsed?.password || !parsed?.isLoggedIn) {
      navigate("/Signin")
      return
    }

    setUser(parsed)
  }, [navigate])

  /* THEME */
  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  /* PASSWORD CHANGE */
  const changePassword = () => {
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters")
      return
    }

    const updated = { ...user, password: newPassword }
    localStorage.setItem("flightUser", JSON.stringify(updated))
    setUser(updated)
    setNewPassword("")
    setShowPassword(false)
    alert("Password updated successfully ✅")
  }

  /* LOGOUT */
  const logout = () => {
    localStorage.setItem(
      "flightUser",
      JSON.stringify({ ...user, isLoggedIn: false })
    )
    navigate("/Signin")
  }

  if (!user) {
    return <div className="p-10 text-center text-gray-400">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200  px-4 py-10">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* HEADER */}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray">
          Account Settings
        </h2>

        {/* CARD */}
        <div className="rounded-3xl bg-white/80  backdrop-blur-xl shadow-xl p-6 md:p-8 space-y-6">

          {/* NOTIFICATIONS */}
          <SettingRow
            title="Email Notifications"
            desc="Receive booking & flight updates"
          >
            <Toggle
              enabled={notifications}
              onClick={() => setNotifications(!notifications)}
            />
          </SettingRow>

          {/* THEME */}
          <SettingRow
            title="Appearance"
            desc="Switch between light & dark mode"
          >
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-full text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </SettingRow>

          {/* LOCATION */}
          <SettingRow
            title="Default Location"
            desc={location}
          >
            <button
              onClick={() => {
                const loc = prompt("Enter location", location)
                if (loc) setLocation(loc)
              }}
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
            >
              Change
            </button>
          </SettingRow>

          {/* PASSWORD */}
          <div className="rounded-2xl bg-slate-50 dark:bg-gray-800 p-5 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  Change Password
                </p>
                <p className="text-sm text-gray-500">
                  {user.email}
                </p>
              </div>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-indigo-600 hover:underline"
              >
                Change
              </button>
            </div>

            {showPassword && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900"
                />
                <button
                  onClick={changePassword}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
                >
                  Save
                </button>
              </motion.div>
            )}
          </div>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="w-full mt-4 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold tracking-wide transition"
          >
            Logout
          </button>

        </div>
      </motion.div>
    </div>
  )
}

/* ---------- SMALL COMPONENTS ---------- */

const SettingRow = ({ title, desc, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 dark:bg-gray-800 p-5 rounded-2xl">
    <div>
      <p className="font-semibold text-gray-800 dark:text-white">
        {title}
      </p>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
    {children}
  </div>
)

const Toggle = ({ enabled, onClick }) => (
  <button
    onClick={onClick}
    className={`w-14 h-8 rounded-full relative transition ${
      enabled ? "bg-indigo-600" : "bg-gray-400"
    }`}
  >
    <span
      className={`absolute top-1 w-6 h-6 bg-white rounded-full transition ${
        enabled ? "left-7" : "left-1"
      }`}
    />
  </button>
)

export default Settings
