import React from 'react';
import { Box,Button,Card,CardBody,CardFooter,CardHeader,Flex,Heading,IconButton,Image,Text,Avatar,} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiLike,BiShare } from 'react-icons/bi';
import { useAuth0 } from '@auth0/auth0-react';
import Map from '../../Map';

const Esculturas = ({ evento }) => {
  const { isAuthenticated } = useAuth0();

  const handleVote = () => {
    isAuthenticated ? alert("¡Voto registrado!") : alert("¡Debe iniciar sesión!");
  };

  if (!evento) {
    return <Text>No hay información </Text>; // Mensaje cuando no hay evento
  }

  return (
    <>
      <Card maxW="md" m={4}>
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
              <Box>
                <Heading size="sm">{evento.event_name}</Heading>
                <Text></Text>
              </Box>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<BsThreeDotsVertical />}
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>{evento.info}</Text>
        </CardBody>
        <Image objectFit="cover" src={evento.Img_Profile} alt="Chakra UI" />
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button flex="1" variant="ghost" leftIcon={<BiLike />} onClick={handleVote}>
            Votar
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
            Share
          </Button>
        </CardFooter>
      </Card>
      <Map />
    </>
  );
};


export default Esculturas;
