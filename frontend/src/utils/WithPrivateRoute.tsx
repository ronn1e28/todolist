import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface WithPrivateRouteProps {
  children: React.ReactElement;
}

const WithPrivateRoute: React.FC<WithPrivateRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();

  // If there is a current user it will render the passed down component
  if (currentUser) {
    return children;
  }

  // Otherwise redirect to the login route
  return <Navigate to="/login" />;
};

export default WithPrivateRoute;
