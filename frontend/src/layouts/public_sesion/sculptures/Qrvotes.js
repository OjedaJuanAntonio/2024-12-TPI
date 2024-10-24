import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el ID de la URL
import { db } from '../../../Firebase'; 
import { doc, getDoc } from 'firebase/firestore';
import { Box, Heading, Text, Image, Button, Stack } from '@chakra-ui/react';
import Starranking from './Starranking';

function Votacion() {
    const { esculturaId } = useParams(); // Obtén el ID de la URL desde el QR
    const [escultura, setEscultura] = useState(null);
    const [rating, setRating] = useState(0);
    const [voted, setVoted] = useState(false); // Para verificar si ya votó

    useEffect(() => {
        const obtenerEscultura = async () => {
            const docRef = doc(db, "Esculturas", esculturaId); 
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setEscultura(docSnap.data());
            } else {
                console.log("No se encontró la escultura");
            }
        };

        obtenerEscultura();
    }, [esculturaId]);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        setVoted(true); // Marcamos que el usuario ya votó
        console.log(`Calificación para ${esculturaId}: ${newRating}`);
        // Aquí puedes añadir la lógica para guardar la calificación en la base de datos
    };

    if (!escultura) {
        return <Text>Cargando escultura...</Text>;
    }

    return (
        <Box textAlign="center" p={4}>
            <Heading>{escultura.first_name}</Heading>
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
                <Text fontSize="lg">{escultura.info}</Text>

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
