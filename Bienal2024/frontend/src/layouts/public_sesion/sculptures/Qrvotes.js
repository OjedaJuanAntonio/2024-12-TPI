import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el ID de la URL
import { Box, Heading, Text, Image, Button, Stack } from '@chakra-ui/react';
import Starranking from './Starranking';
import axios from 'axios';

import { db } from '../../../Firebase'; 
import { doc, getDoc } from 'firebase/firestore';

function Votacion() {
    const { esculturaId } = useParams(); // Obtén el ID de la URL desde el QR
    const [escultura, setEscultura] = useState(null);
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [voted, setVoted] = useState(false); // Para verificar si ya votó

    useEffect(() => {
        const obtenerEscultura = async () => {
            const docRef = await axios.get('http://127.0.0.1:8000/escultores/obt_escult/'); 
            const docSnap = docRef.data.map(escultura => ({ id: escultura.ID_Escultura, ...escultura }));
            // setEscultura(docSnap);
            //     setLoading(false);
            // };
        obtenerEscultura();
    }});

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        setVoted(true); // Marcamos que el usuario ya votó
        console.log(`Calificación para ${escultura}: ${newRating}`);
        // Aquí puedes añadir la lógica para guardar la calificación en la base de datos
    };

    if (!escultura) {
        return <Text>Cargando escultura...</Text>;
    }
    return (
        <Box textAlign="center" p={4}>
            <Heading>{escultura.Titulo}</Heading>
            <Stack mt={4} align="center">
                {/* Imagen de la escultura */}
                <Image 
                    src={escultura.Img} 
                    alt={`Imagen de la escultura ${escultura.first_name}`} 
                    boxSize="300px" 
                    objectFit="cover" 
                    borderRadius="lg"
                />

                {/* Información de la escultura */}
                <Text fontSize="lg">{escultura.Intencion}</Text>

                <Box mt={4}>
                    {voted ? (
                        <Text fontSize="lg" fontWeight="bold">¡Gracias por votar!</Text>
                    ) : (
                        <>
                            <Text fontSize="lg">Vota por esta escultura:</Text>
                            <Starranking onRatingChange={handleRatingChange} />
                        </>
                    )}
                </Box>
            </Stack>
        </Box>
    );
}

export default Votacion;
