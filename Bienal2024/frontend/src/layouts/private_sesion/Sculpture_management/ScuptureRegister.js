import React, {useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  SimpleGrid,
  Flex,
  Image,
  IconButton,
  useToast
} from '@chakra-ui/react';
import { FaShareAlt } from 'react-icons/fa';
import Loginbackground from '../../../assets/Loginbackground.webp';
import Uploader from '../Uploader';
import { useAuth0 } from '@auth0/auth0-react';


const Sculpture_register = () => {
  const { user } = useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [formData, setFormData] = useState({
    id_escultor: '',
    id_evento: '',
    titulo: '',
    intencion: '',
    material_principal: '', // Cambiado de "tematica" a "material_principal"
    url_imagen_1: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxHD_z3WSlVZ3aN3C_OZr30H84H7j7ugMtqczgxqWgQLdzkaW4_28IY7QGALl713ecjQQ&usqp=CAU',
    url_imagen_2: 'https://img.freepik.com/fotos-premium/escultura-surrealista-naturaleza-hojas_777078-157034.jpg',
    url_imagen_3: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREa8U6gUgdDFhtEqdhmzKDBXqs_lb70NOqrYIhZh5jGoG-hWEUD8DiWArdpUhofip8RZE&usqp=CAU',
  });
  const [escultores, setEscultores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/escultores/')
    .then(response => response.json())
    .then(data => setEscultores(data))
    .catch(error => console.error('Error al obtener escultores:', error));
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleUploaderChange = (key, url) => {
    setFormData({ ...formData, [key]: url });
  };
  
  const isFormComplete = () => {
    return formData.id_escultor && formData.id_evento && formData.titulo && formData.material_principal;
  };
  
  const handleSubmit = async () => {
    try {
      const id = user?.sub;  // Muestra el objeto del usuario completo
      var savedUser = await fetch(`http://localhost:8000/usuarios/${id}`);
      savedUser = await savedUser.json(); // Convierte la respuesta a JSON
      console.log(savedUser.type_user); // Muestra el objeto del usuario completo
      const updatedFormData = {
        ...formData,
        type_user: savedUser.type_user, // Incluye el tipo de usuario
      };
      
      const response = await fetch('http://localhost:8000/esculturas/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData),
      });
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      toast({
        title: 'Escultura registrada',
        description: 'La escultura se ha registrado correctamente.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
      setFormData({
        id_escultor: '',
        id_evento: '',
        titulo: '',
        intencion: '',
        material_principal: '',
        url_imagen_1: '',
        url_imagen_2: '',
        url_imagen_3: '',
      });
    } catch (error) {
      console.error('Error al registrar la escultura:', error);
      toast({
        title: 'Error',
        description: 'No se pudo registrar la escultura.',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const inputBg = useColorModeValue('gray.100', 'gray.600');

  return (
    <div style={{ backgroundImage: `url(${Loginbackground})`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box maxW="lg" mx="auto" mt={10} mb={5} p={8} borderRadius="lg" boxShadow="xl" bg="white" border="1px solid #e2e8f0" className="animate__animated animate__zoomIn">
        <Heading as="h1" size="xl" mb={4} textAlign="center" color="teal.600">Registro de Escultura</Heading>
        <Text mb={6} fontSize="lg" color="gray.600" textAlign="center">Completa los datos de la escultura para el evento</Text>
        <form>
          <VStack spacing={5}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl id="id_escultor" isRequired>
                <FormLabel>Escultor</FormLabel>
                <Select name="id_escultor" onChange={handleChange} bg={inputBg} placeholder="Selecciona un escultor">
                  {escultores.map((escultor) => (
                    <option key={escultor.id} value={escultor.id}>{escultor.nombre} {escultor.apellido}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl id="id_evento" isRequired>
                <FormLabel>Evento</FormLabel>
                <Select name="id_evento" onChange={handleChange} bg={inputBg} placeholder="Selecciona un evento">
                  <option value="1">Bienal 2024</option>
                  <option value="2">Bienal 2023</option>
                  <option value="3">Bienal 2022</option>
                </Select>
              </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl id="titulo" isRequired>
                <FormLabel>Título</FormLabel>
                <Input name="titulo" onChange={handleChange} placeholder="Título de la escultura" bg={inputBg} />
              </FormControl>

              <FormControl id="material_principal" isRequired>
                <FormLabel>Material Principal</FormLabel>
                <Select name="material_principal" onChange={handleChange} bg={inputBg} placeholder="Selecciona un material">
                  <option value="Piedra">Piedra</option>
                  <option value="Madera">Madera</option>
                  <option value="Metales">Metales</option>
                  <option value="Plasticos">Plasticos</option>
                  <option value="Yeso">Yeso</option>
                </Select>
              </FormControl>
            </SimpleGrid>

            <FormControl id="intencion">
              <FormLabel>Intención</FormLabel>
              <Textarea name="intencion" onChange={handleChange} placeholder="Describe la intención de la obra" bg={inputBg} />
            </FormControl>

            <Uploader setPhoto={(url) => handleUploaderChange('url_imagen_1', url)} label="Subir foto Principal" folder="sculpture_pictures" defaultUrl={formData.url_imagen_1} />
            <Uploader setPhoto={(url) => handleUploaderChange('url_imagen_2', url)} label="Subir Segunda Foto" folder="sculpture_pictures" defaultUrl={formData.url_imagen_2} />
            <Uploader setPhoto={(url) => handleUploaderChange('url_imagen_3', url)} label="Subir Tercera Foto" folder="sculpture_pictures" defaultUrl={formData.url_imagen_3} />

            <Button colorScheme="teal" type="button" width="full" mt={4} _hover={{ bg: 'teal.600' }} boxShadow="md" onClick={onOpen} disabled={!isFormComplete()}>
              Vista Previa
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl" motionPreset="slideInBottom">
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                  <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
                    <Box maxW="sm" borderRadius="lg" overflow="hidden" boxShadow="xl" bg="white" justifyContent="center">
                      <Image src={formData.url_imagen_1} alt="Imagen del evento" width="100%" height="200px" objectFit="cover" />
                      <Box p="4">
                        <Text fontWeight="bold" fontSize="lg" noOfLines={1}>{formData.titulo}</Text>
                        <Text mt="2" fontSize="sm" color="gray.600" noOfLines={2}>{formData.intencion}</Text>
                      </Box>
                      <Box display="flex" justifyContent="flex-end" alignItems="center" px="4" pb="4">
                        <IconButton aria-label="Compartir" icon={<FaShareAlt />} variant="ghost" color="gray.600" />
                      </Box>
                    </Box>
                  </Flex>
                </ModalBody>
                <ModalFooter>
                  <Button variant="outline" size="sm" onClick={handleSubmit}>Enviar</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </VStack>
        </form>
      </Box>
    </div>
  );
};

export default Sculpture_register;
