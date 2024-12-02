import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'; 
import { Box } from '@chakra-ui/react';
import { HashLoader } from 'react-spinners';
import SculptorProfile from './layouts/public_sesion/sculptors/SculptorProfile';
import Navbar from './layouts/public_sesion/Navbar';
import Footerr from './layouts/public_sesion/Footerr';
import Allevents from './layouts/public_sesion/events/Allevents';
import Sculpturelist from './layouts/public_sesion/sculptures/Sculpturelist';
import Votacion from './layouts/public_sesion/sculptures/Qrvotes';
import GestionarEscultores from './layouts/private_sesion/Sculptor_management/SculptorPanel';
import SculptorRegister from './layouts/private_sesion/Sculptor_management/SculptorRegister';
import ScuptureRegister from './layouts/private_sesion/Sculpture_management/ScuptureRegister';
import MainComponent from './layouts/public_sesion/Prueba';
import TabletView from './layouts/public_sesion/sculptors/TabletID';
import QrExpirado from './layouts/public_sesion/user_profile/QrExpirado';
import Error from './layouts/Error';
import Main from './layouts/public_sesion/main/Main';
import EditEventManager from "./layouts/private_sesion/Event_management/Edit_Event"
import DeleteEventManager from "./layouts/private_sesion/Event_management/Delete_event"
import EventRegister from "./layouts/private_sesion/Event_management/Register_event"
import SculptureAllList from "./layouts/private_sesion/Allsculptures"
import Podium from './layouts/private_sesion/Podio';
import UserRegister from './layouts/private_sesion/AdminRegister'
import EditSculptorManager from './layouts/private_sesion/Sculptor_management/EditSculptor'
import GestionarEventos from './layouts/private_sesion/Event_management/EventPanel'
import GestionarEsculturas  from './layouts/private_sesion/Sculpture_management/SculpturePanel';
import EditSculptureManager from './layouts/private_sesion/Sculpture_management/EditSculpure';
import DeleteSculptorManager from './layouts/private_sesion/Sculptor_management/DeleteSculptor';
import DeleteSculptureManager from './layouts/private_sesion/Sculpture_management/DeleteSculpture';
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
    const hideNavbarAndFooter = location.pathname === "/tabletview" || location.pathname === '/Qr/expirado' || location.pathname === '/error';

    return (
        <>
            {!hideNavbarAndFooter && <Navbar />}
            <Routes>
                <Route path="/2/:currentUrl" element={<MainComponent />} />
                <Route path="/" element={<Main />} />
                <Route path="/escultor/:id" element={<SculptorProfile />} />
                <Route path="/esculturas" element={<Sculpturelist />} />
                <Route path="/actividades" element={<Allevents />} />
                <Route path="/votar/:id" element={<Votacion />} />
                <Route path='/admin/escultores' element={<GestionarEscultores />} />
                <Route path='/admin/esculturas' element={<GestionarEsculturas />} />
                <Route path='/esculturas/delete' element={<DeleteSculptureManager />} />
                <Route path='/admin/eventos' element={<GestionarEventos />} />
                <Route path='/escultores/delete' element={<DeleteSculptorManager />} />
                <Route path='/escultores/edit' element={<EditSculptorManager />} />
                <Route path='/esculturas/edit' element={<EditSculptureManager />} />
                <Route path='/escultores/add' element={<SculptorRegister />} />
                <Route path='/esculturas/add' element={<ScuptureRegister />} />
                <Route path="/tabletview/:id" element={<TabletView />} /> 
                <Route path='/Qr/expirado' element={ <QrExpirado/>}/>
                <Route path='/error' element={<Error/>}/>
                <Route path='/eventos/edit' element={<EditEventManager/>}/>
                <Route path='/eventos/delete' element={<DeleteEventManager/>}/>
                <Route path='/eventos/add' element={<EventRegister/>}/>
                <Route path='/Todas/esculturas' element={<SculptureAllList/>}/>
                <Route path='/11' element={<Podium/>}/>
                <Route path='/Admin/addAdm' element={<UserRegister/>}/>
            </Routes>
            {!hideNavbarAndFooter && <Footerr />}
        </>
    );
}

export default App;
