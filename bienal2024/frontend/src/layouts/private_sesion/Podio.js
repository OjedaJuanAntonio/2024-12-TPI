import { Box, Text, VStack, Flex, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const Podium = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [recycle, setRecycle] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [thirdName, setThirdName] = useState("");
  const [id1, setId1] = useState(null);
  const [prom1, setProm1] = useState(null);
  const [id2, setId2] = useState(null);
  const [prom2, setProm2] = useState(null);
  const [id3, setId3] = useState(null);
  const [prom3, setProm3] = useState(null);
  const [escultor1, setEscultor1] = useState("");
  const [escultor2, setEscultor2] = useState("");
  const [escultor3, setEscultor3] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/votos/top3/");
        if (!response.ok) {
          throw new Error("Error al realizar el fetch");
        }

        const data = await response.json();
        setId1(data[0]?.id_escultura || "Sin datos");
        setProm1(data[0]?.promedio || "Sin datos");

        setId2(data[1]?.id_escultura || "Sin datos");
        setProm2(data[1]?.promedio || "Sin datos");

        setId3(data[2]?.id_escultura || "Sin datos");
        setProm3(data[2]?.promedio || "Sin datos");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
    setIsLoaded(true);

    const timer = setTimeout(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const fetchEscultor = async (id, setEscultor) => {
    if (id && id !== "Sin datos") {
      try {
        const responseEscultura = await fetch(`http://localhost:8000/esculturas/${id}`);
        if (!responseEscultura.ok) {
          throw new Error(`Error al obtener los detalles de la escultura con ID ${id}`);
        }
        const dataEscultura = await responseEscultura.json();

        const escultorId = dataEscultura.id_escultor;

        if (!escultorId) {
          setError("Escultor no encontrado en los datos de la escultura.");
          return;
        }

        const responseEscultor = await fetch(`http://localhost:8000/escultores/${escultorId}`);
        if (!responseEscultor.ok) {
          throw new Error(`Error al obtener los detalles del escultor con ID ${escultorId}`);
        }
        const escultorData = await responseEscultor.json();

        if (escultorData && escultorData.nombre) {
          setEscultor(`${escultorData.nombre} ${escultorData.apellido}`);
        } else {
          setError("No se encontró información del escultor.");
        }

      } catch (error) {
        setError(`Ocurrió un error: ${error.message}`);
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    fetchEscultor(id1, setEscultor1);
    fetchEscultor(id2, setEscultor2);
    fetchEscultor(id3, setEscultor3);
  }, [id1, id2, id3]);

  return (
    <div style={{ position: "relative" }}>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={600}
          gravity={0.09}
          recycle={recycle}
        />
      )}

      <Flex
        justifyContent="center"
        alignItems="end"
        gap={[4, 6, 8]}
        mb={10}
        h="90vh"
        flexWrap="wrap"
      >

        <VStack spacing={4} align="center">
          <HStack>
            <Text fontSize={["1rem", "1.25rem", "1.5rem"]} fontWeight="bold" color="gray.700">
              {escultor2 || "Jugador 2"}
            </Text>
            <Text fontSize={["1.5rem", "2rem", "2.5rem"]} fontWeight="bold" color="gray.700">
              🥈
            </Text>
          </HStack>

          <Box
            bg="gray.300"
            w={["10rem", "14rem", "18rem"]}
            h={isLoaded ? ["15rem", "20rem", "22rem"] : "0rem"}
            transition="height 2.5s ease-in-out"
            borderRadius="md"
            display="flex"
            alignItems="flex-end"
            justifyContent="center"
          >
            {prom2 && (
              <Text
                fontSize={["1.25rem", "1.5rem", "2rem"]}
                fontWeight="bold"
                color="gray.800"
                position="absolute"
              >
                {prom2}
              </Text>
            )}
          </Box>

          <Text fontSize={["1rem", "1.25rem", "1.5rem"]} fontWeight="bold">
            II
          </Text>
        </VStack>

        <VStack spacing={4} align="center">
          <HStack>
            <Text fontSize={["1rem", "1.25rem", "1.5rem"]} fontWeight="bold" color="yellow.700">
              {escultor1 || "Jugador 1"}
            </Text>
            <Text fontSize={["1.5rem", "2rem", "2.5rem"]} fontWeight="bold" color="yellow.700">
              🥇
            </Text>
          </HStack>

          <Box
            bg="yellow.300"
            w={["10rem", "14rem", "18rem"]}
            h={isLoaded ? ["20rem", "25rem", "30rem"] : "0rem"}
            transition="height 2.5s ease-in-out"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            {prom1 && (
              <Text
                fontSize={["1.25rem", "1.5rem", "2rem"]}
                fontWeight="bold"
                color="gray.800"
                position="absolute"
              >
                {prom1}
              </Text>
            )}
          </Box>

          <Text fontSize={["1rem", "1.25rem", "1.5rem"]} fontWeight="bold">
            I
          </Text>
        </VStack>

        <VStack spacing={4} align="center">
          <HStack>
            <Text fontSize={["1rem", "1.25rem", "1.5rem"]} fontWeight="bold" color="orange.700">
              {escultor3 || "Jugador 3"}
            </Text>
            <Text fontSize={["1.5rem", "2rem", "2.5rem"]} fontWeight="bold" color="orange.700">
              🥉
            </Text>
          </HStack>

          <Box
            bg="orange.300"
            w={["10rem", "14rem", "18rem"]}
            h={isLoaded ? ["12rem", "15rem", "18rem"] : "0rem"}
            transition="height 2.5s ease-in-out"
            borderRadius="md"
            display="flex"
            alignItems="flex-end"
            justifyContent="center"
          >
            {prom3 && (
              <Text
                fontSize={["1.25rem", "1.5rem", "2rem"]}
                fontWeight="bold"
                color="gray.800"
                position="absolute"
              >
                {prom3}
              </Text>
            )}
          </Box>

          <Text fontSize={["1rem", "1.25rem", "1.5rem"]} fontWeight="bold">
            III
          </Text>
        </VStack>
      </Flex>
    </div>
  );
};

export default Podium;
