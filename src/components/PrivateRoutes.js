import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export default function PrivateRoutes({ Component }) {
    const { user} = useAuthContext()
    
    // Check if the user has the 'admin' role
    const isAdmin = user.role.includes('admin')

    // console.log("user on provate route", user)
    if (!isAdmin) {
        return <Navigate to='/' />
    }

    return (
        <Component />
    )
}
