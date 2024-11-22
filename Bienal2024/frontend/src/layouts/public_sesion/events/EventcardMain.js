import React from 'react';
import { Card, Stack, Heading, Text, Button, CardBody, CardFooter, useToast } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';

function EventcardMain({ evento }) {
    const toast = useToast();

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
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow="hidden"
            variant="outline"
            w="100%" 
            maxW="400px"
            h="350px" 
            mx="auto"
            p={4}
            style={{
                backgroundImage: `url(${evento.Img_Profile})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
            }}
        >
            <Stack spacing={3} h="full">
                <CardBody p={0}>
                    <Heading fontSize={{ base: 'xl', sm: '2xl' }}>{evento.event_name}</Heading>
                    <Text py="2" fontSize={{ base: 'md', sm: 'lg' }}>
                        {evento.info.length > 70 ? evento.info.slice(0, 70) + '...' : evento.info}
                    </Text>
                    <Text fontSize={{ base: 'md', sm: 'lg' }}>Fecha:</Text>
                    <Text fontWeight="bold" fontSize={{ base: 'md', sm: 'lg' }}>{evento.Fecha}</Text>
                </CardBody>
                <CardFooter   p={0} >
                    <Button variant="solid" bg="white"   onClick={SaveEvent}>
                        Guardar Evento <CalendarIcon  />
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
}

export default EventcardMain;
