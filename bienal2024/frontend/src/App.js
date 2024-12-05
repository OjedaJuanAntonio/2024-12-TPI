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
import UserRegister from './layouts/private_sesion/AdminRegister';
import Podium from './layouts/private_sesion/Podio';
import Allevents from './layouts/public_sesion/events/Allevents';
import Sculpturelist from './layouts/public_sesion/sculptures/Sculpturelist';
import Votacion from './layouts/public_sesion/sculptures/Qrvotes';
import TabletView from './layouts/public_sesion/sculptors/TabletID';
import QrExpirado from './layouts/public_sesion/user_profile/QrExpirado';
import Sculpture_register from './layouts/private_sesion/Sculpture_management/ScuptureRegister'
import EditSculptureManager from './layouts/private_sesion/Sculpture_management/EditSculpure';
import DeleteSculptureManager from './layouts/private_sesion/Sculpture_management/DeleteSculpture';
import Sculptor_register from './layouts/private_sesion/Sculptor_management/SculptorRegister';
import EditSculptorManager from './layouts/private_sesion/Sculptor_management/EditSculptor';
import DeleteSculptorManager from './layouts/private_sesion/Sculptor_management/DeleteSculptor';
import SculptorSculptureList from './layouts/private_sesion/Sculpture_management/SculptureQR';
import GestionarEventos from './layouts/private_sesion/Event_management/EventPanel';
import EditEventManager from './layouts/private_sesion/Event_management/Edit_Event';
import EventRegister from './layouts/private_sesion/Event_management/Register_event';
import DeleteEventManager from './layouts/private_sesion/Event_management/Delete_event';













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
           
                <Route path="/admin/escultores" element={<RutaProtegida allowedTypes={['admin_escultores', 'superuser']}><GestionarEscultores /></RutaProtegida>}/>
                <Route path="/escultores/add" element={<RutaProtegida allowedTypes={['admin_escultores', 'superuser']}><Sculptor_register/></RutaProtegida>}/>
                <Route path="/escultores/edit" element={<RutaProtegida allowedTypes={['admin_escultores', 'superuser']}><EditSculptorManager/></RutaProtegida>}/>
                <Route path="/escultores/delete" element={<RutaProtegida allowedTypes={['admin_escultores', 'superuser']}><DeleteSculptorManager/></RutaProtegida>}/>

                <Route path="/admin/esculturas" element={ <RutaProtegida allowedTypes={['admin_esculturas', 'superuser']}><GestionarEsculturas /> </RutaProtegida>}/>
                <Route path="/esculturas/add" element={ <RutaProtegida allowedTypes={['admin_esculturas', 'superuser']}><Sculpture_register/></RutaProtegida>}/>
                <Route path="/esculturas/edit" element={ <RutaProtegida allowedTypes={['admin_esculturas', 'superuser']}><EditSculptureManager/></RutaProtegida>}/>
                <Route path="/esculturas/delete" element={ <RutaProtegida allowedTypes={['admin_esculturas', 'superuser']}><DeleteSculptureManager/></RutaProtegida>}/>
                <Route path="/esculturas/bienal2024" element={ <RutaProtegida allowedTypes={['admin_esculturas', 'superuser']}><SculptorSculptureList/></RutaProtegida>}/>

                <Route path="/admin/eventos" element={ <RutaProtegida allowedTypes={['admin_eventos', 'superuser']}><GestionarEventos/></RutaProtegida>}/>
                <Route path="/eventos/add" element={ <RutaProtegida allowedTypes={['admin_eventos', 'superuser']}><EventRegister/></RutaProtegida>}/>
                <Route path="/eventos/edit" element={ <RutaProtegida allowedTypes={['admin_eventos', 'superuser']}><EditEventManager/></RutaProtegida>}/>
                <Route path="/eventos/delete" element={ <RutaProtegida allowedTypes={['admin_eventos', 'superuser']}><DeleteEventManager/></RutaProtegida>}/>
                

               








                <Route
                    path="/admin/eventos"
                    element={
                        <RutaProtegida allowedTypes={['admin_eventos', 'superuser']}>
                            {/* Aquí tu componente de gestión de eventos */}
                        </RutaProtegida>
                    }
                />


                <Route path="/admin/top3" element={ <RutaProtegida allowedTypes={['superuser']}> <Podium /></RutaProtegida>}/>
                <Route path="/admin/addAdm" element={ <RutaProtegida allowedTypes={['superuser']}><UserRegister /> </RutaProtegida>}/>

                {/* Ruta de error
                <Route path="/Error" element={<Error />} /> */}
            </Routes>
            <Footerr />
        </>
    );
}

export default App;
