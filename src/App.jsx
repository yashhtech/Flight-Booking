import { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"
import ErrorBoundary from "./components/ErrorBoundary"
import ProtectedRoute from "./components/ProtectedRoute"

const Home = lazy(() => import("./pages/Home"))
const About = lazy(() => import("./pages/About"))
const Offers = lazy(() => import("./pages/Offers"))
const Destinations = lazy(() => import("./pages/Destinations"))
const Signin = lazy(() => import("./pages/Signin"))
const Signup = lazy(() => import("./pages/Signup"))
const Contact = lazy(() => import("./pages/Contact"))
const Profile = lazy(() => import("./pages/Profile"))
const BookingConfirmed = lazy(() => import("./pages/BookingConfirmed"))
const SeatSelection = lazy(() => import("./pages/SeatSelection"))
const NotFound = lazy(() => import("./pages/NotFound"))

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-900 text-sky-400">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm font-semibold tracking-wider text-slate-300">PREPARING FOR TAKEOFF...</p>
    </div>
  </div>
)

const App = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth Pages */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seats"
            element={
              <ProtectedRoute>
                <SeatSelection />
              </ProtectedRoute>
            }
          />
          <Route path="/booking-confirmed" element={<BookingConfirmed />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
