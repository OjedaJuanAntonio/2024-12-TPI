import { Box, Image, Text, IconButton, VStack, HStack, Skeleton, SkeletonText, SkeletonCircle } from "@chakra-ui/react"; 
import { FaShareAlt } from "react-icons/fa"; 
import React, { useState, useEffect } from "react"; 
import FiltterBar from "./FiltterBar";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import 'swiper/css/grid';

import { Navigation } from 'swiper/modules';

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
                <Swiper  navigation={true} modules={[Navigation]}  style={{ maxHeight: '40vh' }} >
                   <SwiperSlide><Image src={escultura.url_imagen_1}  objectFit="cover" width="100%"height="100%" fallbackSrc="path/to/placeholder-image.jpg" /></SwiperSlide>
                   <SwiperSlide><Image src={escultura.url_imagen_2}  objectFit="cover" width="100%"height="100%" fallbackSrc="path/to/placeholder-image.jpg" /></SwiperSlide>
                   <SwiperSlide><Image src={escultura.url_imagen_3}  objectFit="cover" width="100%"height="100%" fallbackSrc="path/to/placeholder-image.jpg" /></SwiperSlide>
                </Swiper>
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
