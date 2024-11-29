import React, { useState, useEffect } from "react";
import {Box,Input,Table,Thead,Tbody,Tr,Th,Td,Button,useToast,Modal,ModalOverlay,ModalContent, ModalHeader,ModalBody,
  ModalFooter,Text,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";


const DeleteEventManager = () => {
  const [eventos, setEventos] = useState([]); 
  const [filteredEventos, setFilteredEventos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvento, setSelectedEvento] = useState(null); // Evento seleccionado para eliminar
  const [pin, setPin] = useState(""); // PIN ingresado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
  const toast = useToast();

  useEffect(() => {
    // Fetch de eventos
    fetch("http://localhost:8000/eventos/")
      .then((response) => response.json())
      .then((data) => {
        setEventos(data);
        setFilteredEventos(data); // Inicialmente sin filtros
      })
      .catch((error) => {
        console.error("Error fetching eventos:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los eventos.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, [toast]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredEventos(
      eventos.filter((evento) =>
        evento.nombre.toLowerCase().includes(query)
      )
    );
  };

  const handleDelete = () => {
    if (pin !== "2024") {
      toast({
        title: "PIN incorrecto",
        description: "El PIN ingresado es incorrecto.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    fetch(`http://localhost:8000/eventos/${selectedEvento.id}/`, {
      method: "DELETE",
    })
      .then(() => {
        toast({
          title: "Evento eliminado",
          description: `El evento "${selectedEvento.nombre}" fue eliminado con éxito.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setEventos((prev) =>
          prev.filter((evento) => evento.id !== selectedEvento.id)
        );
        setFilteredEventos((prev) =>
          prev.filter((evento) => evento.id !== selectedEvento.id)
        );
        setIsModalOpen(false); // Cerrar el modal
        setPin(""); 
      })
      .catch((error) => {
        console.error("Error al eliminar el evento:", error);
        toast({
          title: "Error",
          description: "No se pudo eliminar el evento.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const openDeleteModal = (evento) => {
    setSelectedEvento(evento); // Guardar el evento seleccionado
    setIsModalOpen(true); // Abrir el modal
  };

  return (
    <Box p={4}>
      <Input
        placeholder="Buscar eventos por nombre..."
        value={searchQuery}
        onChange={handleSearch}
        mb={4}
      />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Temática</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredEventos.map((evento) => (
            <Tr key={evento.id}>
              <Td>{evento.nombre}</Td>
              <Td>{evento.tematica}</Td>
              <Td>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => openDeleteModal(evento)}
                >
                  Eliminar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal para confirmar la eliminación */}
      {selectedEvento && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              ¿Está seguro de eliminar "{selectedEvento.nombre}"?
            </ModalHeader>
            <ModalBody>
    
                    <Text>Ingrese el PIN para confirmar:</Text>
                    <PinInput
                    value={pin}
                    onChange={(value) => setPin(value)}
                    size="lg"
                    otp
                    >
                    <PinInputField m={2}/>
                    <PinInputField m={2}/>
                    <PinInputField m={2}/>
                    <PinInputField m={2} />
                    </PinInput>
    
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                mr={3}
                onClick={handleDelete}
              >
                Confirmar
              </Button>
              <Button
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default DeleteEventManager;
