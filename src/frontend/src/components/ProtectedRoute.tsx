import {useAuth} from "@src/hooks/useAuth.tsx";
import {Navigate, Outlet} from "react-router-dom";

export const ProtectedRoute = ({roles}: {
  roles?: string;
}) => {
  const {authenticated, authentication} = useAuth();

  if (!authenticated) {
    return <Navigate to="/login"/>;
  }

  if (roles && roles.length > 0) {
    const hasRole = authentication.roles?.some((role: string) => roles?.includes(role));

    if (!hasRole) {
      return <Navigate to="/403"/>;
    }
  }

  return <Outlet/>;
};