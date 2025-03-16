import React from 'react';
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

export default function PrivateAuthRoutes({ Component }) {
    const user = useSelector(store => store.authSlice.user)

    // If user is logged in, redirect to dashboard
    if (user) {
        return <Navigate to="/" replace />;
    }

    return <Component />;

}
