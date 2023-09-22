import React from 'react';
import { Navigate } from 'react-router-dom';

function RouteGuard({ role, allowedRoles, children }) {
  if (allowedRoles.includes(role)) {
    return children;
  } else {
    // Redirect to a restricted access page or home page
    return <Navigate to="/restricted" />;
  }
}

export default RouteGuard;