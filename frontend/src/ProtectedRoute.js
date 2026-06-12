import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // Force direct navigation dropback if auth keys are missing
    return <Navigate to="/login" replace />;
  }

  return children;
}
