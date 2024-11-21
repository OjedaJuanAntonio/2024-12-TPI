import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Loginbackground from "../../../assets/Loginbackground.jpg";

const EventRegister = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    descripcion: "",
    nombre: "",
    tematica: "",
    ubicacion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormComplete = () => {
    return formData.descripcion && formData.nombre && formData.tematica && formData.ubicacion;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar recarga de la página
    fetch("http://localhost:8000/eventos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo registrar el evento");
        }
        return response.json();
      })
      .then((data) => {
        toast({
          title: "Evento registrado",
          description: `El evento "${data.nombre}" ha sido registrado exitosamente.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setFormData({
          descripcion: "",
          nombre: "",
          tematica: "",
          ubicacion: "",
        });
      })
      .catch((error) => {
        console.error("Error al registrar el evento:", error);
        toast({
          title: "Error",
          description: "No se pudo registrar el evento.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const inputBg = useColorModeValue("gray.100", "gray.600");

  return (
    <div
      style={{
        backgroundImage: `url(${Loginbackground})`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        maxW="lg"
        mx="auto"
        mt={10}
        mb={5}
        p={8}
        borderRadius="lg"
        boxShadow="xl"
        bg="white"
        border="1px solid #e2e8f0"
        className="animate__animated animate__zoomIn"
      >
        <Heading as="h1" size="xl" mb={4} textAlign="center" color="teal.600">
          Registro de Evento
        </Heading>
        <Text mb={6} fontSize="lg" color="gray.600" textAlign="center">
          Completa los datos del evento
        </Text>

        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>
            <FormControl id="nombre" isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre del evento"
                bg={inputBg}
              />
            </FormControl>

            <FormControl id="tematica" isRequired>
              <FormLabel>Temática</FormLabel>
              <Input
                name="tematica"
                value={formData.tematica}
                onChange={handleChange}
                placeholder="Temática principal del evento"
                bg={inputBg}
              />
            </FormControl>

            <FormControl id="ubicacion" isRequired>
              <FormLabel>Ubicación</FormLabel>
              <Input
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                placeholder="Ubicación del evento"
                bg={inputBg}
              />
            </FormControl>

            <FormControl id="descripcion" isRequired>
              <FormLabel>Descripción</FormLabel>
              <Textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Describe el evento"
                bg={inputBg}
              />
            </FormControl>

            <Button
              colorScheme="teal"
              type="submit"
              width="full"
              mt={4}
              _hover={{ bg: "teal.600" }}
              boxShadow="md"
              disabled={!isFormComplete()}
            >
              Enviar
            </Button>
          </VStack>
        </form>
      </Box>
    </div>
  );
};

export default EventRegister;
