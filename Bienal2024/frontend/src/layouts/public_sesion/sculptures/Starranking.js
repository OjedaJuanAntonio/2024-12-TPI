import React, { useState } from 'react';
import { Icon, HStack, Text, Box, VStack } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
    onRatingChange(rate); // Llama a la función de callback con la calificación
    console.log(rate); // Muestra en consola el valor seleccionado
  };

  const labels = ['Malo', 'Regular', 'Bueno', 'Muy Bueno', 'Excelente'];

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      overflow="hidden" // Evita que los elementos se salgan del box
      maxWidth="100%" // Asegura que no exceda el ancho del contenedor
      flexShrink={0} // Impide que el Box se encoja
      padding={2} // Espacio adicional alrededor del contenido
    >
      <HStack spacing={3}>
        {Array(5).fill('').map((_, index) => {
          const rate = index + 1;
          return (
            <VStack key={rate} spacing={1} align="center">
              <Box
                onMouseEnter={() => setHoveredRating(rate)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => handleRating(rate)}
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
              >
                <Icon
                  as={FaStar}
                  color={rate <= (hoveredRating || rating) ? 'yellow.400' : 'gray.300'}
                  boxSize={5} // Tamaño de la estrella ajustado
                  transform={rate <= (hoveredRating || rating) ? 'scale(1.2)' : 'scale(1)'}
                  transition="transform 0.2s"
                />
              </Box>
              <Text fontSize="xs" color="gray.600">
                {labels[index]} {/* Muestra la etiqueta correspondiente */}
              </Text>
            </VStack>
          );
        })}
      </HStack>
    </Box>
  );
};

export default StarRating;
