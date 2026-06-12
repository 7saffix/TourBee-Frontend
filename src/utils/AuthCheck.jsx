import { Navigate } from "react-router";
import { useProfileQuery } from "../redux/Api/user.api";

const AuthCheck = (WrappedComponent, requiredRoles = []) => {
  return function AuthWrapper() {
    const { data, isLoading } = useProfileQuery();

    if (isLoading) {
      return (
        <div className="min-h-screen bg-background text-muted-foreground flex items-center justify-center font-mono text-xs tracking-widest uppercase">
          Authenticating Session...
        </div>
      );
    }

    const user = data?.data;

    if (!user?.email) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }

    return <WrappedComponent />;
  };
};

export default AuthCheck;
