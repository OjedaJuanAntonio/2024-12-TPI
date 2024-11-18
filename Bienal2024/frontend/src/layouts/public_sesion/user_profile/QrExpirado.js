import React from 'react';
import { Text, Icon, VStack, Button } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const QrExpirado = () => {
  return (
    <VStack spacing={4} align="center" justify="center" bg="red.100" borderRadius="lg" p={6} boxShadow="md"  w="100%" h="100vh">
      <Icon as={WarningIcon} boxSize={90} color="red.500" />
      <Text fontSize="lg" color="red.700" fontWeight="semibold"> El código QR ha expirado</Text>
      <Text fontSize="md" color="gray.600">Por favor, escanéalo nuevamente para continuar.</Text>
       <Link to='/1'> <Button colorScheme="red" size="md">Escanear de nuevo</Button></Link>
    </VStack>
  );
};

export default QrExpirado;
