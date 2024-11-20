import React, { useState, useEffect } from 'react';
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
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react';
import Preview from './Preview';
import Loginbackground from '../../assets/Loginbackground.jpg';
import Uploader from './Uploader';

const Sculpture_register = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    id_escultor: '',
    id_evento: '',
    titulo: '',
    Intencion: '',
    tematica: '',
  });
  const [escultores, setEscultores] = useState([]); // Estado para los escultores

  // Obtener escultores al cargar el componente
  useEffect(() => {
    fetch('http://localhost:8000/escultores/')
      .then(response => response.json())
      .then(data => setEscultores(data))
      .catch(error => console.error('Error al obtener escultores:', error));
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const isFormComplete = () => {
    return formData.id_escultor && formData.id_evento  && formData.titulo && formData.tematica;
  };

  const inputBg = useColorModeValue('gray.100', 'gray.600');

  return (
    <div style={{ backgroundImage: `url(${Loginbackground})`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box maxW="lg" mx="auto" mt={10} mb={5} p={8} borderRadius="lg" boxShadow="xl" bg="white" border="1px solid #e2e8f0" className="animate__animated animate__zoomIn">
        <Heading as="h1" size="xl" mb={4} textAlign="center" color="teal.600">Registro de Escultura</Heading>
        <Text mb={6} fontSize="lg" color="gray.600" textAlign="center">Completa los datos de la escultura para el evento</Text>

        <form >
          <VStack spacing={5}>           <FormControl id="id_escultor" isRequired>
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

            <FormControl id="titulo" isRequired>
              <FormLabel>Título</FormLabel>
              <Input name="titulo" onChange={handleChange} placeholder="Título de la escultura" bg={inputBg} />
            </FormControl>

            <FormControl id="Intencion">
              <FormLabel>Intención</FormLabel>
              <Textarea name="Intencion" onChange={handleChange} placeholder="Describe la intención de la obra" bg={inputBg}/>
            </FormControl>

            <FormControl id="tematica" isRequired>
              <FormLabel>Material Principal</FormLabel>
              <Select name="tematica" onChange={handleChange} bg={inputBg} placeholder="Selecciona un material">
                <option value="Piedra">Piedra</option>
                <option value="Madera">Madera</option>
                <option value="Metales">Metales</option>
                <option value="Plasticos">Plasticos</option>
                <option value="Yeso">Yeso</option>
              </Select>
            </FormControl>
            <Uploader/>

            <Button colorScheme="teal" type="submit" width="full" mt={4} _hover={{ bg: 'teal.600' }} boxShadow="md" onClick={onOpen} disabled={!isFormComplete()}>
              Vista Previa
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl" motionPreset="slideInBottom">
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                  <Preview formData={formData} />
                </ModalBody>
                <ModalFooter>
                  <Button variant="outline" size="sm"> Enviar </Button>
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
