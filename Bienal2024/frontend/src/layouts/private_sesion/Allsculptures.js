import React, { useState, useEffect } from 'react';
import { Box, Button, Text, Image, VStack } from '@chakra-ui/react';
import TabletView from '../public_sesion/sculptors/TabletID';

const SculptureAllList = () => {
  const [esculturas, setEsculturas] = useState([]); // Lista de esculturas
  const [selectedSculpture, setSelectedSculpture] = useState(null); // Escultura seleccionada

  useEffect(() => {
    fetch('http://localhost:8000/esculturas/')
      .then((response) => response.json())
      .then((data) => setEsculturas(data))
      .catch((error) => console.error('Error fetching esculturas:', error));
  }, []);

  if (selectedSculpture) {
    // Renderizar TabletView con la escultura seleccionada
    return <TabletView sculpture={selectedSculpture} />;
  }

  return (
    <Box p="5">
      <VStack spacing="4">
        {esculturas.map((escultura) => (
          <Box
            key={escultura.id}
            p="4"
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center">








            <Box display="flex" alignItems="center">
              <Image
                src={escultura.url_imagen}
                alt={escultura.titulo}
                boxSize="50px"
                borderRadius="full"
                mr="4"
              />
              <Text fontSize="xl" fontWeight="bold">
                {escultura.titulo}
              </Text>
            </Box>
            <Button
              colorScheme="teal"
              onClick={() => setSelectedSculpture(escultura)}
            >
              Formato Tablet
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default SculptureAllList;
