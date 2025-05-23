import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function PrivateAuthRoutes({ Component }) {
    const {user} = useAuthStore()
  
    // If user is logged in, redirect to dashboard
    if (user) {
        return <Navigate to="/" replace />;
    }

    return <Component />;

}
