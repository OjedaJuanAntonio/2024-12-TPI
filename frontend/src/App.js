import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Asegúrate de que BrowserRouter se importa solo una vez
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
import Main from './layouts/public_sesion/Main';
import Addnew from './layouts/public_sesion/login_form/Addnew';

function App() {
    return (
        <BrowserRouter>
            <ChakraProvider>
                <Auth0Provider 
                    domain={process.env.REACT_APP_AUTH0_DOMAIN} 
                    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}  
                    authorizationParams={{ redirect_uri: window.location.origin }}>
                    <Routes>
                        <Route path="/" element={<Main />} /> 
                        <Route path="/createAccount" element={<Addnew />} /> 
                    </Routes>
                </Auth0Provider>
            </ChakraProvider>
        </BrowserRouter>
    );
}

export default App;
