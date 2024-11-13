import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import { Box } from '@chakra-ui/react';
import { HashLoader } from 'react-spinners';
import { useAuth0 } from '@auth0/auth0-react';

import Main from './layouts/public_sesion/main/Main';
import Addnew from './layouts/public_sesion/login_form/Addnew';
import SculptorProfile from './layouts/public_sesion/sculptors/SculptorProfile';
import Navbar from './layouts/public_sesion/Navbar';
import Footerr from './layouts/public_sesion/Footerr';
import Allevents from './layouts/public_sesion/events/Allevents';
import Sculpturelist from './layouts/public_sesion/sculptures/Sculpturelist';
import Votacion from './layouts/public_sesion/sculptures/Qrvotes';
// import './utils/non_pasive_event_listeners';

function App() {
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer); 
    }, []);

    if (loading) {
        return (
            <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
                <HashLoader />
            </Box>
        );
    }

    return (
        <BrowserRouter>

            <Navbar />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/createAccount" element={<Addnew />} />
                <Route path="/escultor/:id" element={<SculptorProfile />} />
                <Route path="/esculturas" element={<Sculpturelist/>} />
                <Route path="/actividades" element={<Allevents/>} />
                <Route path="/votar/:id" element={<Votacion />} />
                    </Routes>
                    <Footerr />
        </BrowserRouter>
    );
}

export default App;
