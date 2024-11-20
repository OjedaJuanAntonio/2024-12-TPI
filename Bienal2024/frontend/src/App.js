import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'; 
import { Box } from '@chakra-ui/react';
import { HashLoader } from 'react-spinners';
import Addnew from './layouts/public_sesion/login_form/Addnew';
import SculptorProfile from './layouts/public_sesion/sculptors/SculptorProfile';
import Navbar from './layouts/public_sesion/Navbar';
import Footerr from './layouts/public_sesion/Footerr';
import Allevents from './layouts/public_sesion/events/Allevents';
import Sculpturelist from './layouts/public_sesion/sculptures/Sculpturelist';
import Votacion from './layouts/public_sesion/sculptures/Qrvotes';
import Panel from './layouts/private_sesion/Panel';
import SculptorRegister from './layouts/private_sesion/SculptorRegister';
import ScuptureRegister from './layouts/private_sesion/ScuptureRegister';
import MainComponent from './layouts/public_sesion/Prueba';
import TabletView from './layouts/public_sesion/sculptors/TabletID';
import QrExpirado from './layouts/public_sesion/user_profile/QrExpirado';
import Error from './layouts/Error';
import Main from './layouts/public_sesion/main/Main';

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => { setLoading(false); }, 1500);
        return () => clearTimeout(timer); 
    }, []);

    if (loading) {
        return (
            <Box height="100vh" display="flex" justifyContent="center" alignItems="center"> <HashLoader /></Box>
        ); 
    }
    //tralade la carga de de auth0 y chackra al modulo index encargado de cargar el modulo app
    return (
        <BrowserRouter>
                    <ContentWithRouter />
        </BrowserRouter>
    );
}

function ContentWithRouter() {
    const location = useLocation();
    const hideNavbarAndFooter = location.pathname === '/tablet' || location.pathname === '/Qr/expirado' || location.pathname === '/error';

    return (
        <>
            {!hideNavbarAndFooter && <Navbar />}
            <Routes>
                <Route path="/2/:currentUrl" element={<MainComponent />} />
                <Route path="/1" element={<Main />} />
                <Route path="/createAccount" element={<Addnew />} /> 
                <Route path="/escultor/:id" element={<SculptorProfile />} />
                <Route path="/esculturas" element={<Sculpturelist />} />
                <Route path="/actividades" element={<Allevents />} />
                <Route path="/votar/:id" element={<Votacion />} />
                <Route path='/admin' element={<Panel />} />

                {/* probe este modulo y tuve inconvenientes, al parecer provenientes de Firestore */}
                <Route path='/register/scultors' element={<SculptorRegister />} />
                
                {/* Por lo que vi este componente no esta terminado */}
                <Route path='/register/sculpture' element={<ScuptureRegister />} />
                <Route path='/tablet' element={<TabletView />}/>
                <Route path='/Qr/expirado' element={ <QrExpirado/>}/>
                <Route path='/error' element={<Error/>}/>
            </Routes>
            {!hideNavbarAndFooter && <Footerr />}
        </>
    );
}

export default App;
