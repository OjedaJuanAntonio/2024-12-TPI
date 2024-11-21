import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import DynamicQRCode from '../../private_sesion/QRcoding';

const TabletView = ({ sculpture }) => {
  return (
    <Flex
      direction="row"
      width="100vw"
      height="100vh"
      justifyContent="space-between"
      alignItems="center"
      padding="50px"
      background="linear-gradient(to bottom, #c0d9f7, #4b77a3)"
    >
      <Box
        width="80%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Box
          width="30rem"
          height="30rem"
          marginBottom="50px"
          display="flex"
          justifyContent="center"
          alignItems="center"
           boxShadow="lg"
        >
        

        <Image rounded="md" src={sculpture.url_imagen} alt={sculpture.titulo} />


        </Box>
        <Box>
          <Text fontSize="6xl" fontWeight="bold" color="gray.800" marginBottom="30px">
            {sculpture.nombre}
          </Text>
          <Text fontSize="4xl"  marginBottom="40px">
            <strong>{sculpture.titulo}</strong>
          </Text>
        </Box>
      </Box>

      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        transform="scale(1.5)"
      >
        <Text fontSize="4xl" fontWeight="bold" color="gray.800" marginBottom="20px">
          Votar
        </Text>
        <DynamicQRCode />
      </Box>
    </Flex>
  );
};

export default TabletView;
