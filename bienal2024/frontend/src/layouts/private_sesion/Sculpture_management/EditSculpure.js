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
  Grid,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import Uploader from "../Uploader";

const EditSculptureManager = () => {
  const [esculturas, setEsculturas] = useState([]);
  const [filteredEsculturas, setFilteredEsculturas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEscultura, setSelectedEscultura] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploaderModalOpen, setIsUploaderModalOpen] = useState(false);
  const [selectedImageKey, setSelectedImageKey] = useState("");
  const toast = useToast();

  const modalSize = useBreakpointValue({ base: "full", md: "xl" });
  const gridColumns = useBreakpointValue({ base: 1, sm: 2, md: 3 });

  useEffect(() => {
    fetch("http://localhost:8000/esculturas/")
      .then((response) => response.json())
      .then((data) => {
        setEsculturas(data);
        setFilteredEsculturas(data);
      })
      .catch((error) => {
        console.error("Error fetching esculturas:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar las esculturas.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, [toast]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredEsculturas(
      esculturas.filter((escultura) =>
        escultura.titulo.toLowerCase().includes(query)
      )
    );
  };

  const handleEdit = (escultura) => {
    setSelectedEscultura(escultura);
    setIsModalOpen(true);
  };

  const handleFieldChange = (field, value) => {
    setSelectedEscultura((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageClick = (imageKey) => {
    setSelectedImageKey(imageKey);
    setIsModalOpen(false); 
    setIsUploaderModalOpen(true);
  };

  const handleSave = () => {
    if (!selectedEscultura) return;

    fetch(`http://localhost:8000/esculturas/${selectedEscultura.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedEscultura),
    })
      .then((response) => response.json())
      .then((data) => {
        toast({
          title: "Escultura actualizada",
          description: `La escultura "${data.titulo}" fue actualizada con éxito.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setEsculturas((prev) =>
          prev.map((escultura) =>
            escultura.id === selectedEscultura.id ? data : escultura
          )
        );
        setFilteredEsculturas((prev) =>
          prev.map((escultura) =>
            escultura.id === selectedEscultura.id ? data : escultura
          )
        );
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error al editar la escultura:", error);
        toast({
          title: "Error",
          description: "No se pudo editar la escultura.",
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
          Edición de Esculturas
        </Heading>
        <HStack justifyContent="center" mb={5}>
          <Input
            placeholder="Buscar esculturas por título..."
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
              <Th color="white">Título</Th>
              <Th color="white">Material</Th>
              <Th color="white">Intención</Th>
              <Th color="white" textAlign="center">
                Acciones
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredEsculturas.map((escultura) => (
              <Tr key={escultura.id}>
                <Td>{escultura.titulo}</Td>
                <Td>{escultura.material_principal}</Td>
                <Td>{escultura.intencion}</Td>
                <Td textAlign="center">
                  <Button
                    leftIcon={<EditIcon />}
                    colorScheme="teal"
                    size="sm"
                    onClick={() => handleEdit(escultura)}
                  >
                    Editar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {selectedEscultura && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size={modalSize}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">Editar Escultura</ModalHeader>
            <ModalBody>
              <VStack spacing={4}>
                <Grid templateColumns={`repeat(${gridColumns}, 1fr)`} gap={4}>
                  {["url_imagen_1", "url_imagen_2", "url_imagen_3"].map(
                    (key, index) => (
                      <Image
                        key={index}
                        src={selectedEscultura[key]}
                        alt={`Imagen ${index + 1}`}
                        borderRadius="md"
                        boxSize={{ base: "100px", md: "150px" }}
                        onClick={() => handleImageClick(key)}
                        _hover={{ cursor: "pointer", transform: "scale(1.05)" }}
                      />
                    )
                  )}
                </Grid>
                <FormControl>
                  <FormLabel>Título</FormLabel>
                  <Input
                    value={selectedEscultura.titulo}
                    onChange={(e) =>
                      handleFieldChange("titulo", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Material Principal</FormLabel>
                  <Input
                    value={selectedEscultura.material_principal}
                    onChange={(e) =>
                      handleFieldChange("material_principal", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Intención</FormLabel>
                  <Input
                    value={selectedEscultura.intencion}
                    onChange={(e) => handleFieldChange("intencion", e.target.value)}
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

      <Modal
        isOpen={isUploaderModalOpen}
        onClose={() => setIsUploaderModalOpen(false)}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Subir Nueva Imagen</ModalHeader>
          <ModalBody>
            <Uploader
              setPhoto={(newUrl) => {
                handleFieldChange(selectedImageKey, newUrl);
                setIsUploaderModalOpen(false);
                setIsModalOpen(true); 
              }}
              label={`Subir nueva imagen para ${selectedImageKey}`}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EditSculptureManager;
