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
    IconButton, 
    Badge, 
    Button 
} from '@chakra-ui/react';
import { FaShareAlt, FaCalendarPlus } from 'react-icons/fa';

function Eventcard({ evento }) {
  const handleAddToGoogleCalendar = () => {
    const { nombre, tematica, ubicacion, fecha_inicio, fecha_fin } = evento;

    // Crear el enlace para Google Calendar para un evento de todo el día
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(nombre)}&details=${encodeURIComponent(tematica)}&location=${encodeURIComponent(ubicacion)}&dates=${fecha_inicio.replace(/-/g, '')}/${fecha_fin.replace(/-/g, '')}`;

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
          <Box>
            <Heading size="md" color="gray.700" ml={2}>{evento.nombre}</Heading>
            <Badge colorScheme="blue" borderRadius="full" px={3}>{evento.tematica}</Badge>
          </Box>
          <Button onClick={handleAddToGoogleCalendar} variant="ghost">
            <FaCalendarPlus />
          </Button>
        </Flex>
      </CardHeader>

      {/* Imagen */}
      <Image 
        objectFit="cover" 
        src={evento.img_evento} 
        alt={evento.imageAlt || "Imagen del evento"} 
        h="200px" 
        w="100%" 
        borderBottom="1px solid #E2E8F0"
      />

      {/* Cuerpo */}
      <CardBody p={6} bg="gray.50" borderRadius="md" boxShadow="sm">
        <Box>
          {/* Fechas en la misma fila */}
          <Flex justifyContent="space-between" alignItems="flex-start" mb={6}>
            <Box>
              <Text color="gray.600" fontSize="sm" fontWeight="bold" mb={1}>
                Fecha de inicio:
              </Text>
              <Text color="teal.700" fontSize="lg" fontWeight="semibold">
                {evento.fecha_inicio}
              </Text>
            </Box>

            <Box textAlign="right">
              <Text color="gray.600" fontSize="sm" fontWeight="bold" mb={1}>
                Fecha de finalización:
              </Text>
              <Text color="teal.700" fontSize="lg" fontWeight="semibold">
                {evento.fecha_fin}
              </Text>
            </Box>
          </Flex>

          {/* Ubicación */}
          <Box>
            <Text color="gray.600" fontSize="sm" fontWeight="bold">
              Ubicación:
            </Text>
            <Text color="teal.700" fontSize="md" fontWeight="semibold">
              {evento.ubicacion || "Ubicación desconocida"}
            </Text>
          </Box>
        </Box>
      </CardBody>

      {/* Footer */}
      <CardFooter
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
        />
      </CardFooter>
    </Card>
  );
}

export default Eventcard;
