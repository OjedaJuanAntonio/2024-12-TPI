import React from 'react'
import {Card,Stack,Heading,Text,Button, CardBody,CardFooter, useToast} from '@chakra-ui/react';
import {CalendarIcon} from '@chakra-ui/icons'


  

function EventcardMain({evento}) {
    const toast = useToast()
    const SaveEvent = () => {
        toast({
          position: 'top-left',  
          title: 'Evento guardado.',
          description: "Hemos guardado tu evento con éxito.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      };
    

    return (
      <Card direction={{ base: 'column', sm: 'row' }}overflow="hidden"variant="outline" maxW={{ base: '90%', sm: '400px' }}height="400px" mx="auto" p={4}  style={{backgroundImage: `url(${evento.Img_Profile})`, backgroundSize: 'cover', backgroundPosition: 'center',color: 'white', }}>
            <Stack>
                <CardBody p={2}> 
                    <Heading >{evento.event_name}</Heading>
                    <Text  py="2">{evento.info} </Text>
                    <Text >Fecha:</Text>
                    <Text fontWeight="bold">{evento.Fecha}</Text>
                </CardBody>
                <CardFooter>
                    <Button variant="solid" bg="white" onClick={SaveEvent}>Guardar Evento <CalendarIcon ml={2} /></Button>
                </CardFooter>
            </Stack>
      </Card>
    );
  }

export default EventcardMain