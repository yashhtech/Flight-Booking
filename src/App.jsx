import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Offers from "./pages/Offers"
import Destinations from "./pages/Destinations"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Contact from "./pages/Contact"
import Profile from "./pages/Profile"
import SeatSelection from "./pages/SeatSelection"
import Passengers from "./pages/Passengers"
import BookingConfirmed from "./pages/BookingConfirmed"
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth Pages */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
        <Route path="/seats/:flightId" element={<ProtectedRoute><SeatSelection /></ProtectedRoute> }/>
        <Route path="/passengers" element={<Passengers />} />
        <Route path="/booking-confirmed" element={<BookingConfirmed />} />



      </Routes>
    
  )
}

export default App
