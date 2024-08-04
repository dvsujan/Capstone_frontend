import React, { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, setRedirectPath } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      setRedirectPath(location.pathname);
    }
  }, [isLoggedIn, location.pathname, setRedirectPath]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

