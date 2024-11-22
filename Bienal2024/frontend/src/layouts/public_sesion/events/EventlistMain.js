import React, { useEffect, useState } from 'react'; 
import 'swiper/css';
import 'swiper/css/pagination';
import {SwipperEventcardList} from '../Swippers'
import { ClockLoader } from 'react-spinners';
import { Box } from "@chakra-ui/react";




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
        return (
          <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
            <ClockLoader />
          </Box>
        );
      }

    return (
        <>
            <SwipperEventcardList evento={evento} />
        </>
    );
}

export default EventlistMain;