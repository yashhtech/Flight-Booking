import { Bell, LogOut, Plane } from "lucide-react"
import { useState } from "react"

const TopHeader = () => {
  const [hasNotification, setHasNotification] = useState(true)

  const logout = () => {
    const user = JSON.parse(localStorage.getItem("flightUser"))

    localStorage.setItem(
      "flightUser",
      JSON.stringify({
        ...user,
        isLoggedIn: false
      })
    )

    window.location.href = "/signin"
  }

  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">

      {/* LOGO */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
          <Plane className="text-white" size={20} />
        </div>
        <h1 className="text-xl font-bold text-gray-800">
          Sky<span className="text-blue-600">Route</span>
        </h1>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-6">

        {/* NOTIFICATION */}
        <button
          onClick={() => setHasNotification(false)}
          className="relative"
        >
          <Bell className="text-gray-600" size={22} />

          {hasNotification && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          )}
        </button>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition font-medium"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </header>
  )
}

export default TopHeader
