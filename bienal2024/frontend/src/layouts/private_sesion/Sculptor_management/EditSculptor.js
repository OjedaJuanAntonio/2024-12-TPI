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
  useBreakpointValue,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

const EditSculptorManager = () => {
  const [escultores, setEscultores] = useState([]);
  const [filteredEscultores, setFilteredEscultores] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEscultor, setSelectedEscultor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  const modalSize = useBreakpointValue({ base: "full", md: "lg" });
  const imageSize = useBreakpointValue({ base: "100px", md: "150px" });

  useEffect(() => {
    fetch("http://localhost:8000/escultores/")
      .then((response) => response.json())
      .then((data) => {
        setEscultores(data);
        setFilteredEscultores(data);
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
    setSelectedEscultor(escultor);
    setIsModalOpen(true);
  };

  const handleFieldChange = (field, value) => {
    setSelectedEscultor((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!selectedEscultor) return;

    const updatedEscultor = {
      name: selectedEscultor.nombre,
      lastName: selectedEscultor.apellido,
      nacionalidad: selectedEscultor.nacionalidad,
      email: selectedEscultor.email,
      generalInfo: selectedEscultor.biografia || "",
      photo: selectedEscultor.photo || "",
      phone: selectedEscultor.telefono || "",
      DNI: selectedEscultor.dni || "",
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
        setIsModalOpen(false);
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
    <Box bg="gray.100" minH="100vh" w="100%" p={4}>
      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
        w="100%"
        p={3}
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
            w={{ base: "100%", md: "50%" }}
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

      {selectedEscultor && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size={modalSize}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">Editar Escultor</ModalHeader>
            <ModalBody>
              <VStack spacing={4}>
                <Image
                  src={selectedEscultor.photo}
                  alt={selectedEscultor.nombre}
                  boxSize={imageSize}
                  borderRadius="md"
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
