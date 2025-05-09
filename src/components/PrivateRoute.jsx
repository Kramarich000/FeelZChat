import { Navigate } from "react-router-dom";
import useLocalStorage from "@hooks/useLocalStorage";

const PrivateRoute = ({ children }) => {
  const [token] = useLocalStorage("access_token", null);
  const [expiresAt] = useLocalStorage("expires_at", null);

  const isTokenValid = token && Date.now() < Number(expiresAt);

  return isTokenValid ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
