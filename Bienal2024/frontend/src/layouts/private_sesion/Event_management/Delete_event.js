import React, { useState, useEffect } from "react";
import {Box,Input,Table,Thead, Tbody, Tr,Th,Td, Button,useToast,Modal,ModalOverlay, ModalContent,ModalHeader,ModalBody, ModalFooter, HStack, Heading,Text,} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const DeleteEventManager = () => {
  const [eventos, setEventos] = useState([]);
  const [filteredEventos, setFilteredEventos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvento, setSelectedEvento] = useState(null);
  const [pin, setPin] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetch("http://localhost:8000/eventos/")
      .then((response) => response.json())
      .then((data) => {setEventos(data);setFilteredEventos(data);})
      .catch((error) => {
        console.error("Error fetching eventos:", error);
        toast({title: "Error",description: "No se pudieron cargar los eventos.",status: "error", duration: 5000,isClosable: true,position: "top",containerStyle: {fontSize: "lg",maxWidth: "600px", }, });
      });
  }, [toast]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredEventos( eventos.filter((evento) =>evento.nombre.toLowerCase().includes(query))
    );
  };

  const handleDelete = () => {
    if (pin !== "2024") {
      toast({title: "PIN incorrecto",description: "El PIN ingresado es incorrecto.",status: "error",duration: 5000, position: "top", isClosable: true,});
      return;
    }

    fetch(`http://localhost:8000/eventos/${selectedEvento.id}/`, { method: "DELETE", })
      .then(() => {
        toast({title: "Evento eliminado", description: `El evento "${selectedEvento.nombre}" fue eliminado con éxito.`, status: "success",duration: 5000, isClosable: true,position: "top" });
        setEventos((prev) => prev.filter((evento) => evento.id !== selectedEvento.id));
        setFilteredEventos((prev) =>prev.filter((evento) => evento.id !== selectedEvento.id) );
        setIsModalOpen(false);
        setPin("");
      })
      .catch((error) => {console.error("Error al eliminar el evento:", error);
        toast({title: "Error", description: "No se pudo eliminar el evento.",status: "error",duration: 5000,isClosable: true, position: "top"  });});
  };

  const openDeleteModal = (evento) => {
    setSelectedEvento(evento);
    setIsModalOpen(true);
  };

  return (
    <Box bg="gray.100" minH="100vh" w="100%" p={8}>
      <Box bg="white" borderRadius="lg" boxShadow="lg" w="100%" p={4} overflowX="auto">
        <Heading textAlign="center" mb={4} fontSize="2xl" color="red.600"> Eliminación de Eventos </Heading>
        <HStack justifyContent="center" mb={5}>
          <Input placeholder="Buscar eventos por nombre..." value={searchQuery} onChange={handleSearch}  borderRadius="md"focusBorderColor="red.400" w="100%"/>
        </HStack>
        <Table variant="simple" w="100%">
          <Thead bg="red.500">
            <Tr>
              <Th color="white">Nombre</Th>
              <Th color="white">Temática</Th>
              <Th color="white" textAlign="center"> Acciones </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredEventos.map((evento) => (
              <Tr key={evento.id}>
                <Td>{evento.nombre}</Td>
                <Td>{evento.tematica}</Td>
                <Td textAlign="center">
                  <Button leftIcon={<DeleteIcon />} colorScheme="red" size="sm" onClick={() => openDeleteModal(evento)}> Eliminar</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {selectedEvento && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center"> Confirmar eliminación de "{selectedEvento.nombre}"</ModalHeader>
            <ModalBody>
              <Text mb={4}>Ingrese el PIN para confirmar:</Text>
              <HStack justifyContent="center">
                <PinInput value={pin} onChange={(value) => setPin(value)} size="lg" otp>
                  <PinInputField m={2} /><PinInputField m={2} /> <PinInputField m={2} /> <PinInputField m={2} />
                </PinInput>
              </HStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleDelete}> Confirmar </Button>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}> Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default DeleteEventManager;
