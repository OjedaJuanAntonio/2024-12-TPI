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
import EventcardMain from "./events/EventcardMain";
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
            <Box>
                <Box textAlign="center" p={2} fontWeight="bold">
                    <Text fontSize="xl">Eventos del Dia</Text>
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
                    pagination={true}
                    modules={[EffectCoverflow, Pagination]}
                    className="mySwiper"
                    style={{ paddingBottom: '5vh' }}
                >
                    {evento.length > 0 ? (
                        <>
                            {evento.slice(0, 4).map((evento) => (
                                <SwiperSlide key={evento.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div className="animate__animated animate__zoomIn">
                                        <EventcardMain evento={evento} />
                                    </div>
                                </SwiperSlide>
                            ))}
                           <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
        w="100%" // Ancho completo
        maxW="400px" // Ancho máximo para dispositivos grandes
        h="350px" // Altura fija para asegurar espacio para el botón
        mx="auto"
        p={4}
        display="flex" // Usar flexbox
        flexDirection="column" // Alinear verticalmente
        justifyContent="center" // Centrar verticalmente
        alignItems="center" // Centrar horizontalmente
        style={{
            backgroundImage: `url(${evento.Img_Profile})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
        }}
    >
        <Link to={{ pathname: "/actividades", state: { eventos: [evento] } }}>
            <Button
                py="2"
                fontSize={{ base: 'md', sm: 'lg' }}
                fontWeight="bold"
                textAlign="center"
                variant="link"
                textDecoration="underline"
            >
                Ver Todos
            </Button>
        </Link>
    </Card>
</SwiperSlide>

                        </>
                    ) : (
                        <SwiperSlide>
                            <div>No hay eventos disponibles.</div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </Box>
        </>
    );
}
