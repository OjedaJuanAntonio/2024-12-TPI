import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'; 
import { Box } from '@chakra-ui/react';
import { HashLoader } from 'react-spinners';
import { ProvedorUsuario } from './context/ContextoUsuario';
import RutaProtegida from './rutas/RutaProtegida';
import SculptorProfile from './layouts/public_sesion/sculptors/SculptorProfile';
import Navbar from './layouts/public_sesion/Navbar';
import Footerr from './layouts/public_sesion/Footerr';
import Main from './layouts/public_sesion/main/Main';
import GestionarEscultores from './layouts/private_sesion/Sculptor_management/SculptorPanel';
import GestionarEsculturas from './layouts/private_sesion/Sculpture_management/SculpturePanel';
import Error from './layouts/public_sesion/Error';
import Allevents from './layouts/public_sesion/events/Allevents';
import Sculpturelist from './layouts/public_sesion/sculptures/Sculpturelist';
import Votacion from './layouts/public_sesion/sculptures/Qrvotes';
import TabletView from './layouts/public_sesion/sculptors/TabletID';
import QrExpirado from './layouts/public_sesion/user_profile/QrExpirado';
import GestionarEventos from './layouts/private_sesion/Event_management/EventPanel';
import SuperUserPanel from './layouts/private_sesion/SuperUser'




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

    return (
        <ProvedorUsuario>
            <BrowserRouter>
                <ContentWithRouter />
            </BrowserRouter>
        </ProvedorUsuario>
    );
}

function ContentWithRouter() {
   

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/escultor/:id" element={<SculptorProfile />} />
                <Route path="/esculturas" element={<Sculpturelist />} />
                <Route path="/actividades" element={<Allevents />} />
                <Route path="/votar/:id" element={<Votacion />} />
                <Route path="/tabletview/:id" element={<TabletView />} /> 
                <Route path='/Qr/expirado' element={ <QrExpirado/>}/>
                <Route path='/Error' element={<Error/>}/>
                <Route path="/admin/escultores" element={<RutaProtegida allowedTypes={['superuser']}><GestionarEscultores /></RutaProtegida>}/>
                <Route path="/admin/esculturas" element={ <RutaProtegida allowedTypes={['admin_esculturas']}><GestionarEsculturas /> </RutaProtegida>}/>
                <Route path="/admin/eventos" element={ <RutaProtegida allowedTypes={['admin_eventos']}><GestionarEventos/></RutaProtegida>}/>
                <Route path="/admin/superuser" element={ <RutaProtegida allowedTypes={['superuser']}> <SuperUserPanel/></RutaProtegida>}/>
            </Routes>
            <Footerr/>
        </>
    );
}

export default App;
