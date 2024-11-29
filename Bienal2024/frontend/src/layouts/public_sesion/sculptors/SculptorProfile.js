import React, { useState, useEffect } from 'react';
import { Box, Image, Text, Heading, Flex, Center, Spinner } from '@chakra-ui/react';
import Escultores from '../../../assets/Escultores.jpg';
import { SwipperProfile } from "../Swippers";
import { useLocation } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

const SculptorProfile = () => {
  const location = useLocation(); // Inicializa location
  const id = location.pathname.split('/').pop(); // Extrae el ID del pathname
  const { escultor } = location.state || {}; // Maneja casos donde state sea undefined

  const [loading, setLoading] = useState(true);
  const [sculptures, setSculptures] = useState([]);
  const [sculpturesLoading, setSculpturesLoading] = useState(true);

  useEffect(() => {
    // Simula un delay inicial para cargar el perfil
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchSculptures = async () => {
      try {
        const correctedId = id.replace(/^-/, ''); // Elimina el guion inicial, si lo tiene

        const response = await fetch(`http://localhost:8000/esculturas/?id_escultor=${correctedId}`);
        if (response.ok) {
          const data = await response.json();
          setSculptures(data);
        } else {
          console.error("Error al obtener esculturas:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      } finally {
        setSculpturesLoading(false);
      }
    };

    fetchSculptures();
  }, [id]);

  // Extrae y transforma todas las imágenes
// Extrae y transforma todas las imágenes
const sculptureImages = sculptures.flatMap((sculpture) => [
  { url: sculpture.url_imagen_1 },
  { url: sculpture.url_imagen_2 },
  { url: sculpture.url_imagen_3 },
]).filter((image) => image.url); // Filtra cualquier valor undefined o null

console.log("Contenido de sculptureImages:", sculptureImages); // Log para verificar


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
        <Heading fontSize="xl" mb={2}>Esculturas:</Heading>
        {sculpturesLoading ? (
          <Center>
            <Spinner size="lg" />
          </Center>
        ) : (
          sculptures.length > 0 ? (
            <Flex flexWrap="wrap" gap={4}>
              {sculptures.map((sculpture) => (
                <Box
                  key={sculpture.id}
                  borderRadius="md"
                  boxShadow="md"
                  p={4}
                  bg="white"
                  maxW="200px"
                >
                  <Image
                    src={sculpture.url_imagen_1}
                    alt={sculpture.titulo}
                    borderRadius="md"
                    mb={2}
                    boxSize="150px"
                    objectFit="cover"
                  />
                  <Text fontWeight="bold" fontSize="md">{sculpture.title}</Text>
                  <Text fontSize="sm">{sculpture.description}</Text>
                </Box>
              ))}
            </Flex>
          ) : (
            <Text fontSize="md">No hay esculturas asociadas.</Text>
          )
        )}
      </Box>

      {/* Pasa solo las imágenes a SwipperProfile */}
      <SwipperProfile images={sculptureImages} />
    </>
  );
};

export default SculptorProfile;
