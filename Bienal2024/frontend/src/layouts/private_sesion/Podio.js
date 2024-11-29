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

  useEffect(() => {
    // Fetch de esculturas para obtener y calcular el ranking
    const fetchEsculturas = async () => {
      try {
        const response = await fetch("http://localhost:8000/esculturas/");
        if (!response.ok) {
          throw new Error("Error al obtener las esculturas");
        }
        const esculturas = await response.json();

        // Calcular el rating de cada escultura
        const processedData = esculturas.map((escultura) => ({
          ...escultura,
          rating: escultura.estrellas / escultura.votos,
        }));

        // Ordenar esculturas por rating descendente
        const topEsculturas = processedData
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3); // Tomar las 3 mejores

        // Asignar nombres a los podios
        setFirstName(topEsculturas[0]?.titulo|| "Sin datos");
        setSecondName(topEsculturas[1]?.titulo || "Sin datos");
        setThirdName(topEsculturas[2]?.titulo || "Sin datos");
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchEsculturas();

    // Inicia la animación del podio
    setIsLoaded(true);

    const timer = setTimeout(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4500);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* Confetti */}
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
        {/* Segundo lugar */}
        <VStack spacing={4} align="center">
          <HStack>
            <Text fontSize={["1rem", "1.25rem", "1.5rem"]} fontWeight="bold" color="gray.700">
              {secondName || "Jugador 2"}
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
          />
          <Text fontSize={["1rem", "1.25rem", "1.5rem"]} fontWeight="bold">
            II
          </Text>
        </VStack>

        {/* Primer lugar */}
        <VStack spacing={4} align="center">
          <HStack>
            <Text fontSize={["1rem", "1.25rem", "1.5rem"]} fontWeight="bold" color="yellow.700">
              {firstName || "Jugador 1"}
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
            alignItems="flex-end"
            justifyContent="center"
          />
          <Text fontSize={["1rem", "1.25rem", "1.5rem"]} fontWeight="bold">
            I
          </Text>
        </VStack>

        {/* Tercer lugar */}
        <VStack spacing={4} align="center">
          <HStack>
            <Text fontSize={["1rem", "1.25rem", "1.5rem"]} fontWeight="bold" color="orange.700">
              {thirdName || "Jugador 3"}
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
          />
          <Text fontSize={["1rem", "1.25rem", "1.5rem"]} fontWeight="bold">
            III
          </Text>
        </VStack>
      </Flex>
    </div>
  );
};

export default Podium;







