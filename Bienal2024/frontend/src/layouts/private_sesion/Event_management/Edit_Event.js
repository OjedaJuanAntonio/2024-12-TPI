import React, { useState, useEffect } from "react";
import {Box,Input,Table,Thead,Tbody,Tr,Th,Td,Button,useToast,FormControl,FormLabel,VStack,Modal,ModalOverlay,ModalContent,ModalHeader, ModalBody,ModalFooter,HStack, Heading, Image,} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import Uploader from "../Uploader";

const EditEventManager = () => {
  const [eventos, setEventos] = useState([]);
  const [filteredEventos, setFilteredEventos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvento, setSelectedEvento] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploaderModalOpen, setIsUploaderModalOpen] = useState(false);
  const [selectedImageKey, setSelectedImageKey] = useState("");
  const toast = useToast();

  useEffect(() => {
    fetch("http://localhost:8000/eventos/")
      .then((response) => response.json())
      .then((data) => { setEventos(data);setFilteredEventos(data); })
      .catch((error) => { console.error("Error fetching eventos:", error);
        toast({ title: "Error",position: "top", description: "No se pudieron cargar los eventos.", status: "error",duration: 5000, isClosable: true, });});
  }, [toast]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredEventos(eventos.filter((evento) =>evento.nombre.toLowerCase().includes(query) )
    );
  };

  const handleEdit = (evento) => { setSelectedEvento(evento);setIsModalOpen(true);};

  const handleFieldChange = (field, value) => {
    setSelectedEvento((prev) => ({ ...prev,[field]: value,}));
  };

  const handleImageClick = (imageKey) => {setSelectedImageKey(imageKey);setIsModalOpen(false);  setIsUploaderModalOpen(true); };

  const handleImageUploaded = (newUrl) => {handleFieldChange(selectedImageKey, newUrl); setIsUploaderModalOpen(false);setIsModalOpen(true); };

  const handleSave = () => {
    if (!selectedEvento) return;

    fetch(`http://localhost:8000/eventos/${selectedEvento.id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(selectedEvento),
    })
      .then((response) => response.json())
      .then((data) => {
        toast({ title: "Evento actualizado", description: `El evento "${data.nombre}" fue actualizado con éxito.`,position: "top",status: "success", duration: 5000, isClosable: true, });
        setEventos((prev) => prev.map((evento) =>evento.id === selectedEvento.id ? data : evento));
        setFilteredEventos((prev) =>prev.map((evento) =>evento.id === selectedEvento.id ? data : evento) );
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error al editar el evento:", error);
        toast({ title: "Error",description: "No se pudo editar el evento.",position: "top", status: "error",duration: 5000,isClosable: true,});
      });
  };

  return (
    <Box bg="gray.100" minH="100vh" w="100%" p={2}>
      <Box bg="white" borderRadius="lg" boxShadow="lg" w="100%" p={1} overflowX="auto">
        <Heading textAlign="center" mb={4} fontSize="2xl" color="teal.600">Edición de Eventos </Heading>
        <HStack justifyContent="center" mb={5}>
          <Input placeholder="Buscar eventos por nombre..." value={searchQuery} onChange={handleSearch} borderRadius="md" focusBorderColor="teal.400" w="100%" />
        </HStack>
        <Table variant="simple" w="100%">
          <Thead bg="teal.500">
            <Tr>
              <Th color="white">Nombre</Th>
              <Th color="white">Ubicación</Th>
              <Th color="white" textAlign="center">Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredEventos.map((evento) => (
              <Tr key={evento.id}>
                <Td>{evento.nombre}</Td>
                <Td>{evento.ubicacion || "Sin ubicación"}</Td>
                <Td textAlign="center">
                  <Button leftIcon={<EditIcon />} colorScheme="teal" size="sm"onClick={() => handleEdit(evento)} >Editar</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {selectedEvento && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">Editar Evento</ModalHeader>
            <ModalBody>
              <VStack spacing={4}>
                <Image src={selectedEvento.img_evento}  alt="Imagen del evento"  boxSize="150px"  borderRadius="md"  onClick={() => handleImageClick("img_evento")}  _hover={{ cursor: "pointer", transform: "scale(1.05)" }} />
                <FormControl>
                  <FormLabel>Nombre</FormLabel>
                  <Input value={selectedEvento.nombre}  onChange={(e) =>handleFieldChange("nombre", e.target.value) }/>
                </FormControl>
                <FormControl>
                  <FormLabel>Temática</FormLabel>
                  <Input value={selectedEvento.tematica} onChange={(e) => handleFieldChange("tematica", e.target.value)}/>
                </FormControl>
                <FormControl>
                  <FormLabel>Ubicación</FormLabel>
                  <Input value={selectedEvento.ubicacion || ""} onChange={(e) =>handleFieldChange("ubicacion", e.target.value) } />
                </FormControl>
                <HStack spacing={4} width="100%">
                  <FormControl>
                    <FormLabel>Fecha de Inicio</FormLabel>
                    <Input type="date" value={selectedEvento.fecha_inicio || ""} onChange={(e) => handleFieldChange("fecha_inicio", e.target.value) }/>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Fecha de Fin</FormLabel>
                    <Input type="date" value={selectedEvento.fecha_fin || ""}min={selectedEvento.fecha_inicio || ""}onChange={(e) => handleFieldChange("fecha_fin", e.target.value) } />
                  </FormControl>
                </HStack>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={handleSave}>Guardar </Button>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}


      <Modal isOpen={isUploaderModalOpen} onClose={() => setIsUploaderModalOpen(false)}size="6xl" >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Subir Nueva Imagen</ModalHeader>
          <ModalBody>
            <Uploader setPhoto={(newUrl) => handleImageUploaded(newUrl)} label="Subir nueva imagen para el evento"/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EditEventManager;
