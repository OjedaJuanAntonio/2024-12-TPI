import React from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';
import DynamicQRCode from '../../private_sesion/QRcoding';

const TabletView = () => {
  const location = useLocation();
  const { data } = location.state || { data: null };

  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });
  const scale = useBreakpointValue({ base: 1, md: 1.5 });
  console.log(data)
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
    <Flex
      direction={flexDirection}
      width="100vw"
      height="100vh"
      justifyContent="space-between"
      alignItems="center"
      padding="20px"
      background="linear-gradient(to bottom, #c0d9f7, #4b77a3)"
    >
      <Box
        width={{ base: '100%', md: '50%' }}
        height="auto"
        marginBottom={{ base: '20px', md: '0' }}
        display="flex"
        flexDirection="column"
        boxShadow="lg"
        bg="white"
        borderRadius="lg"
        padding="20px"
      >
        <Flex alignItems="center" marginBottom="20px">
          <Avatar src={data.photo} size={{ base: 'md', md: 'lg' }} marginRight="20px" />
          <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="bold">
            {data.nombre} {data.apellido}
          </Text>
        </Flex>
        <Image
          src={data.url_imagen_1}
          alt={data.titulo}
          width="100%"
          height="auto"
          marginBottom="10px"
          borderRadius="md"
        />
        <Text fontSize={{ base: 'xl', md: '2xl' }} textAlign="center" fontWeight="bold" marginBottom="10px">
          {data.titulo}
        </Text>
      </Box>

      <Box
        width={{ base: '100%', md: '50%' }}
        height="auto"
        display="flex"
        flexDirection="column"

        alignItems="center"
        transform={`scale(${scale})`}


    

      >
        <Text fontSize={{ base: 'lg', md: '2xl' }} fontWeight="bold" color="gray.800" marginBottom="20px">
          Votar
        </Text>
        <DynamicQRCode
          url="http://localhost:3000/votar"
          Countdown={10000}
          data={data.esculturaId}
        />
      </Box>
    </Flex>
  );
};

export default TabletView;
