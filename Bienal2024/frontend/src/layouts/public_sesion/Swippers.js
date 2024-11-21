import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import { Navigation } from 'swiper/modules';
import { useLocation } from 'react-router-dom';
import { Box, Image, Text, Card,Button } from "@chakra-ui/react";
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Link } from "react-router-dom";


export function SwipperProfile() {
    const location = useLocation();
    const { escultor } = location.state;

    return (
        <Box width="100%" height="35vh">
            <Swiper navigation={true} modules={[Navigation]} style={{ height: '100%' }}>
                {[escultor.Img3, escultor.Img2, escultor.Img1, escultor.Img].map((img, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={img}
                            alt={`Sculptor's work ${index + 1}`}
                            objectFit="cover"
                            width="100%"
                            height="100%"
                            fallbackSrc="path/to/placeholder-image.jpg"
                        />
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
