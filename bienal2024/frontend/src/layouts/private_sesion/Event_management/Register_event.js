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
  HStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Loginbackground from "../../../assets/Loginbackground.webp";
import Uploader from "../Uploader";

const EventRegister = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    tematica: "",
    ubicacion: "",
    fecha_inicio: "",
    fecha_fin: "",
    "img_evento":"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormComplete = () => {
    return (
      formData.nombre &&
      formData.descripcion &&
      formData.tematica &&
      formData.ubicacion &&
      formData.fecha_inicio &&
      formData.fecha_fin &&
      formData.img_evento
    );
  };


  const handleUploaderChange = (key, url) => {
    setFormData({ ...formData, [key]: url });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const fechaInicio = new Date(formData.fecha_inicio);
    const fechaFin = new Date(formData.fecha_fin);

    if (fechaFin <= fechaInicio) {
      toast({
        title: "Error",
        description: "La fecha de fin debe ser posterior a la fecha de inicio.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

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
          fecha_inicio: "",
          fecha_fin: "",
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
        maxW="3xl"
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
          Completa los datos del nuevo evento
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

            <HStack spacing={5} width="100%">
              <FormControl id="fecha_inicio" isRequired>
                <FormLabel>Fecha de Inicio</FormLabel>
                <Input
                  type="date"
                  name="fecha_inicio"
                  value={formData.fecha_inicio}
                  onChange={handleChange}
                  bg={inputBg}
                />
              </FormControl>

              <FormControl id="fecha_fin" isRequired>
                <FormLabel>Fecha de Fin</FormLabel>
                <Input
                  type="date"
                  name="fecha_fin"
                  value={formData.fecha_fin}
                  min={formData.fecha_fin|| ""}
                  onChange={handleChange}
                  bg={inputBg}
                />
              </FormControl>
            </HStack>

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
            <Uploader setPhoto={(url) => handleUploaderChange('img_evento', url)} label="Subir del Evento" folder="events_pictures" defaultUrl={formData.img_evento} />

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
