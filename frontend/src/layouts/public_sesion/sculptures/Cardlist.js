import React from 'react';
import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, Avatar, Box } from '@chakra-ui/react';
import Starranking from './Starranking';

function Cardlist({ Escultura }) {
  return (
    <div>
      {Escultura.length > 0 ? (
        <>
          {Escultura.map((escultura) => (
            <Card key={escultura.id} maxW='sm'>
              <CardBody>
                <Box position="relative" display="inline-block">
                  <Avatar 
                    name={escultura.nombre} 
                    src={escultura.avatarUrl}  // Asegúrate de tener esta propiedad en los datos
                    position="absolute" 
                    top="10px" 
                    left="10px"
                    zIndex="1"
                  />
                  <Image
                    src={escultura.Img}  // Asegúrate de tener esta propiedad en los datos
                    alt={escultura.first_name} 
                    borderRadius="lg"
                  />
                </Box>
                
                <Stack mt='6' spacing='3'>
                  <Heading size='md'>{escultura.first_name}</Heading>  // Cambia "titulo" según tu estructura de datos
                  <Text>{escultura.info}</Text>  // Cambia "descripcion" según tu estructura de datos
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter m={2}>
                <Text fontSize="lg" fontWeight={'bold'} mr={1}>
                  Votar:
                </Text>
                <Starranking />
              </CardFooter>
            </Card>
          ))}
        </>
      ) : null}
    </div>
  );
}

export default Cardlist;
