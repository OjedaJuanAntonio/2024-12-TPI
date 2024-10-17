import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Main from './layouts/public_sesion/main/Main';
import Addnew from './layouts/public_sesion/login_form/Addnew';
import SculptorProfile from './layouts/public_sesion/sculptors/SculptorProfile';
import Navbar from './layouts/public_sesion/Navbar';
import Footerr from './layouts/public_sesion/Footerr';
import Esculturas from './layouts/public_sesion/sculptures/Esculturas';
import { HashLoader } from 'react-spinners';

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {setLoading(false);   }, 1500);
        return () => clearTimeout(timer); 
    }, []);

    if (loading) {
        return (
            <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
                <HashLoader  />
            </Box>
        ); 
    }

    return (
        <BrowserRouter>
            <ChakraProvider>
                <Auth0Provider 
                    domain={process.env.REACT_APP_AUTH0_DOMAIN} 
                    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}  
                    authorizationParams={{ redirect_uri: window.location.origin }}>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Main />} /> 
                        <Route path="/createAccount" element={<Addnew />} /> 
                        <Route path="/escultor/:id" element={<SculptorProfile />} />
                        <Route path="/esculturas" element={<Esculturas />} />
                    </Routes>
                    <Footerr />
                </Auth0Provider>
            </ChakraProvider>
        </BrowserRouter>
    );
}

export default App;
