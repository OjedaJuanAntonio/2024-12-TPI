import React from 'react';
import { Box, Flex, Avatar, Text } from '@chakra-ui/react';
import DynamicQRCode from '../../private_sesion/QRcoding';

const IDCard = () => {
  return (
    <Flex
      direction="row"          // Distribuir los elementos horizontalmente
      width="100vw"            // Ocupa todo el ancho de la pantalla
      height="100vh"           // Ocupa todo el alto de la pantalla
      justifyContent="space-between" // Distribuir espacio entre el contenido
      alignItems="center"      // Centra verticalmente los elementos
      padding="50px"           // Aumenté aún más el espaciado general
      background="linear-gradient(to bottom, #c0d9f7, #4b77a3)"

    >
      {/* Contenedor de la información y foto (lado izquierdo) */}
<Box
  width="80%"              // El contenedor de la izquierda ocupa el 80% del ancho
  display="flex"           // Usamos Flexbox
  flexDirection="column"   // Alineamos los elementos en columna
  justifyContent="center"  // Centrado verticalmente
  alignItems="center"      // Centrado horizontalmente
  textAlign="center"       // Alineación centrada para el texto
>
  {/* Contenedor de la foto */}
  <Box
    width="290px"           // Tamaño del avatar
    height="290px"          // Tamaño cuadrado para la imagen
    borderRadius="full"     // Hacemos la imagen circular
    marginBottom="50px"     // Espacio entre la foto y el texto
    overflow="hidden"       // Aseguramos que la imagen no se desborde
    border="6px solid black" // Borde negro alrededor del avatar
    display="flex"          // Usamos Flexbox para centrar el contenido
    justifyContent="center" // Centrado horizontal
    alignItems="center"     // Centrado vertical
  >
    <Avatar
      name="John Doe"
      src="https://bit.ly/dan-abramov" // URL de la imagen del avatar
      size="full"             // El avatar ocupa todo el contenedor
      objectFit="cover"       // Ajusta la imagen sin distorsionarla
    />
  </Box>

  {/* Contenedor de la información */}
  <Box>
    {/* Nombre y Apellido */}
    <Text fontSize="6xl" fontWeight="bold" color="gray.800" marginBottom="30px">
      John Doe
    </Text>

    {/* Nacionalidad */}
    <Text fontSize="4xl" color="gray.600" marginBottom="40px">
      Nacionalidad: Argentino
    </Text>
  </Box>
</Box>


      {/* Contenedor del QR (lado derecho) */}
      <Box
  width="100%"            // El contenedor del QR ocupa el ancho completo
  height="100%"           // El QR ocupa el alto completo disponible
  display="flex"
  flexDirection="column"  // Coloca el texto y el QR en columna
  justifyContent="center" // Centra el contenido verticalmente
  alignItems="center"     // Centra el contenido horizontalmente
  transform="scale(1.5)"  // Escala el QR y el texto
>
  {/* Texto "Votar" */}
  <Text fontSize="4xl" fontWeight="bold" color="gray.800" marginBottom="20px">
    Votar
  </Text>

  {/* Componente del código QR */}
  <DynamicQRCode />
</Box>

    </Flex>
  );
};

export default IDCard;
