import React, { useEffect, useState } from 'react';
import { SimpleGrid, Spinner, Center, Text } from '@chakra-ui/react';
import Eventcard from './Eventcard';
import FilterBar from '../sculptures/FiltterBar';
import Map from '../../Map';

function Allevents() {
    const [eventos, setEventos] = useState([]); // Estado para los eventos
    const [isLoading, setIsLoading] = useState(true); // Estado para la carga
    const [error, setError] = useState(null); // Estado para manejar errores
    const [filteredEventos, setFilteredEventos] = useState([]); // Eventos filtrados
    const [addCalendar, setAddCalendar] = useState(true); 

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await fetch('http://localhost:8000/eventos/');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setEventos(data); // Guarda los eventos obtenidos
                setFilteredEventos(data); // Inicializa los eventos filtrados
            } catch (err) {
                setError(err.message); // Maneja el error
            } finally {
                setIsLoading(false); // Detiene la carga
            }
        };

        fetchEventos(); // Llama a la función de fetch
    }, []);

  
   
    const handleFilterChange = (type, value) => {
        if (type === 'fecha') {
            const today = new Date();
            const todayStr = today.toISOString().split('T')[0];

    
            const filtered = eventos.filter((evento) => {
                const fin = evento.fecha_fin.trim(); // Asegura que no haya espacios

    
                if (value === 'Hoy') {
                    const condition = fin >= todayStr && fin <= todayStr;
                    return condition;
                }
    
                if (value === 'Mañana') {
                    const tomorrow = new Date(today);
                    tomorrow.setDate(today.getDate() + 1);
                    const tomorrowStr = tomorrow.toISOString().split('T')[0];
   
    
                    const condition = fin === tomorrowStr;

                    return condition;
                }
    
                if (value === 'Esta semana') {
                    const weekEnd = new Date(today);
                    weekEnd.setDate(today.getDate() + 7);
                    const weekEndStr = weekEnd.toISOString().split('T')[0];

    
                    const condition = fin >= todayStr && fin <= weekEndStr;
                  
                    return condition;
                }
    
                if (value === 'Esta Edicion (2024)') {
                    const finAnio = new Date(fin).getFullYear();
                    const condition = finAnio === 2024;

                    setAddCalendar(true);
                    return condition;
                }
    
                if (value === 'Otras Ediciones') {
                    const finAnio = new Date(fin).getFullYear();
                    const condition = finAnio < 2024;
         
                    setAddCalendar(false);
                    return condition;
                }
    
                return true; // Si no coincide con ninguno, no filtra
            });

            setFilteredEventos(filtered);
        } else {

            setFilteredEventos(eventos); // Reinicia los filtros si no se trata de fechas
        }
    };
    
    
    

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
        <>
            <FilterBar onFilterChange={handleFilterChange} />
            <SimpleGrid spacing={4} templateColumns="repeat(auto-fit, minmax(300px, 1fr))" p={4}>
                {filteredEventos.map((evento) => (
                   <Eventcard key={evento.id} evento={evento} addCalendar={addCalendar} />
                ))}
            </SimpleGrid>
            <Map/>
        </>
    );
}

export default Allevents;
