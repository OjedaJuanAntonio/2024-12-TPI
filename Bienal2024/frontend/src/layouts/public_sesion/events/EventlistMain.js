import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { SwipperEventcardList } from '../Swippers';
import axios from 'axios';

function EventlistMain() {
    const [evento, setEventos] = useState([]);


    useEffect(() => {
        const obtenerEventos = async () => {
            const consulta = await axios.get('http://127.0.0.1:8000/eventos/');
            const listaEventos = consulta.data.map(evento => ({id: evento.id, ...evento }));
            setEventos(listaEventos);
        }; 
      obtenerEventos(); }, []);

    return (
      <>
        <SwipperEventcardList evento={evento}/>

      </>
    );
}

export default EventlistMain;
