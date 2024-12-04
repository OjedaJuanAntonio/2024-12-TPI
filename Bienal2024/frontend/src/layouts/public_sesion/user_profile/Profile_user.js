import React from 'react';
import {Box,Flex,Heading,Text,Avatar,Divider} from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user } = useAuth0(); 
  return (
      <Box
        p={6}
        bg="white"
        borderRadius="lg"
        boxShadow="xl"
        maxW="lg"
        mx="auto"
        border="1px"
        borderColor="gray.200"
        overflow="hidden"
      >
        <Flex align="center" justify="center" direction="column" mb={6}>
          <Avatar size="2xl" src={user.picture} mb={4} />
          <Text fontSize="xl" fontWeight="bold" color="gray.700">
            {user.name}
          </Text>
        </Flex>
        <Divider mb={6} />
        <Box px={4}>
          <Heading size="sm" color="gray.600" mb={2}>
            Información
          </Heading>
          <Text fontSize="md" color="gray.800" mb={4}>
            {user.name}
          </Text>
          <Heading size="sm" color="gray.600" mb={2}>
            Información de contacto
          </Heading>
          <Text fontSize="md" color="gray.800">
            {user.email || 'No disponible'}
          </Text>
        </Box>
      </Box>
    
  );
};

export default Profile;
