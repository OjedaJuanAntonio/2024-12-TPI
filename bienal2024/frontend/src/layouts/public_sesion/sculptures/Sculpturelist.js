import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  Text,
  IconButton,
  VStack,
  HStack,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
} from "@chakra-ui/react";
import { FaShareAlt } from "react-icons/fa";
import FiltterBar from "./FiltterBar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/grid";
import { Navigation } from "swiper/modules";

const SculptureList = () => {
  const [esculturas, setEsculturas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredEsculturas, setFilteredEsculturas] = useState([]);
  const [filter, setFilter] = useState(null); // Filtro por material principal
  const [order, setOrder] = useState(null); // Orden actual

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const esculturasResponse = await fetch(
          "http://localhost:8000/esculturas/"
        );
        const esculturasData = await esculturasResponse.json();
        setEsculturas(esculturasData);
        setFilteredEsculturas(esculturasData); // Inicializa con todas las esculturas
        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let updatedEsculturas = [...esculturas];

    // Filtrar por material principal
    if (filter) {
      updatedEsculturas = updatedEsculturas.filter(
        (escultura) => escultura.material_principal === filter
      );
    }

    // Ordenar por criterio seleccionado
    if (order) {
      if (order === "AZ") {
        updatedEsculturas.sort((a, b) => a.titulo.localeCompare(b.titulo));
      } else if (order === "ZA") {
        updatedEsculturas.sort((a, b) => b.titulo.localeCompare(a.titulo));
      } else if (order === "Bienal 2024") {
        updatedEsculturas = updatedEsculturas.filter(
          (escultura) => escultura.id_evento === "1"
        );
      } else if (order === "Otras Ediciones") {
        updatedEsculturas = updatedEsculturas.filter(
          (escultura) => escultura.id_evento !== "1"
        );
      }
    }

    setFilteredEsculturas(updatedEsculturas);
  }, [filter, order, esculturas]);

  const handleFilterChange = (key, value) => {
    if (key === "categoria") {
      setFilter(value); // Actualiza el filtro
    } else if (key === "orden") {
      setOrder(value); // Actualiza el orden
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
          : filteredEsculturas.map((escultura) => (
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
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  style={{
                    height: "40vh", // Altura fija
                    width: "100%", // Ancho completo
                  }}
                >
                  {[escultura.url_imagen_1, escultura.url_imagen_2, escultura.url_imagen_3]
                    .filter((url) => url) // Filtrar URLs vacías
                    .map((url, idx) => (
                      <SwiperSlide
                        key={idx}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={url}
                          fallbackSrc="https://via.placeholder.com/800"
                          style={{
                            height: "100%", // Ocupa todo el alto del contenedor
                            width: "auto", // Ajusta el ancho automáticamente
                            objectFit: "cover", // Recorta las imágenes para cubrir el contenedor
                          }}
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
                <Box p="4">
                  <VStack align="start" spacing="2">
                    <Text fontWeight="bold" fontSize="lg">
                      {escultura.titulo}
                    </Text>
                  </VStack>
                  <Text mt="3" fontSize="sm" color="gray.600" noOfLines={2}>
                    {escultura.intencion}
                  </Text>
                </Box>
                <Box p="4" display="flex" justifyContent="flex-end" gap="2">
                  <IconButton
                    aria-label="Compartir"
                    icon={<FaShareAlt />}
                    variant="ghost"
                    position="absolute"
                    bottom="10px"
                    right="10px"
                    onClick={() => {
                      const shareUrl = `${window.location.origin}/escultura/${escultura.id}`;
                      navigator
                        .share({
                          title: escultura.titulo,
                          text: escultura.intencion,
                          url: shareUrl,
                        })
                        .catch((error) => console.error("Error:", error));
                    }}
                  />
                </Box>
              </Box>
            ))}
      </Box>
    </Box>
  );
};

export default SculptureList;
