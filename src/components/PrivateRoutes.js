import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoutes({ Component }) {
    const user  = useSelector(state => state.authSlice.user)

    // Check if user 
        if (!user || !user.roles || !Array.isArray(user.roles)) {
            return <Navigate to='/' />
        }
    
        // Check if the user has the 'admin' role
        const isAdmin = user.roles.includes('admin')
    
        if (!isAdmin) { 
            return <Navigate to='/' /> 
        }

    return (
        <Component />
    )
}
