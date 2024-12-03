import React from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react';
import DynamicQRCode from '../../private_sesion/QRcoding';

const TabletView = () => {
  const location = useLocation();
  const { data } = location.state || { data: null }; // Datos recibidos

  if (!data) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh" background="linear-gradient(to bottom, #c0d9f7, #4b77a3)">
        <Text fontSize="2xl" fontWeight="bold" color="gray.800">
          Cargando...
        </Text>
      </Flex>
    );
  }

  return (
    <Flex direction="row" width="100vw" height="100vh" justifyContent="space-between"alignItems="center" padding="50px" background="linear-gradient(to bottom, #c0d9f7, #4b77a3)">
      <Box width="100%" height="auto" marginBottom="50px" display="flex" flexDirection="column" boxShadow="lg" bg="white">
        <Box  display="flex" alignItems="center"width="100%" >
          <Avatar src={data.photo} margin="20px" size="lg" />
          <Text fontSize="lg">{data.nombre}   {data.apellido}</Text>
        </Box>
        <Image src={data.url_imagen_1}  alt={data.titulo}  width="100%" marginBottom="10px"/>
        <Text fontSize="2xl" textAlign="center" fontWeight="bold" marginBottom="10px">{data.titulo} </Text>
      </Box>

      <Box width="100%" height="100%" display="flex" flexDirection="column" justifyContent="center"  alignItems="center" transform="scale(1.5)">
        <Text fontSize="2xl" fontWeight="bold" color="gray.800" marginBottom="20px"> Votar</Text>
        <DynamicQRCode url="http://localhost:3000/votar" Countdown={10000} data={data.esculturaId} />
      </Box>
    </Flex>
  );
};

export default TabletView;
