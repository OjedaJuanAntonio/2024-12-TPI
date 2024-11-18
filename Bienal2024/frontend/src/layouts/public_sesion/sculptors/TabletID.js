import React from 'react';
import { Box, Flex, Avatar, Text } from '@chakra-ui/react';
import DynamicQRCode from '../../private_sesion/QRcoding';

const TabletView = () => {
  return (
    <Flex direction="row" width="100vw" height="100vh" justifyContent="space-between" alignItems="center" padding="50px" background="linear-gradient(to bottom, #c0d9f7, #4b77a3)" >
        <Box width="80%" display="flex" flexDirection="column" justifyContent="center"  alignItems="center"  textAlign="center">

        <Box width="290px" height="290px" borderRadius="full" marginBottom="50px"  overflow="hidden"   border="6px solid black" display="flex" justifyContent="center" alignItems="center">
            <Avatar name="John Doe" src="https://bit.ly/dan-abramov" size="full" objectFit="cover"/>
        </Box>
        <Box>
            <Text fontSize="6xl" fontWeight="bold" color="gray.800" marginBottom="30px">John Doe</Text>
            <Text fontSize="4xl" color="gray.600" marginBottom="40px">Nacionalidad: Argentino</Text>
        </Box>
        </Box>

        <Box width="100%" height="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" transform="scale(1.5)">
            <Text fontSize="4xl" fontWeight="bold" color="gray.800" marginBottom="20px">Votar</Text>
            <DynamicQRCode />
        </Box>

    </Flex>
  );
};

export default TabletView;
