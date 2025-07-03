import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  isAuthenticated: boolean;
}

const ProtectedRoute = ({ children, isAuthenticated }: Props) => {
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
