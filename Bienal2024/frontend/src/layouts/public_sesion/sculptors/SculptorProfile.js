import React, { useState, useEffect } from 'react';
import { Box, Image, Text, Heading, Flex, Center } from '@chakra-ui/react';
import Escultores from '../../../assets/Escultores.jpg';
import AutoPlay from './SculptorslistMain';
import { SwipperProfile } from "../Swippers";
import { useLocation } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

const SculptorProfile = () => {
  const location = useLocation();
  const { escultor } = location.state;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
        <HashLoader/>
      </Box>
    );
  }

  return (
    <>
      <Box backgroundImage={`url(${Escultores})`}backgroundSize="cover" backgroundPosition="center" height="250px" display="flex" alignItems="flex-end" justifyContent="center" p={4}/>
      <Box w="100vw" p={4}>
        <Flex flexDir="column" borderRadius="lg" boxShadow="2xl" bg="white" p={4} position="relative" top="-8vh" >
          <Center mb={4}>
            <Image borderRadius="full" boxSize="20vh" src={escultor.Img_Profile} border="4px solid white" boxShadow="dark-lg"/>
          </Center>
          <Text fontWeight="bold" fontSize="2xl" textAlign="center">{escultor.nombre} {escultor.apellido}</Text>
          <Text fontSize="lg" textAlign="center">{escultor.Nacionalidad}</Text>
          <Heading fontSize="xl" mb={2}>Biografia:</Heading>
          <Text fontSize="md">{escultor.Biografia || "Sin distinciones."}</Text>
        </Flex>
      </Box>
      <AutoPlay />
      <SwipperProfile escultor={escultor} />
    </>
  );
};

export default SculptorProfile;
