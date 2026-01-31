import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("flightUser"));

  if (!user || user.isLoggedIn === false) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
