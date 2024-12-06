import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import { Navigation } from 'swiper/modules';
import { Box, Image, Text, Card} from "@chakra-ui/react";
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Link } from "react-router-dom";



export function SwipperProfile({ images }) {
    return (
      <Box width="100%" height="50vh">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          style={{ height: '100%' }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <Box width="100%" height="100%" overflow="hidden">
                <Image
                  src={img.url}
                  alt={`Escultura ${index + 1}`}
                  objectFit="cover" 
                  width="100%"
                  height="100%" 
                  fallbackSrc="https://via.placeholder.com/800" 
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    );
  }




  export function SwipperEventcardList({ evento }) {
    return (
        <>
            <Box textAlign="center" py={4}>
                <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold">
                    Eventos Bienal 2024
                </Text>
            </Box>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1.2} 
                breakpoints={{
                    350: { slidesPerView: 2 }, 
                    640: { slidesPerView: 3 }, 
                    1024: { slidesPerView: 3 }, 
                }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={{ clickable: true }}
                modules={[EffectCoverflow, Pagination]}
                style={{ paddingBottom: "5vh" }}
            >
                {evento.length > 0 ? (
                    <>
                        {evento.slice(0, 3).map((event) => (
                            <SwiperSlide
                                key={event.id}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Card
                                    direction="column"
                                    overflow="hidden"
                                    variant="outline"
                                    w={{ base: "80%", md: "90%" }}
                                    maxW={{ base: "250px", md: "300px" }}
                                    mx="auto"
                                 
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
           
                                    boxShadow="lg"
                                    borderRadius="lg"
                                    color="white"
                                    aspectRatio={{ base: "3 / 4", md: "4 / 5" }}
                                >
                                     {/* Imagen */}
    <Box
        w="100%"
        flexBasis="70%" 
        overflow="hidden"
    >
        <Image
            src={event.img_evento} 
            alt={event.nombre}
            w="100%"
            h="100%"
            objectFit="cover"
        />
    </Box>

    <Box
        w="100%"
        flexBasis="30%" 
        p={2}
        textAlign="left"
    >
        <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={2}>
            {event.nombre}
        </Text>
        <Text fontSize="sm" color="gray.600" mb={3}>
            {event.tematica}
        </Text>
    </Box>
                                </Card>
                            </SwiperSlide>
                        ))}
                        {/* Último slide: Ver todos */}
                        <SwiperSlide
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                       <Card
    as={Link} 
    to="/actividades" 
    direction="column"
    overflow="hidden"
    variant="outline"
    w={{ base: "80%", md: "90%" }}
    maxW={{ base: "250px", md: "300px" }}
    mx="auto"
    p={4}
    display="flex"
    justifyContent="center"
    alignItems="center"
    boxShadow="lg"
    borderRadius="lg"
    color="white"
    aspectRatio={{ base: "3 / 4", md: "4 / 5" }}
    textDecoration="none" 
    _hover={{
        transform: "scale(1.05)", 
        transition: "transform 0.2s ease-in-out",
        boxShadow: "xl", 
    }}
   
>
    <Text
        fontSize={{ base: "md", md: "lg" }}
        fontWeight="bold"
        textAlign="center"
        color="black"
       
    >
        Ver Todos los Eventos
    </Text>
</Card>

                        </SwiperSlide>
                    </>
                ) : (
                    <SwiperSlide>
                        <Box textAlign="center" p={4}>
                            <Text fontSize="lg" color="gray.500">
                                No hay eventos disponibles.
                            </Text>
                        </Box>
                    </SwiperSlide>
                )}
            </Swiper>
        </>
    );
}
