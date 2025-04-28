import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  const expiresAt = Number(localStorage.getItem("expires_at"));

  const isTokenValid = token && Date.now() < expiresAt;

  return isTokenValid ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
