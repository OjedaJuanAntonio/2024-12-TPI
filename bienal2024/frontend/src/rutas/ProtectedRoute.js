import React from '@react';
import { Navigate } from '@react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ children, allowedTypes }) => {
    const { userType } = useUser();

    if (userType === null) {
        return <Navigate to="/Error" />; ; 
    }

    if (!allowedTypes.includes(userType)) {
        return <Navigate to="/Error" />; 
    }

    return children; 
};

export default ProtectedRoute;


