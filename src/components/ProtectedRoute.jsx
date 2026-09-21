import { Navigate, useLocation } from "react-router-dom"
import { getStoredUser } from "../services/auth"

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const user = getStoredUser()

  if (!user || !user.isLoggedIn) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
