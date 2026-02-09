import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import bookingsData from "../../data/bookings.json"

const API = "http://localhost:4000/cards"
// const API = "http://127.0.0.1:8000/cards_list/"


const Accounts = () => {
  const [cards, setCards] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    number: "",
    holder: "",
    expiry: ""
  })

  /* 🔄 LOAD CARDS */
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        setCards(data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  /* ➕ ADD CARD */
  const handleAddCard = async () => {
    if (!form.number || !form.holder || !form.expiry) return

    const newCard = {
      ...form,
      isDefault: cards.length === 0
    }

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCard)
    })

    const saved = await res.json()
    setCards([...cards, saved])
    setForm({ number: "", holder: "", expiry: "" })
    setShowForm(false)
  }

  /* ⭐ SET DEFAULT */
  const setDefault = async (id) => {
    await Promise.all(
      cards.map(c =>
        fetch(`${API}/${c.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isDefault: c.id === id })
        })
      )
    )

    setCards(cards.map(c => ({ ...c, isDefault: c.id === id })))
  }

  /* ❌ REMOVE CARD */
  const removeCard = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" })
    // await fetch(`http://127.0.0.1:8000/cards_detail/${id}/`, { method: "DELETE" })

    setCards(cards.filter(c => c.id !== id))
  }

  /* 📦 TRANSACTIONS */
  const transactions = bookingsData.bookings || []

  return (
    <div className="p-4 md:p-8 space-y-14">

      {/* 💳 PAYMENT METHODS */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-6 shadow-xl"
      >
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <h2 className="text-2xl font-bold">Payment Methods</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-blue-700 px-6 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            + Add Card
          </button>
        </div>

        {/* ADD CARD */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
          >
            <input
              placeholder="Card Number"
              className="p-3 rounded-lg text-black"
              value={form.number}
              onChange={e => setForm({ ...form, number: e.target.value })}
            />
            <input
              placeholder="Card Holder"
              className="p-3 rounded-lg text-black"
              value={form.holder}
              onChange={e => setForm({ ...form, holder: e.target.value })}
            />
            <input
              placeholder="MM/YY"
              className="p-3 rounded-lg text-black"
              value={form.expiry}
              onChange={e => setForm({ ...form, expiry: e.target.value })}
            />

            <button
              onClick={handleAddCard}
              className="md:col-span-3 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold"
            >
              Save Card
            </button>
          </motion.div>
        )}

        {/* CARD LIST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {loading && <p>Loading cards...</p>}

          {cards.map(card => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.05 }}
              className={`rounded-2xl p-5 shadow-lg ${
                card.isDefault
                  ? "bg-emerald-500"
                  : "bg-white/20 backdrop-blur"
              }`}
            >
              <p className="tracking-widest text-lg">
                **** **** **** {card.number.slice(-4)}
              </p>
              <p className="mt-2 font-semibold">{card.holder}</p>
              <p className="text-sm">Expiry {card.expiry}</p>

              <div className="flex justify-between mt-4 text-sm">
                {!card.isDefault && (
                  <button
                    onClick={() => setDefault(card.id)}
                    className="text-yellow-300 font-semibold"
                  >
                    Make Default
                  </button>
                )}
                <button
                  onClick={() => removeCard(card.id)}
                  className="text-red-300 font-semibold"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 📄 RECENT TRANSACTIONS */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>

        <div className="space-y-4">
          {transactions.map(txn => (
            <motion.div
              key={txn.id}
              whileHover={{ scale: 1.02 }}
              className="flex justify-between items-center bg-gray-50 rounded-2xl p-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-xl font-bold">
                  ✈
                </div>
                <div>
                  <p className="font-semibold">
                    Flight {txn.flight.from} → {txn.flight.to}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(txn.bookedAt).toDateString()}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-lg">₹{txn.total}</p>
                <p className="text-green-600 text-sm font-semibold">
                  {txn.paymentStatus}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  )
}

export default Accounts
