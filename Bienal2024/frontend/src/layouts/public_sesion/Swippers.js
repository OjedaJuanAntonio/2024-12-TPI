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
                <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold">
                    Eventos Bienal 2024
                </Text>
            </Box>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1.2} // Permite ver parcialmente las tarjetas laterales
                breakpoints={{
                    350: { slidesPerView: 2 }, 
                    640: { slidesPerView: 3 }, // Más espacio para pantallas medianas
                    1024: { slidesPerView: 3 }, // Pantallas grandes muestran más tarjetas
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
                        {/* Muestra los primeros 4 eventos */}
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
        flexBasis="70%" // Imagen ocupa el 70%
        overflow="hidden"
    >
        <Image
            src={event.img_evento} // Asegúrate de tener una URL de imagen en tus datos
            alt={event.nombre}
            w="100%"
            h="100%"
            objectFit="cover"
        />
    </Box>

    {/* Contenido */}
    <Box
        w="100%"
        flexBasis="30%" // Contenido ocupa el 30%
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
    as={Link} // Convierte el Card en un enlace
    to="/actividades" // Especifica el destino
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
    textDecoration="none" // Evita subrayado del texto
    _hover={{
        transform: "scale(1.05)", // Animación al pasar el mouse
        transition: "transform 0.2s ease-in-out",
        boxShadow: "xl", // Acentuar la sombra
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
