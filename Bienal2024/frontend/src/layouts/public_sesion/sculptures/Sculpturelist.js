import { Box, Image, Text, IconButton, VStack, HStack, Skeleton, SkeletonText, SkeletonCircle } from "@chakra-ui/react"; 
import { FaShareAlt } from "react-icons/fa"; 
import React, { useState, useEffect } from "react"; 
import FiltterBar from "./FiltterBar";

const SculptureList = () => {
  const [esculturas, setEsculturas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const esculturasResponse = await fetch("http://localhost:8000/esculturas/");
        const esculturasData = await esculturasResponse.json();
        setEsculturas(esculturasData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Box p="4" bg="gray.100" minH="100vh">
      <FiltterBar />
      <Box display="grid" gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap="6" className="animate__animated animate__zoomIn">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Box key={index} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg" p="4" bg="white">
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
          : esculturas.map((escultura) => (
              <Box key={escultura.id} maxW="sm" borderWidth="1px" borderRadius="lg" bg="white" overflow="hidden" boxShadow="2xl" transition="all 0.3s ease" transform="scale(1)" _hover={{ transform: "scale(1.05)", boxShadow: "3xl" }}>
                <Image src={escultura.url_imagen} alt={escultura.titulo} width="100%" height="60%" objectFit="cover" />
                <Box p="4">
                  <VStack align="start" spacing="2">
                    <Text fontWeight="bold" fontSize="lg">{escultura.titulo}</Text>
                  </VStack>
                  <Text mt="3" fontSize="sm" color="gray.600" noOfLines={2}>{escultura.intencion}</Text>
                </Box>
                <Box p="4" display="flex" justifyContent="flex-end" gap="2">
                  <IconButton  aria-label="Compartir" icon={<FaShareAlt />} variant="ghost" position="absolute"  bottom="10px"  right="10px" 
                    onClick={() => {const shareUrl = `${window.location.origin}/escultura/${escultura.id}`;
                                      navigator.share({
                                      title: escultura.titulo,
                                      text: escultura.intencion,
                                      url: shareUrl, }).catch((error) => console.error("Error:", error));
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
