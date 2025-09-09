
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  
  if (!loggedInUser) {
    return <Navigate to="/" />;
  }

  
  if (role && loggedInUser.role.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;