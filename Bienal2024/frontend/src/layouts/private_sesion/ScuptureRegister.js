import React, { useState } from 'react';
import {Box,Button,FormControl,FormLabel,Input,Select,Textarea,VStack,Heading,Text,useColorModeValue, SimpleGrid,useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import Preview from './Preview';
import Loginbackground from '../../assets/Loginbackground.jpg';
import Uploader from './Uploader';


const Scupture_register = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({ id_escultor: '',id_evento: '',fecha_inicio: '',fecha_fin: '',titulo: '',Intencion: '',tematica: '',});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(formData.fecha_inicio) > new Date(formData.fecha_fin)) {
      alert("La fecha de fin debe ser posterior a la fecha de inicio.");
      return;
    }
    console.log(formData);
  };


  const isFormComplete = () => {
    return (formData.id_escultor && formData.id_evento && formData.fecha_inicio && formData.fecha_fin && formData.titulo && formData.tematica );
  };


  const inputBg = useColorModeValue('gray.100', 'gray.600');

  return (
    <div style={{ backgroundImage: `url(${Loginbackground})`,display: 'flex',justifyContent: 'center', alignItems: 'center', }}>
    <Box maxW="lg" mx="auto" mt={10} mb={5} p={8} borderRadius="lg" boxShadow="xl"bg="white" border="1px solid #e2e8f0" className="animate__animated animate__zoomIn">
      <Heading as="h1" size="xl" mb={4} textAlign="center" color="teal.600">Registro de Escultura </Heading>
      <Text mb={6} fontSize="lg" color="gray.600" textAlign="center">Completa los datos de la escultura para el evento</Text>
    
      <form onSubmit={handleSubmit}>
        <VStack spacing={5}>
          <FormControl id="id_escultor" isRequired>
            <FormLabel>Escultor</FormLabel>
            <Select name="id_escultor" onChange={handleChange} bg={inputBg} placeholder="Selecciona un escultor">
              <option value="1">Escultor 1</option>
              <option value="2">Escultor 2</option>
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

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%" alignItems="center">
            <FormControl id="fecha_inicio" isRequired>
              <FormLabel>Fecha de Inicio</FormLabel>
              <Input type="date" name="fecha_inicio" onChange={handleChange}bg={inputBg}/>
            </FormControl>

            <FormControl id="fecha_fin" isRequired>
              <FormLabel>Fecha de Fin</FormLabel>
              <Input type="date" name="fecha_fin"onChange={handleChange} bg={inputBg}/>
            </FormControl>
          </SimpleGrid>

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

          <Button colorScheme="teal"type="submit"width="full"mt={4} _hover={{ bg: 'teal.600' }} boxShadow="md" onClick={onOpen} disabled={!isFormComplete()}>
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

export default Scupture_register;
