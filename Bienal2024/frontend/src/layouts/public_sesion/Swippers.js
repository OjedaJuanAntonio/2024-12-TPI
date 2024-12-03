import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import { Navigation } from 'swiper/modules';
import { Box, Image, Text, Card,Button } from "@chakra-ui/react";
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
                  objectFit="cover" // Mantiene la imagen recortada para llenar el contenedor
                  width="100%"
                  height="100%" // Asegura que la imagen llene el contenedor
                  fallbackSrc="https://via.placeholder.com/800" // Imagen de respaldo en caso de que falte la original
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
                <Text fontSize="2xl" fontWeight="bold">
                    Eventos del Día
                </Text>
            </Box>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={{ clickable: true }}
                modules={[EffectCoverflow, Pagination]}
                style={{ paddingBottom: '5vh' }}
            >
                {evento.length > 0 ? (
                    <>
                        {/* Muestra los primeros 4 eventos */}
                        {evento.slice(0, 4).map((event) => (
                            <SwiperSlide
                                key={event.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Card
                                    direction="column"
                                    overflow="hidden"
                                    variant="outline"
                                    w="90%" // Ocupa el 90% del ancho
                                    maxW="300px" // Ancho máximo
                                    h="350px" // Altura fija
                                    mx="auto"
                                    p={4}
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"

                                    bgSize="cover"
                                    bgPosition="center"
                                    boxShadow="lg"
                                    color="white"
                                    borderRadius="lg"
                                >
                                    <Text fontSize="lg" fontWeight="bold" color={"black"}>
                                        {event.nombre}
                                    </Text>
                                    <Text fontSize="sm" mt={2} color={"black"}>
                                        {event.tematica}
                                    </Text>
                                    <Text fontSize="sm" fontStyle="italic" mt={1} color={"black"}>
                                        {event.ubicacion}
                                    </Text>
                                </Card>
                            </SwiperSlide>
                        ))}
                        {/* Último slide: Ver todos */}
                        <SwiperSlide
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Card
                                direction="column"
                                overflow="hidden"
                                variant="outline"
                                w="90%"
                                maxW="300px"
                                h="350px"
                                mx="auto"
                                p={4}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                bg="gray.700"
                                boxShadow="lg"
                                borderRadius="lg"
                                color="white"
                            >
                                <Link to="/actividades">
                                    <Button
                                        py={2}
                                        fontSize="md"
                                        fontWeight="bold"
                                        textAlign="center"
                                        colorScheme="blue"
                                    >
                                        Ver Todos los Eventos
                                    </Button>
                                </Link>
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
