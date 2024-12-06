import React, { useState, useEffect } from "react";
import { Box, Image, Text, Center, Spinner, useToast } from "@chakra-ui/react";
import StarRating from "./Starranking";

const CardVote = ({ idEscultura }) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [userVote, setUserVote] = useState(null);
  
  const toast = useToast(); 

  useEffect(() => {
    if (idEscultura) {
      setLoading(true);
      setFetchedData(null);
      setError(null);

      fetch(`http://localhost:8000/esculturas/${idEscultura}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener los datos");
          }
          return response.json();
        })
        .then((data) => {
          setFetchedData(data);
          setLoading(false);
        })
        .catch((fetchError) => {
          setError(fetchError.message);
          setLoading(false);
        });
    }
  }, [idEscultura]);

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      try {
        const parsedUser = JSON.parse(authUser);
        if (parsedUser && parsedUser.sub) {
          setUserVote(parsedUser.sub);
        } else {
          setError("El token de usuario no contiene el campo 'sub'.");
        }
      } catch (e) {
        setError("Error al parsear el usuario desde el localStorage.");
        console.error(e);
      }
    } else {
      setError("Debes iniciar sesión para poder votar");
    }
  }, []); // Esto se ejecuta solo una vez al cargar el componente

  const handleRatingChange = (rate) => {
    if (hasVoted) {
      // Si ya votaste, mostramos el mensaje de error como un Toast
      toast({
        title: "Ya votaste",
        description: "Solo puedes votar una vez por escultura.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!userVote) {
      toast({
        title: "Error",
        description: "No se encontró el usuario. Por favor, inicia sesión.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const voteData = {
      id_escultura: idEscultura,
      id_usuario: userVote,
      puntaje: rate,
    };

    console.log(voteData);

    fetch(`http://localhost:8000/votos/votos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(voteData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al enviar el voto");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("Voto registrado con éxito:", responseData);
        setHasVoted(true);
   
        toast({
          title: "Voto registrado",
          description: "Gracias por votar.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position:'top'
        });
      })
      .catch((error) => {
        console.error("Error al enviar el voto:", error);
        toast({
          title: "Error",
          description: "Solo puedes votar una vez por escultura",
          status: "error",
          duration: 3000,
          isClosable: true,
          position:'top'

        });
      });
  };

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center minH="100vh">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Center minH="100vh" bg="gray.100" p={4}>
      {fetchedData && (
        <Box
          bg="white"
          boxShadow="xl"
          rounded="lg"
          overflow="hidden"
          maxW="500px"
          w="full"
          textAlign="center"
          p={6}
        >
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            {fetchedData.titulo}
          </Text>
          <Image
            src={fetchedData.url_imagen_1}
            alt={fetchedData.titulo}
            objectFit="cover"
            maxH="300px"
            mx="auto"
            borderRadius="md"
            mb={4}
          />
          {!hasVoted ? (
            <StarRating onRatingChange={handleRatingChange} />
          ) : (
            <Text color="green.500" fontSize="lg" mt={4}>
              ¡Gracias por en la Bienal 2024!
            </Text>
          )}
        </Box>
      )}
    </Center>
  );
};

export default CardVote;
