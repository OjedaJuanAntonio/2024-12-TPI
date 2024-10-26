import React from 'react';
import EventlistMain from '../events/EventlistMain';
import Map from '../../Map';
import AutoPlay from '../sculptors/SculptorslistMain';
import { Mainvideo1 ,Mainvideo2 } from './Mainvideos';


const Main = () => (
    <>
        <Mainvideo1/>
        <Map/>
        <EventlistMain />
        <Mainvideo2/>
        <AutoPlay/>
    </>
);

export default Main;
