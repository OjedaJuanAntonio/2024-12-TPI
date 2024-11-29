import React, { useEffect, useState } from 'react';
import { SimpleGrid, Spinner, Center, Text } from '@chakra-ui/react';
import Eventcard from './Eventcard';

function Allevents() {
    const [eventos, setEventos] = useState([]); // Estado para los eventos
    const [isLoading, setIsLoading] = useState(true); // Estado para la carga
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await fetch('http://localhost:8000/eventos/');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setEventos(data); // Guarda los eventos obtenidos
            } catch (err) {
                setError(err.message); // Maneja el error
            } finally {
                setIsLoading(false); // Detiene la carga
            }
        };

        fetchEventos(); // Llama a la función de fetch
    }, []); // Solo se ejecuta una vez al montar el componente

    if (isLoading) {
        return (
            <Center h="100vh">
                <Spinner size="xl" />
            </Center>
        );
    }

    if (error) {
        return (
            <Center h="100vh">
                <Text color="red.500">Error: {error}</Text>
            </Center>
        );
    }

    return (
        <SimpleGrid 
            spacing={4} 
            templateColumns="repeat(auto-fit, minmax(300px, 1fr))" 
            p={4} 
        >
            {eventos.map((evento) => (
                <Eventcard key={evento.id} evento={evento} />
            ))}
        </SimpleGrid>
    );
}

export default Allevents;
