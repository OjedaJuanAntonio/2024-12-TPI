import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Avatar, Text, Spinner, useToast } from '@chakra-ui/react';
import 'animate.css';



function LogForm() {
    
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  // const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  // const [profilePhoto, setProfilePhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const toast = useToast();

  // const handlePhotoChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) { setProfilePhoto(URL.createObjectURL(file));}};

    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);
  
      const formData = {
          dni,
          email,
          username,
          telefono
      };
  
      try {
          const response = await fetch("https://127.0.0.1:8000/user/register", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
          });
  
          if (response.ok) {
              const data = await response.json();
              setIsLoading(false);
  
              toast({
                  title: `¡Felicidades, ${username}!`,
                  description: "Tu usuario fue registrado con éxito.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                  position: "top",
              });
          } else {
              const errorData = await response.json();
              toast({
                  title: "Error en el registro",
                  description: errorData.message || "Hubo un problema en el registro.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                  position: "top",
              });
              setIsLoading(false);
          }
      } catch (error) {
          console.error("Error en el registro:", error);
          toast({
              title: "Error en el registro",
              description: "No se pudo conectar con el servidor.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
          });
          setIsLoading(false);
      }
  }


  return (
    <Box  className="animate__animated animate__zoomIn" maxW="md" mx="auto"p={4} borderWidth="1px"  borderRadius="lg"sx={{ backdropFilter: 'blur(15px)' }}>
      <Heading as="h2" size="lg" textAlign="center" mb={6}>Nuevo Usuario </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
            {/* <FormControl id="dni" isRequired>
              <FormLabel>DNI</FormLabel>
              <Input type="number" placeholder="Ingrese su DNI" value={dni}  onChange={(e) => setDni(e.target.value)} backgroundColor='white'/>
            </FormControl> */}

          <FormControl id="email" isRequired>
            <FormLabel >Email</FormLabel>
            <Input type="email" placeholder="Ingrese su Email" value={email} onChange={(e) => setEmail(e.target.value)} backgroundColor='white'/>
          </FormControl>

          <FormControl id="nombre" isRequired>
            <FormLabel >Usuario</FormLabel>
            <Input type="text" placeholder="Ingrese su Nombre" value={username} onChange={(e) => setUsername(e.target.value)} backgroundColor='white'/>
          </FormControl>
          
          <FormControl id="nombre" isRequired>
            <FormLabel >Contraseña</FormLabel>
            <Input type="text" placeholder="Ingrese una contraseña" value={username} onChange={(e) => setUsername(e.target.value)} backgroundColor='white'/>
          </FormControl>

          {/* <FormControl id="apellido" isRequired>
            <FormLabel >Apellido</FormLabel>
            <Input type="text" placeholder="Ingrese su Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} backgroundColor='white'/>
          </FormControl> */}

          {/* <FormControl id="telefono" isRequired>
            <FormLabel >Teléfono</FormLabel>
            <Input backgroundColor='white'type="tel" placeholder="Ingrese su Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
          </FormControl> */}

          {/* <FormControl id="fotoPerfil">
            <FormLabel color='white'>Foto de Perfil</FormLabel>
            <Input type="file" accept="image/*" onChange={handlePhotoChange} backgroundColor='white' />
            {profilePhoto && (<Box textAlign="center" mt={4}>
                                    <Avatar src={profilePhoto} size="xl" />
                                 <Text fontSize="sm" >Foto de perfil seleccionada</Text>
                             </Box> )}
          </FormControl> */}

          <Button colorScheme="teal" type="submit" width="full" isDisabled={isLoading}>
            {isLoading ? <Spinner size="sm" /> : "Registrar"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default LogForm;
