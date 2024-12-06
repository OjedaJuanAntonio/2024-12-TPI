import React, { useState, useEffect } from 'react';
import { Box, Image, Text, Heading, Flex, Center} from '@chakra-ui/react';
import Escultores from '../../../assets/Escultores.jpg';
import { SwipperProfile } from "../Swippers";
import { useLocation } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

const SculptorProfile = () => {
  const location = useLocation(); 
  const id = location.pathname.split('/').pop(); 
  const { escultor } = location.state || {}; 

  const [loading, setLoading] = useState(true);
  const [sculptures, setSculptures] = useState([]);
  const [sculpturesLoading, setSculpturesLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchSculptures = async () => {
      try {
        const correctedId = id; 
        console.log('ID del escultor utilizado:', correctedId);
  
        const response = await fetch(`http://localhost:8000/esculturas/?id_escultor=${correctedId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Respuesta de la API:', data);
  
          setSculptures(data);
        } else {
          console.error('Error al obtener esculturas:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      } finally {
        setSculpturesLoading(false);
      }
    };
  
    fetchSculptures();
  }, [id]);
  

const sculptureImages = sculptures.flatMap((sculpture) => [
  { url: sculpture.url_imagen_1 },
  { url: sculpture.url_imagen_2 },
  { url: sculpture.url_imagen_3 },
]).filter((image) => image.url);



  if (loading) {
    return (
      <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
        <HashLoader />
      </Box>
    );
  }

  return (
    <>
      <Box
        backgroundImage={`url(${Escultores})`}
        backgroundSize="cover"
        backgroundPosition="center"
        height="250px"
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
        p={4}
      />
      <Box w="100vw" p={4}>
        <Flex
          flexDir="column"
          borderRadius="lg"
          boxShadow="2xl"
          bg="white"
          p={4}
          position="relative"
          top="-8vh"
        >
          <Center mb={4}>
            <Image
              borderRadius="full"
              boxSize="20vh"
              src={escultor?.photo}
              border="4px solid white"
              boxShadow="dark-lg"
            />
          </Center>
          <Text fontWeight="bold" fontSize="2xl" textAlign="center">
            {escultor?.nombre} {escultor?.apellido}
          </Text>
          <Text fontSize="lg" textAlign="center">{escultor?.Nacionalidad}</Text>
          <Heading fontSize="xl" mb={2}>Biografía:</Heading>
          <Text fontSize="md">{escultor?.biografia || "Sin distinciones."}</Text>
        </Flex>
      </Box>

      <Box p={4}>
        <Heading fontSize="xl" mb={2}>Obras:</Heading>
      </Box>

      <SwipperProfile images={sculptureImages} />
    </>
  );
};

export default SculptorProfile;
