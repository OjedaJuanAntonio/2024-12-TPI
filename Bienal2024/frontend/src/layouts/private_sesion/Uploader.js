import React from "react";
import { Box, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { useLocation } from 'react-router-dom';
import { useDropzone } from "react-dropzone";

const Uploader = ({ setPhoto }) => {
const location = useLocation();
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".png, .jpg, .jpeg",
    maxSize: 5 * 1024 * 1024,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setPhoto(file); // Solo se pasa el archivo al padre, no hay previsualización aquí
    },
  });


  return (
    <FormControl id="photo" isRequired mb={6}>
      {location.pathname === '/mainsesion' && (<FormLabel color="teal.500">Foto de perfil</FormLabel>)}
      <Box
        {...getRootProps()}
        border="2px dashed"
        borderColor="teal.300"
        p={6}
        textAlign="center"
        _hover={{ borderColor: "teal.400", cursor: "pointer" }}
        bg="gray.50"
        borderRadius="md"
      >
        <input {...getInputProps()} />
        <Text color="teal.500" fontSize="lg" fontWeight="semibold">
          Arrastra y suelta la imagen aquí, o haz clic para seleccionar
        </Text>
        <Text color="gray.500" fontSize="sm">
          Archivos permitidos: .png, .jpg hasta 5MB
        </Text>
      </Box>
    </FormControl>
  );
};

export default Uploader;
