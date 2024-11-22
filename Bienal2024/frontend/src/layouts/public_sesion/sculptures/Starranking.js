import React, { useState } from 'react';
import { Icon, HStack, Text, Box, VStack } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
    if (onRatingChange) {
      onRatingChange(rate); // Llama a la función callback
    }
  };

  const labels = ['Malo', 'Regular', 'Bueno', 'Muy Bueno', 'Excelente'];

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      overflow="hidden"
      maxWidth="100%"
      flexShrink={0}
      padding={2}
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
                  boxSize={5}
                  transform={rate <= (hoveredRating || rating) ? 'scale(1.2)' : 'scale(1)'}
                  transition="transform 0.2s"
                />
              </Box>
              <Text fontSize="xs" color="gray.600">
                {labels[index]}
              </Text>
            </VStack>
          );
        })}
      </HStack>
    </Box>
  );
};

export default StarRating;
