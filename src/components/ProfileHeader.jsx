import { useState } from "react"
import { Mail, Phone, Pencil } from "lucide-react"

const ProfileHeader = ({ user, setUser }) => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(user)

  const handleSave = () => {
    localStorage.setItem("flightUser", JSON.stringify({
      ...form,
      isLoggedIn: true
    }))
    setUser(form)
    setOpen(false)
  }

  const initials = user.fullName
    ?.split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()

  return (
    <>
      {/* HEADER CARD */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-center shadow-xl">

        {/* LEFT */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-bold">
            {initials}
          </div>

          <div>
            <h2 className="text-3xl font-bold">{user.fullName}</h2>
            <p className="opacity-90 mt-1">Frequent Traveler</p>

            <div className="flex gap-6 mt-4 text-sm flex-wrap">
              <span className="flex items-center gap-2">
                <Mail size={16} /> {user.email}
              </span>
              <span className="flex items-center gap-2">
                <Phone size={16} /> {user.phone}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <button
          onClick={() => setOpen(true)}
          className="mt-6 md:mt-0 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition"
        >
          <Pencil size={16} />
          Edit Profile
        </button>
      </div>

      {/* EDIT MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md">

            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>

            <input
              className="w-full border p-3 rounded mb-3"
              placeholder="Full Name"
              value={form.fullName}
              onChange={e => setForm({ ...form, fullName: e.target.value })}
            />

            <input
              className="w-full border p-3 rounded mb-3"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />

            <input
              className="w-full border p-3 rounded mb-4"
              placeholder="Phone"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default ProfileHeader
