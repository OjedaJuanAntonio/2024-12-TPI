import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  Heading,
  Text,
  useToast,
  Image,
} from "@chakra-ui/react";
import Loginbackground from "../../../assets/Loginbackground.jpg";
import Uploader from "../Uploader";
import "animate.css";

const Sculptor_register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [email, setEmail] = useState("");
  const [generalInfo, setGeneralInfo] = useState("");
  const [photo, setPhoto] = useState(null);
  const [phone, setPhone] = useState("");
  const [DNI, setDNI] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!name || !lastName || !nacionalidad || !email || !generalInfo) {
      toast({
        title: "Todos los campos son obligatorios",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    const sculptorData = {
      name,
      lastName,
      nacionalidad,
      email,
      generalInfo,
      phone,
      DNI,
    };

    try {
      const response = await fetch("http://localhost:8000/escultores/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sculptorData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al enviar los datos");
      }

      toast({
        title: "Formulario enviado con éxito",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Limpia el formulario
      setName("");
      setLastName("");
      setNacionalidad("");
      setEmail("");
      setGeneralInfo("");
      setPhoto(null);
      setPhone("");
      setDNI("");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      toast({
        title: "Error al enviar el formulario",
        description: error.message || "Hubo un problema al enviar los datos.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          Registro de Escultor
        </Heading>
        <Text mb={6} fontSize="lg" color="gray.600" textAlign="center">
          Complete los campos para registrar un nuevo escultor.
        </Text>

        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={5}>
            <FormControl id="name" isRequired>
              <FormLabel color="teal.500">Nombre/ FirstName</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingrese el Nombre"
                borderColor="teal.300"
                _hover={{ borderColor: "teal.400" }}
              />
            </FormControl>
            <FormControl id="lastName" isRequired>
              <FormLabel color="teal.500">Apellido/ LastName</FormLabel>
              <Input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ingrese el Apellido"
                borderColor="teal.300"
                _hover={{ borderColor: "teal.400" }}
              />
            </FormControl>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={5}>
            <FormControl id="DNI" isRequired>
              <FormLabel color="teal.500">DNI/ID number</FormLabel>
              <Input
                type="number"
                value={DNI}
                onChange={(e) => setDNI(e.target.value)}
                placeholder="Ingrese el DNI"
                borderColor="teal.300"
                _hover={{ borderColor: "teal.400" }}
              />
            </FormControl>
            <FormControl id="nacionalidad" isRequired>
              <FormLabel color="teal.500">Nacionalidad/Nationality</FormLabel>
              <Input
                type="text"
                value={nacionalidad}
                onChange={(e) => setNacionalidad(e.target.value)}
                placeholder="Ingrese la nacionalidad del escultor"
                borderColor="teal.300"
                _hover={{ borderColor: "teal.400" }}
              />
            </FormControl>
          </SimpleGrid>

          <FormControl id="phone" isRequired>
            <FormLabel color="teal.500">Telefono/ Phone</FormLabel>
            <Input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ingrese el teléfono"
              borderColor="teal.300"
              _hover={{ borderColor: "teal.400" }}
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel color="teal.500">Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese el email"
              borderColor="teal.300"
              _hover={{ borderColor: "teal.400" }}
            />
          </FormControl>

          <FormControl id="generalInfo" isRequired mb={2}>
            <FormLabel color="teal.500">Biografía</FormLabel>
            <Textarea
              value={generalInfo}
              onChange={(e) => setGeneralInfo(e.target.value)}
              placeholder="Escribir información general sobre el escultor"
              borderColor="teal.300"
              _hover={{ borderColor: "teal.400" }}
              rows={4}
            />
          </FormControl>

          <Uploader setPhoto={setPhoto} />

          {photo && (
            <Box mt={2} textAlign="center">
              <Text color="teal.600" fontSize="md">
                {photo.name}
              </Text>
              <Image
                src={URL.createObjectURL(photo)}
                alt="Vista previa de la imagen"
                maxW="200px"
                mt={2}
                borderRadius="full"
                mx="auto"
                objectFit="cover"
              />
            </Box>
          )}

          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            width="full"
            mt={6}
            _hover={{ bg: "teal.500" }}
            boxShadow="md"
            isLoading={isSubmitting}
            loadingText="Enviando"
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Sculptor_register;
