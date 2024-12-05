import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ContextoUsuario = createContext();

export const ProvedorUsuario = ({ children }) => {
    const [userType, setUserType] = useState(null);
    const { user } = useAuth0()
    const id = user?.sub;  

    useEffect(() => {
        async function fetchUserType() {
            try {
                const response = await fetch(`http://localhost:8000/usuarios/${id}`); // Ajusta según tu API
                const data = await response.json();
                setUserType(data.type_user); // Suponiendo que tu API devuelve `type_user`
            } catch (error) {
                console.error('Error fetching user type:', error);
            }
        }
        fetchUserType();
    }, []);



    return (
        <ContextoUsuario.Provider value={{ userType, setUserType }}>
            {children}
        </ContextoUsuario.Provider>
    );
};

export const useUser = () => useContext(ContextoUsuario);
