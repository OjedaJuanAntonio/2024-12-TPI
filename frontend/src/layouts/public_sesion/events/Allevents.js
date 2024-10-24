import React from 'react';
import { SimpleGrid, Card, CardBody } from '@chakra-ui/react';
import { useLocation } from "react-router-dom";
import Eventcard from './Eventcard'; // Asegúrate de que la ruta sea correcta

function Allevents() {
    const location = useLocation();
    const eventos = location.state?.eventos || []; // Accedemos al array de eventos

    return (
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
            {eventos.map((evento) => (
                <Card key={evento.id} className="animate__animated animate__zoomIn">
                    <CardBody>
                        <Eventcard evento={evento} />
                    </CardBody>
                </Card>
            ))}
        </SimpleGrid>
    );
}

export default Allevents;
