import React, { useState, useEffect } from "react";
import { Box, Image, Text, Center, Spinner } from "@chakra-ui/react";
import StarRating from "./Starranking";

const CardVote = ({ idEscultura, idUsuario }) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

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
  const authUser = localStorage.getItem('authUser');


      const parsedUser = JSON.parse(authUser); // Convertir a objeto
      const userVote = parsedUser.sub
 
  

  const handleRatingChange = (rate) => {
    if (hasVoted) {
      alert("Ya votaste por esta escultura.");
      return;
    }

    // Crear el payload para el voto
    const voteData = {
      id_escultura: idEscultura,
      id_usuario: userVote,
      puntaje: rate,
    };
    console.log(voteData)
    // Enviar el voto al backend
    fetch(`http://localhost:8000/votos/votos/`, {
      method: "POST", // Usar POST para registrar un nuevo voto
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
        setHasVoted(true); // Indicar que el usuario ya votó
      })
      .catch((error) => {
        console.error("Error al enviar el voto:", error);
        alert("Ocurrió un error al enviar tu voto. Intenta nuevamente.");
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
        <Text color="red.500">Error al cargar la escultura.</Text>
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
              ¡Gracias por votar Bienal!
            </Text>
          )}
        </Box>
      )}
    </Center>
  );
};

export default CardVote;
