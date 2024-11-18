import React, { useState, useEffect } from 'react';
import { db } from '../../../Firebase'; 
import { getDocs, collection } from 'firebase/firestore';
import { SimpleGrid, Stack, Card, CardBody, Image, Heading, Text, Divider, CardFooter, Avatar, Box, Button } from '@chakra-ui/react';
import Starranking from './Starranking';
import FilterBar from './FiltterBar'; 
import HashLoader from 'react-spinners/HashLoader'; 
import 'animate.css'; 
import QRCode from 'react-qr-code'
import axios from 'axios';

function Sculpturelist() {
    const [esculturas, setEsculturas] = useState([]); 
    const [loading, setLoading] = useState(true);



    const [ratings, setRatings] = useState({});
    const [votedStatus, setVotedStatus] = useState({}); // Almacena el estado de votación por escultura
    const [showQR, setShowQR] = useState(null); // Almacena la escultura para la cual se muestra el QR
    const [timestamp, setTimestamp] = useState(Date.now()); // Estado para el timestamp del QR
    useEffect(() => {
        const obtenerEsculturas = async () => {
            setLoading(true);
            const consulta = await axios.get('http://127.0.0.1:8000/escultores/'); 
            const listaEsculturas = consulta.data.map(escultura => ({ id: escultura.ID_Escultura, ...escultura }));
            setEsculturas(listaEsculturas); 
            setLoading(false);
        };

        obtenerEsculturas(); 
    }, []); 


    const truncateText = (text, limit) => {
        if (text.length > limit) {
            return text.substring(0, limit) + '...';
        }
        return text;
    };

    const handleQRCodeClick = (esculturaId) => {
        // Muestra el QR code correspondiente a la escultura seleccionada
        setShowQR(esculturaId);
    };

    const handleRatingChange = (id, newRating) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [id]: newRating, // Guarda la calificación usando el ID
        }));
        console.log(`Nueva calificación para ${id}: ${newRating}`);
        setVotedStatus((prevStatus) => ({
            ...prevStatus,
            [id]: true, // Marca esta escultura como votada
        }));
    };



useEffect(() => {
    const interval = setInterval(() => {
        setTimestamp(Date.now()); // Actualiza el timestamp cada minuto
    }, 600); // 1 minuto = 60,000 ms

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
}, []);

    return (
        <>
            <FilterBar/>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <HashLoader color="black" />
                </Box>
            ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 ,xl:4 }} spacing={4}>
                    {esculturas.length > 0 ? (
                        esculturas.map((escultura) => (
                            <Card key={escultura.ID_Escultura} maxW='sm' className="animate__animated animate__backInUp" boxShadow='lg'>
                                <CardBody>
                                    <Box position="relative" display="inline-block">
                                        <Avatar 
                                            name={escultura.Titulo} 
                                            src={escultura.avatarUrl}  
                                            position="absolute" 
                                            top="10px" 
                                            left="10px"
                                            zIndex="1"
                                        />
                                        <Image 
                                            src={escultura.Img}  
                                            alt={escultura.first_name} 
                                            borderRadius="lg" 
                                            objectFit="cover" 
                                            width="100%"
                                            height="150px"
                                        />
                                    </Box>
                                    
                                    <Stack mt='6' spacing='3'>
                                        <Heading size='md'>{escultura.Titulo}</Heading>
                                        <Text>{truncateText(escultura.escultor_nombre, 250)}</Text>
                                        <Text>estrellas:{escultura.ranking}</Text>

                                        {/* Botón para mostrar QR */}
                                        <Button onClick={() => handleQRCodeClick(escultura.id)}>
                                            Codigo QR
                                        </Button>
                                      
                                        {/* Muestra el código QR si el usuario ha hecho clic en el botón */}
                                        {showQR === escultura.id && (
                                            <Box mt={4}>
                                                 <QRCode value={`http://localhost:3000/vote/${escultura.id}?ts=${timestamp}`} />
                                            </Box>
                                        )}
                                        
                                        {ratings[escultura.id] && (
                                            <Text fontWeight="bold">
                                                {/* Muestra el valor de la votación o un texto */}
                                            </Text>
                                        )}
                                    </Stack>
                                </CardBody>
                              
                                <CardFooter m={2}>
                                    <Box flexShrink={0}>
                                        {votedStatus[escultura.id] ? (
                                            <Text fontSize="lg" fontWeight={'bold'} mr={2}>
                                                Gracias por votar
                                            </Text>
                                        ) : (
                                            <>
                                                <Text fontSize="lg" fontWeight={'bold'} mr={2}>
                                                    Votar:
                                                </Text>
                                                <Starranking onRatingChange={(newRating) => handleRatingChange(escultura.id, newRating)} />
                                            </>
                                        )}
                                    </Box>
                                </CardFooter>
                            </Card>
                        ))
                    ) : null}
                </SimpleGrid>
            )}
        </>
    );
}

export default Sculpturelist;
