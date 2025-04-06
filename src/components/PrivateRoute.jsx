import {
  Navigate,
} from "react-router-dom";

const isAuthenticated = false;

const PrivateRoute = ({ children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;