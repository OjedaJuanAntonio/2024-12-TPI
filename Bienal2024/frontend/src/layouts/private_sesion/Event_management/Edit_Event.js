import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Input as ChakraInput,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

const EditEventManager = () => {
  const [eventos, setEventos] = useState([]); // Lista completa de eventos
  const [filteredEventos, setFilteredEventos] = useState([]); // Lista filtrada
  const [searchQuery, setSearchQuery] = useState(""); // Texto del buscador
  const [selectedEvento, setSelectedEvento] = useState(null); // Evento seleccionado para editar
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

  const handleEdit = (evento) => {
    setSelectedEvento(evento); // Guardar el evento seleccionado
    setIsModalOpen(true); // Abrir el modal
  };

  const handleFieldChange = (field, value) => {
    setSelectedEvento((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!selectedEvento) return;

    fetch(`http://localhost:8000/eventos/${selectedEvento.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedEvento),
    })
      .then((response) => response.json())
      .then((data) => {
        toast({
          title: "Evento actualizado",
          description: `El evento "${data.nombre}" fue actualizado con éxito.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setEventos((prev) =>
          prev.map((evento) =>
            evento.id === selectedEvento.id ? data : evento
          )
        );
        setFilteredEventos((prev) =>
          prev.map((evento) =>
            evento.id === selectedEvento.id ? data : evento
          )
        );
        setIsModalOpen(false); // Cerrar el modal
      })
      .catch((error) => {
        console.error("Error al editar el evento:", error);
        toast({
          title: "Error",
          description: "No se pudo editar el evento.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
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
                  colorScheme="blue"
                  size="sm"
                  onClick={() => handleEdit(evento)}
                >
                  Editar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal para editar el evento */}
      {selectedEvento && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Evento</ModalHeader>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Nombre</FormLabel>
                  <ChakraInput
                    value={selectedEvento.nombre}
                    onChange={(e) =>
                      handleFieldChange("nombre", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Temática</FormLabel>
                  <ChakraInput
                    value={selectedEvento.tematica}
                    onChange={(e) =>
                      handleFieldChange("tematica", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Descripción</FormLabel>
                  <ChakraInput
                    value={selectedEvento.descripcion || ""}
                    onChange={(e) =>
                      handleFieldChange("descripcion", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Ubicacion</FormLabel>
                  <ChakraInput
                    value={selectedEvento.ubicacion || ""}
                    onChange={(e) =>
                      handleFieldChange("ubicacion", e.target.value)
                    }
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="teal"
                mr={3}
                onClick={handleSave}
              >
                Guardar
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

export default EditEventManager;
