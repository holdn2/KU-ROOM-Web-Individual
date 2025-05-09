import { Outlet } from "react-router-dom";
import { AuthProvider } from "../hooks/useAuth";

const AuthWrapper = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default AuthWrapper;
