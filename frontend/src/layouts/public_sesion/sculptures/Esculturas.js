import React from 'react';
import { Box,Button,Card,CardBody,CardFooter,CardHeader,Flex,Heading,IconButton,Image,Text,Avatar,} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiLike,BiShare } from 'react-icons/bi';
import { useAuth0 } from '@auth0/auth0-react';
import Map from '../../Map';

const Esculturas = () => {
    const { isAuthenticated } = useAuth0();

    const handleVote = () => {
     isAuthenticated ? alert("¡Voto registrado!") : alert("¡Debe iniciar sesión!");};
    
  return (
    <>
    <Card maxW='md' m={4}> 
      <CardHeader>
        <Flex spacing='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
            <Box>
              <Heading size='sm'>Segun Adebayo</Heading>
              <Text>Creator, Chakra UI</Text>
            </Box>
          </Flex>
          <IconButton
            variant='ghost'
            colorScheme='gray'
            aria-label='See menu'
            icon={<BsThreeDotsVertical />}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          With Chakra UI, I wanted to sync the speed of development with the speed
          of design. I wanted the developer to be just as excited as the designer to
          create a screen.
        </Text>
      </CardBody>
      <Image
        objectFit='cover'
        src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
        alt='Chakra UI'
      />
      <CardFooter
        justify='space-between'
        flexWrap='wrap'
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Button flex='1' variant='ghost' leftIcon={<BiLike />} onClick={handleVote}> Votar </Button>
        <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
          Share
        </Button>
      </CardFooter>
    </Card>
    <Map/>
    </>
    
  );
};

export default Esculturas;
