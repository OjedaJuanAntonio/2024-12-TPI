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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  HStack,
  Heading,
  Text,

} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const DeleteSculptureManager = () => {
  const [esculturas, setEsculturas] = useState([]);
  const [filteredEsculturas, setFilteredEsculturas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEscultura, setSelectedEscultura] = useState(null);
  const [pin, setPin] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

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

    fetch(`http://localhost:8000/esculturas/${selectedEscultura.id}/`, {
      method: "DELETE",
    })
      .then(() => {
        toast({
          title: "Escultura eliminada",
          description: `La escultura "${selectedEscultura.titulo}" fue eliminada con éxito.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setEsculturas((prev) =>
          prev.filter((escultura) => escultura.id !== selectedEscultura.id)
        );
        setFilteredEsculturas((prev) =>
          prev.filter((escultura) => escultura.id !== selectedEscultura.id)
        );
        setIsModalOpen(false);
        setPin("");
      })
      .catch((error) => {
        console.error("Error al eliminar la escultura:", error);
        toast({
          title: "Error",
          description: "No se pudo eliminar la escultura.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const openDeleteModal = (escultura) => {
    setSelectedEscultura(escultura);
    setIsModalOpen(true);
  };

  return (
    <Box bg="gray.100" minH="100vh" w="100%" p={4}>
      <Box bg="white" borderRadius="lg" boxShadow="lg" w="100%" p={4} overflowX="auto">
        <Heading textAlign="center" mb={4} fontSize="2xl" color="red.600">
          Eliminación de Esculturas
        </Heading>
        <HStack justifyContent="center" mb={5}>
          <Input
            placeholder="Buscar esculturas por título..."
            value={searchQuery}
            onChange={handleSearch}
            borderRadius="md"
            focusBorderColor="red.400"
            w="100%"
          />
        </HStack>
        <Table variant="simple" w="100%">
          <Thead bg="red.500">
            <Tr>
              <Th color="white">Título</Th>
              <Th color="white">Material</Th>
       
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

                <Td textAlign="center">
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => openDeleteModal(escultura)}
                  >
                    Eliminar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {selectedEscultura && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">
              Confirmar eliminación de "{selectedEscultura.titulo}"
            </ModalHeader>
            <ModalBody>
              <Text mb={4}>Ingrese el PIN para confirmar:</Text>
              <HStack justifyContent="center">
                <PinInput value={pin} onChange={(value) => setPin(value)} size="lg" otp>
                  <PinInputField m={2} />
                  <PinInputField m={2} />
                  <PinInputField m={2} />
                  <PinInputField m={2} />
                </PinInput>
              </HStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleDelete}>
                Confirmar
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

export default DeleteSculptureManager;
