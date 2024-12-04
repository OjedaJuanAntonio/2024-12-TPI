import React from 'react';
import {Box,Flex,Heading,Text,Avatar,Divider,Button} from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user } = useAuth0(); 
  return (
    <Box p={5} bg="gray.50" borderRadius="md" boxShadow="md" maxW="md" mx="auto">
      <Flex align="center" justify="center" mb={4}>
        <Avatar size="2xl" src={user.picture} />
      </Flex>
      <Divider mb={6} />
      <Heading size="sm">Información</Heading>
      <Text>{user.name}</Text> 
      <Heading size="sm" mt={4}>Información de contacto</Heading>
      <Text>{user.email || 'No disponible'}</Text>
      <Button mt={4} colorScheme="teal" size="sm" width="full">Editar perfil</Button>
    </Box>
  );
};

export default Profile;
