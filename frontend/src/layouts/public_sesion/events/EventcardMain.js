import React from 'react'
import {Card,Stack,Heading,Text,Button, CardBody,CardFooter,useBreakpointValue,} from '@chakra-ui/react';
import {CalendarIcon} from '@chakra-ui/icons'
  

function EventcardMain() {
    const headingSize = useBreakpointValue({ base: 'xs', md: 'sm' });
    const textSize = useBreakpointValue({ base: 'sm', md: 'md' });
    const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  
    return (
      <Card direction={{ base: 'column', sm: 'row' }}overflow="hidden"variant="outline" maxW={{ base: '90%', sm: '400px' }}height="auto" mx="auto"backgroundImage="url('https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/06/muba.png')"backgroundSize="cover"backgroundPosition="center"color="white"p={4} >
            <Stack>
                <CardBody p={2}> 
                    <Heading size={headingSize}>Exposición “Origen” Escultura Argentina Contemporánea</Heading>
                    <Text fontSize={textSize} py="2">Explorá la exposición “Origen”, que presenta la escultura argentina contemporánea y cómo los artistas reinterpretan sus raíces culturales a través de obras innovadoras.</Text>
                    <Text fontSize={textSize}>Fecha:</Text>
                    <Text fontSize={textSize} fontWeight="bold">12/04/2024</Text>
                </CardBody>
                <CardFooter>
                    <Button size={buttonSize} variant="solid" colorScheme="blue">Guardar Evento <CalendarIcon ml={2} /></Button>
                </CardFooter>
            </Stack>
      </Card>
    );
  }

export default EventcardMain