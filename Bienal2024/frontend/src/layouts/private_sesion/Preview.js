import React from 'react';
import { Card, CardHeader, CardBody, Box,  Heading, Text, Flex,  Image,  Badge,  SimpleGrid,} from '@chakra-ui/react';


const Preview = ({ formData }) => {
  return (
    <Card maxW='md' borderWidth='1px' borderRadius='lg' boxShadow='lg' bg='white' mt={5} p={5} ml={8}>
      <CardHeader>
        <Flex spacing='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Box>
              <Heading size='sm'>{formData.titulo}</Heading>
              <Badge colorScheme="green">{formData.tematica}</Badge>
            </Box>
          </Flex>
          
        </Flex>
      </CardHeader>

      <CardBody>
        <Text mb={3}>
          <strong>Intención:</strong> 
          <Text>{formData.Intencion || 'No proporcionada'}</Text>
        </Text>
        <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4} w="100%" alignItems="center">
      <Text ><strong>Fecha de Inicio:</strong></Text>
      <Text>{formData.fecha_inicio}</Text>

      <Text ><strong>Fecha de Fin:</strong></Text>
      <Text>{formData.fecha_fin}</Text>
    </SimpleGrid>
        
      </CardBody>
     
      <Box>
            <Image src="https://via.placeholder.com/150"alt="Imagen 4" boxSize="350px" objectFit="cover" borderRadius="md"/>
      </Box>
    </Card>
  );
};

export default Preview;

