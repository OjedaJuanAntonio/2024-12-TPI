import React, { useEffect, useState } from 'react'; 
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import {SwipperEventcardList} from '../Swippers'

function EventlistMain() {
    const [evento, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerEventos = async () => {
            try {
                const response = await fetch('http://localhost:8000/eventos/');
                if (!response.ok) {
                    throw new Error('Error al obtener los eventos');
                }
                const data = await response.json();
                console.log(data); // Verifica la respuesta de la API
                setEventos(data || []);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };
  
        obtenerEventos();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <SwipperEventcardList evento={evento} />
        </>
    );
}

export default EventlistMain;