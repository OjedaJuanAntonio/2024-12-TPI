import React from 'react';
import { Box, Text, Center, Avatar, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function SculptorCardMain({ escultor, showAvatar }) {
    const Escult = "Nombre de Ejemplo";
    const NombreEsc = "tipo";
    
    return (
        <Box textAlign="center" m={3} boxShadow="2xl">
            <Center pt={4}>
                <Avatar size="2xl" src={showAvatar ? undefined : escultor.photo} border="3px solid black" />
            </Center>
            <Text fontWeight="bold" fontSize="m" mt={2}>{showAvatar ?   Escult: `${escultor.nombre} ${escultor.apellido}`}</Text>
            <Text>{showAvatar ? NombreEsc : escultor.ip_address}</Text>
            {!showAvatar && (
                <Link to={`/escultor/${escultor.id}`} state={{ escultor }}>
                    <Button m={2} colorScheme='teal' variant='link'>Ver más</Button>
                </Link>
            )}
        </Box>
    );
}

export default SculptorCardMain;
