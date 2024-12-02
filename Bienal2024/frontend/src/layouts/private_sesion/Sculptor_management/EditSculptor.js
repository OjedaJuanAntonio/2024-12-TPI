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
  HStack,
  Heading,
  Image,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

const EditSculptorManager = () => {
  const [escultores, setEscultores] = useState([]); // Lista completa de escultores
  const [filteredEscultores, setFilteredEscultores] = useState([]); // Lista filtrada
  const [searchQuery, setSearchQuery] = useState(""); // Texto del buscador
  const [selectedEscultor, setSelectedEscultor] = useState(null); // Escultor seleccionado para editar
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
  const toast = useToast();

  useEffect(() => {
    // Fetch de escultores
    fetch("http://localhost:8000/escultores/")
      .then((response) => response.json())
      .then((data) => {
        setEscultores(data);
        setFilteredEscultores(data); // Inicialmente sin filtros
      })
      .catch((error) => {
        console.error("Error fetching escultores:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los escultores.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, [toast]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredEscultores(
      escultores.filter((escultor) =>
        escultor.nombre.toLowerCase().includes(query)
      )
    );
  };

  const handleEdit = (escultor) => {
    setSelectedEscultor(escultor); // Guardar el escultor seleccionado
    setIsModalOpen(true); // Abrir el modal
  };

  const handleFieldChange = (field, value) => {
    setSelectedEscultor((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!selectedEscultor) return;

    // Mapeamos los datos para que coincidan con lo que espera el backend
    const updatedEscultor = {
      name: selectedEscultor.nombre, // mapear nombre a name
      lastName: selectedEscultor.apellido, // mapear apellido a lastName
      nacionalidad: selectedEscultor.nacionalidad,
      email: selectedEscultor.email,
      generalInfo: selectedEscultor.biografia || "", // Si no hay biografía, enviar un string vacío
      photo: selectedEscultor.photo || "", // Si no hay foto, enviar un string vacío
      phone: selectedEscultor.telefono || "", // Si no hay teléfono, enviar un string vacío
      DNI: selectedEscultor.dni || "", // Si no hay DNI, enviar un string vacío
    };

    fetch(`http://localhost:8000/escultores/${selectedEscultor.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEscultor),
    })
      .then((response) => response.json())
      .then((data) => {
        toast({
          title: "Escultor actualizado",
          description: `El escultor "${selectedEscultor.nombre} ${selectedEscultor.apellido}" fue actualizado con éxito.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setEscultores((prev) =>
          prev.map((escultor) =>
            escultor.id === selectedEscultor.id ? data : escultor
          )
        );
        setFilteredEscultores((prev) =>
          prev.map((escultor) =>
            escultor.id === selectedEscultor.id ? data : escultor
          )
        );
        setIsModalOpen(false); // Cerrar el modal
      })
      .catch((error) => {
        console.error("Error al editar el escultor:", error);
        toast({
          title: "Error",
          description: "No se pudo editar el escultor.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Box bg="gray.100" minH="100vh" w="100%" p={8}>
      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
        w="100%"
        p={4}
        overflowX="auto"
      >
        <Heading textAlign="center" mb={4} fontSize="2xl" color="teal.600">
          Edición de Escultores
        </Heading>
        <HStack justifyContent="center" mb={5}>
          <Input
            placeholder="Buscar escultores por nombre..."
            value={searchQuery}
            onChange={handleSearch}
            borderRadius="md"
            focusBorderColor="teal.400"
            w="100%"
          />
        </HStack>
        <Table variant="simple" w="100%">
          <Thead bg="teal.500">
            <Tr>
              <Th color="white">Nombre Completo</Th>
              <Th color="white">Nacionalidad</Th>
              <Th color="white" textAlign="center">Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredEscultores.map((escultor) => (
              <Tr key={escultor.id}>
                <Td>{escultor.nombre} {escultor.apellido}</Td>
                <Td>{escultor.nacionalidad}</Td>
                <Td textAlign="center">
                  <Button
                    leftIcon={<EditIcon />}
                    colorScheme="teal"
                    size="sm"
                    onClick={() => handleEdit(escultor)}
                  >
                    Editar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Modal para editar el escultor */}
      {selectedEscultor && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">Editar Escultor</ModalHeader>
            <ModalBody>
              <VStack spacing={4}>
                <Image
                  src={selectedEscultor.photo}
                  alt={selectedEscultor.nombre}
                  boxSize="150px"
                  borderRadius="md"
                  mb={4}
                />
                <FormControl>
                  <FormLabel>Nombre</FormLabel>
                  <ChakraInput
                    value={selectedEscultor.nombre}
                    onChange={(e) =>
                      handleFieldChange("nombre", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Apellido</FormLabel>
                  <ChakraInput
                    value={selectedEscultor.apellido}
                    onChange={(e) =>
                      handleFieldChange("apellido", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Biografía</FormLabel>
                  <ChakraInput
                    value={selectedEscultor.biografia || ""}
                    onChange={(e) =>
                      handleFieldChange("biografia", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>DNI</FormLabel>
                  <ChakraInput
                    value={selectedEscultor.dni || ""}
                    onChange={(e) =>
                      handleFieldChange("dni", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <ChakraInput
                    value={selectedEscultor.email || ""}
                    onChange={(e) =>
                      handleFieldChange("email", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Nacionalidad</FormLabel>
                  <ChakraInput
                    value={selectedEscultor.nacionalidad || ""}
                    onChange={(e) =>
                      handleFieldChange("nacionalidad", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Teléfono</FormLabel>
                  <ChakraInput
                    value={selectedEscultor.telefono || ""}
                    onChange={(e) =>
                      handleFieldChange("telefono", e.target.value)
                    }
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={handleSave}>
                Guardar
              </Button>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};




export default EditSculptorManager;
