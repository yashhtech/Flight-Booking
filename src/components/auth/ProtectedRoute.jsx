import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("flightUser"))

  if (!user || !user.isLoggedIn) {
    return <Navigate to="/signin" />
  }

  return children
}

export default ProtectedRoute
