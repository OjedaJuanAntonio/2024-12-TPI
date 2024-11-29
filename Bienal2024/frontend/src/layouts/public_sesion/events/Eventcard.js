import React from 'react';
import { 
    Card, 
    CardHeader, 
    Flex, 
    Box, 
    Heading, 
    Text, 
    CardBody, 
    Image, 
    CardFooter, 
    Avatar, 
    IconButton, 
    Badge, 
    Button, 
} from '@chakra-ui/react';
import { FaShareAlt, FaCalendarPlus } from 'react-icons/fa';

function Eventcard({ evento }) {
  // Generar fechas y horas falsas
  const fechaInicio = "2024-12-10"; // Fecha de inicio falsa
  const horaInicio = "12:00"; // Hora de inicio falsa
  const fechaFin = "2024-12-10"; // Fecha de fin falsa
  const horaFin = "14:00"; // Hora de fin falsa

  const handleAddToGoogleCalendar = () => {
    // Extraer los datos necesarios del evento
    const { nombre, tematica, ubicacion } = evento;

    // Crear el enlace para Google Calendar
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(nombre)}&details=${encodeURIComponent(tematica)}&location=${encodeURIComponent(ubicacion)}&dates=${fechaInicio.replace(/-/g, '')}T${horaInicio.replace(':', '')}00Z/${fechaFin.replace(/-/g, '')}T${horaFin.replace(':', '')}00Z`;

    // Abrir el enlace en una nueva pestaña
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <Card 
      maxW="md" 
      borderRadius="lg" 
      overflow="hidden" 
      boxShadow="xl" 
      bg="white" 
      _hover={{ transform: "scale(1.03)", boxShadow: "2xl" }} 
      transition="all 0.3s ease"
    >
      {/* Header */}
      <CardHeader bg="gray.50" p={4}>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap={3}>
            <Avatar src={evento.Img_Profile} name={evento.nombre} size="md" />
            <Box>
              <Heading size="md" color="gray.700">{evento.nombre}</Heading>
              <Text fontSize="sm" color="gray.500">{evento.tematica}</Text>
            </Box>
          </Flex>
          <Button
      onClick={handleAddToGoogleCalendar}
      variant="ghost"

    
    >
      <FaCalendarPlus />
    </Button>
        </Flex>
      </CardHeader>

      {/* Image */}
      <Image 
        objectFit="cover" 
        src={evento.Img_Profile} 
        alt={evento.imageAlt || "Imagen del evento"} 
        h="200px" 
        w="100%" 
        borderBottom="1px solid #E2E8F0"
      />

      {/* Body */}
      <CardBody p={5}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text color="gray.600" fontSize="sm" noOfLines={1}>
            <strong>Ubicación:</strong> {evento.ubicacion || "Ubicación desconocida"}
          </Text>
          <Badge colorScheme="blue" borderRadius="full" px={3}>
            {evento.tematica}
          </Badge>
        </Flex>
        <Text mt={3} fontSize="sm" color="gray.500" noOfLines={3}>
          Este evento es perfecto para aquellos interesados en <strong>{evento.tematica}</strong>. 
          ¡No te lo pierdas!
        </Text>
      </CardBody>

      {/* Footer */}
      <CardFooter
        position="relative"
        display="flex"
        justifyContent="flex-end"
        p={2}
        bg="gray.50"
        borderTop="1px solid #E2E8F0"
      >
        {/* Botón de Compartir */}
        <IconButton  
          aria-label="Compartir" 
          icon={<FaShareAlt />} 
          variant="ghost" 
          onClick={() => {
            const shareUrl = `${window.location.origin}/evento/${evento.id}`;
            navigator.share({
              title: evento.nombre,
              text: evento.tematica,
              url: shareUrl,
            }).catch((error) => console.error("Error al compartir:", error));
          }} 
          mr={2}
        />
        {/* Botón de Añadir a Google Calendar */}
       
      </CardFooter>
    </Card>
  );
}

export default Eventcard;
