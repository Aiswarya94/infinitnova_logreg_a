import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUserContext } from './UserContext';

function ProtectedRoute({ role, ...props }) {
  const { userRole } = useUserContext();

  if (userRole === role) {
    return <Route {...props} />;
  } else {
    // Redirect to a suitable page if the user's role doesn't match
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
