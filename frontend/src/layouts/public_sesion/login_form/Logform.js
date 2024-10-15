import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Avatar, Text, Spinner, useToast } from '@chakra-ui/react';

function LogForm() {
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const toast = useToast();

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("DNI:", dni);
    console.log("Email:", email);
    console.log("Nombre:", nombre);
    console.log("Apellido:", apellido);
    console.log("Teléfono:", telefono);
    console.log("Foto de Perfil:", profilePhoto);


    setTimeout(() => {
      setIsLoading(false); 
      toast({ title: `¡Felicidades, ${nombre}!`, description: "Tu usuario fue registrado con éxito.", status: "success", duration: 5000, isClosable: true, position: "top",}); }, 3000);  
  };

  return (
    <Box maxW="md" mx="auto" p={4} borderWidth="1px" borderRadius="lg" sx={{backdropFilter: 'blur(15px)' }}>
      <Heading as="h2" size="lg" textAlign="center" mb={6} color='white'>Nuevo Usuario </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="dni" isRequired>
            <FormLabel color='white'>DNI</FormLabel>
            <Input
              type="number"
              placeholder="Ingrese su DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              backgroundColor='white'
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel color='white'>Email</FormLabel>
            <Input
              type="email"
              placeholder="Ingrese su Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              backgroundColor='white'
            />
          </FormControl>

          <FormControl id="nombre" isRequired>
            <FormLabel color='white'>Nombre</FormLabel>
            <Input
              type="text"
              placeholder="Ingrese su Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              backgroundColor='white'
            />
          </FormControl>

          <FormControl id="apellido" isRequired>
            <FormLabel color='white' >Apellido</FormLabel>
            <Input
              type="text"
              placeholder="Ingrese su Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              backgroundColor='white'
            />
          </FormControl>

          <FormControl id="telefono" isRequired>
            <FormLabel color='white'>Teléfono</FormLabel>
            <Input backgroundColor='white'
              type="tel"
              placeholder="Ingrese su Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </FormControl>

          <FormControl id="fotoPerfil">
            <FormLabel color='white'>Foto de Perfil</FormLabel>
            <Input type="file" accept="image/*" onChange={handlePhotoChange} backgroundColor='white' />
            {profilePhoto && (
              <Box textAlign="center" mt={4}>
                <Avatar src={profilePhoto} size="xl" />
                <Text fontSize="sm" color="white">Foto de perfil seleccionada</Text>
              </Box>
            )}
          </FormControl>

          <Button colorScheme="teal" type="submit" width="full" isDisabled={isLoading}>
            {isLoading ? <Spinner size="sm" /> : "Registrar"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default LogForm;
