import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/ContextoUsuario';

const RutaProtegida = ({ children, allowedTypes }) => {
    const { userType } = useUser();

    if (userType === null) {
        return <Navigate to="/Error" />; // Mostrar un mensaje mientras se carga el tipo de usuario
    }

    if (!allowedTypes.includes(userType)) {
        return <Navigate to="/Error" />; // Redirigir si el usuario no tiene acceso
    }

    return children; // Renderizar el contenido si el usuario tiene el tipo correcto
};

export default RutaProtegida;
