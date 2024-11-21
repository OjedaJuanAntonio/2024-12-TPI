import {
  Box,
  Image,
  Text,
  IconButton,
  VStack,
  HStack,
  Avatar,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
} from "@chakra-ui/react";
import { FaShareAlt } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import FiltterBar from "./FiltterBar";

const SculptureList = () => {
  const [esculturas, setEsculturas] = useState([]);
  const [filteredEsculturas, setFilteredEsculturas] = useState([]);
  const [escultores, setEscultores] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Carga inicial de datos
  useEffect(() => {
    const fetchEsculturas = async () => {
      try {
        const response = await fetch("http://localhost:8000/esculturas/");
        const data = await response.json();
        setEsculturas(data);
        setFilteredEsculturas(data);
      } catch (error) {
        console.error("Error fetching esculturas:", error);
      }
    };

    const fetchEscultores = async () => {
      try {
        const response = await fetch("http://localhost:8000/escultores/");
        const data = await response.json();
        // Crear un mapa de escultores para acceso rápido por ID
        const escultoresMap = data.reduce((acc, escultor) => {
          acc[escultor.id] = escultor;
          return acc;
        }, {});
        setEscultores(escultoresMap);
      } catch (error) {
        console.error("Error fetching escultores:", error);
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchEsculturas(), fetchEscultores()]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Manejo de filtros
  const handleFilterChange = (type, value) => {
    let updatedEsculturas = [...esculturas];

    if (type === "categoria") {
      updatedEsculturas = esculturas.filter(
        (escultura) => escultura.categoria === value
      );
    } else if (type === "orden") {
      if (value === "Artista") {
        updatedEsculturas.sort((a, b) => a.autor.localeCompare(b.autor));
      } else if (value === "Fecha") {
        updatedEsculturas.sort(
          (a, b) => new Date(b.fecha) - new Date(a.fecha)
        );
      } else if (value === "AZ") {
        updatedEsculturas.sort((a, b) => a.titulo.localeCompare(b.titulo));
      } else if (value === "ZA") {
        updatedEsculturas.sort((a, b) => b.titulo.localeCompare(a.titulo));
      }
    }
    setFilteredEsculturas(updatedEsculturas);
  };

  // Función para compartir escultura
  const handleShare = (escultura) => {
    const shareUrl = `${window.location.origin}/escultura/${escultura.id}`;
    if (navigator.share) {
      navigator
        .share({
          title: escultura.titulo,
          text: escultura.intencion,
          url: shareUrl,
        })
        .catch((error) => console.error("Error:", error));
    } else {
      alert("Compartir no disponible en este navegador");
    }
  };

  return (
    <Box p="4" bg="gray.100" minH="100vh">
      <FiltterBar onFilterChange={handleFilterChange} />

      <Box
        display="grid"
        gridTemplateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap="6"
        className="animate__animated animate__zoomIn"
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Box
                key={index}
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="lg"
                p="4"
                bg="white"
              >
                <HStack spacing={4} align="center" mb={2}>
                  <SkeletonCircle size="10" />
                  <Box flex="1">
                    <SkeletonText noOfLines={1} spacing="2" />
                  </Box>
                </HStack>
                <Skeleton height="100px" />
                <SkeletonText mt="4" noOfLines={3} spacing="4" />
              </Box>
            ))
          : filteredEsculturas.map((escultura) => {
              const escultor = escultores[escultura.id_escultor] || {};
              return (
                <Box
                  key={escultura.id}
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  bg="white"
                  overflow="hidden"
                  boxShadow="2xl"
                  transition="all 0.3s ease"
                  transform="scale(1)"
                  _hover={{ transform: "scale(1.05)", boxShadow: "3xl" }}
                >
                  <HStack spacing="2" m="4">
                    <Avatar
                      size="sm"
                      name={escultor.nombre || "Autor desconocido"}
                      src={escultor.photo || ""}
                    />
                    <Text fontSize="sm" color="gray.500">
                      {escultor.nombre || "NN"}
                    </Text>
                  </HStack>
                  <Image src={escultura.url_imagen} alt={escultura.titulo} />
                  <Box p="4">
                    <VStack align="start" spacing="2">
                      <Text fontWeight="bold" fontSize="lg">
                        {escultura.titulo}
                      </Text>
                    </VStack>
                    <Text
                      mt="3"
                      fontSize="sm"
                      color="gray.600"
                      noOfLines={2}
                    >
                      {escultura.intencion}
                    </Text>
                  </Box>
                  <Box p="4" display="flex" justifyContent="flex-end" gap="2">
                    <IconButton
                      aria-label="Compartir"
                      icon={<FaShareAlt />}
                      variant="ghost"
                      onClick={() => handleShare(escultura)}
                    />
                  </Box>
                </Box>
              );
            })}
      </Box>
    </Box>
  );
};

export default SculptureList;
