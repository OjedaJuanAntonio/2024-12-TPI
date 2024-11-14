import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Main from './layouts/public_sesion/main/Main';
import Addnew from './layouts/public_sesion/login_form/Addnew';
import SculptorProfile from './layouts/public_sesion/sculptors/SculptorProfile';
import Navbar from './layouts/public_sesion/Navbar';
import Footerr from './layouts/public_sesion/Footerr';
import { HashLoader } from 'react-spinners';
import Allevents from './layouts/public_sesion/events/Allevents';
import Sculpturelist from './layouts/public_sesion/sculptures/Sculpturelist'
import Votacion from './layouts/public_sesion/sculptures/Qrvotes';
import Panel from './layouts/private_sesion/Panel';
import Sculptor_register from './layouts/private_sesion/Sculptor_register';
import Scupture_register from './layouts/private_sesion/Scupture_register';




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
                    domain={process.env.AUTH0_DOMAIN} 
                    clientId={process.env.AUTH0_CLIENT_ID}  
                    authorizationParams={{ redirect_uri: window.location.origin }}>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Main />} /> 
                        <Route path="/createAccount" element={<Addnew />} /> 
                        <Route path="/escultor/:id" element={<SculptorProfile />} />
                        <Route path="/esculturas" element={<Sculpturelist/>} />
                        <Route path="/actividades" element={<Allevents/>} />
                        <Route path="/votar/:id" element={<Votacion />} />
                        <Route path='/admin' element={<Panel/>}/>
                        <Route path='/register/scultors' element={<Sculptor_register/>}/>
                        <Route path='/register/sculpture' element={<Scupture_register/>}/>
                        <Route path='/panelcenter' element={<Panel/>}/>
                        
                    </Routes>
                    <Footerr />
                </Auth0Provider>
            </ChakraProvider>
        </BrowserRouter>
    );
}

export default App;
