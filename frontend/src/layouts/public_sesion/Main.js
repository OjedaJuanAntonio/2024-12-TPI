import React from 'react';
import main_video from '../../assets/main_video.mp4';
import Navbar from './Navbar';
import Footerr from './Footerr';
import EventlistMain from './events/EventlistMain';
import Map from '../Map';
import AutoPlay from './sculptors/SculptorslistMain';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';


const Main = () => (
    <>
        <div style={{ position: 'relative', height: '75vh', overflow: 'hidden' }}>
            <Navbar />
            <video src={main_video} autoPlay loop muted style={{ position: 'absolute',top: 0,left: 0,width: '100%',height: '90%', objectFit: 'cover',zIndex: -1,}}/>
        </div>
        <EventlistMain/>
        <Link to="/createAccount"><Button colorScheme="teal">Crear Cuenta</Button></Link>
        <Map/>
        <AutoPlay/>
        <Footerr/>
    </>
);

export default Main;
