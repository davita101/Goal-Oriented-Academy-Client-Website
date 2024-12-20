import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

  // if (!currentUser) {
  //   return <Navigate to="/login" />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;