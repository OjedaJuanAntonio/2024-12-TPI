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
  Image,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const DeleteSculptorManager = () => {
  const [escultores, setEscultores] = useState([]);
  const [filteredEscultores, setFilteredEscultores] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEscultor, setSelectedEscultor] = useState(null);
  const [pin, setPin] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

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
        `${escultor.nombre} ${escultor.apellido}`
          .toLowerCase()
          .includes(query)
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

    fetch(`http://localhost:8000/escultores/${selectedEscultor.id}/`, {
      method: "DELETE",
    })
      .then(() => {
        toast({
          title: "Escultor eliminado",
          description: `El escultor "${selectedEscultor.nombre} ${selectedEscultor.apellido}" fue eliminado con éxito.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setEscultores((prev) =>
          prev.filter((escultor) => escultor.id !== selectedEscultor.id)
        );
        setFilteredEscultores((prev) =>
          prev.filter((escultor) => escultor.id !== selectedEscultor.id)
        );
        setIsModalOpen(false);
        setPin("");
      })
      .catch((error) => {
        console.error("Error al eliminar el escultor:", error);
        toast({
          title: "Error",
          description: "No se pudo eliminar el escultor.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const openDeleteModal = (escultor) => {
    setSelectedEscultor(escultor);
    setIsModalOpen(true);
  };

  return (
    <Box bg="gray.100" minH="100vh" w="100%" p={8}>
      <Box bg="white" borderRadius="lg" boxShadow="lg" w="100%" p={4} overflowX="auto">
        <Heading textAlign="center" mb={4} fontSize="2xl" color="red.600">
          Eliminación de Escultores
        </Heading>
        <HStack justifyContent="center" mb={5}>
          <Input
            placeholder="Buscar escultores por nombre o apellido..."
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
              <Th color="white">Foto</Th>
              <Th color="white">Nombre</Th>
              <Th color="white">Apellido</Th>
              <Th color="white" textAlign="center">
                Acciones
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredEscultores.map((escultor) => (
              <Tr key={escultor.id}>
                <Td>
                  <Image
                    src={escultor.photo}
                    alt={`${escultor.nombre} ${escultor.apellido}`}
                    boxSize="50px"
                    borderRadius="full"
                  />
                </Td>
                <Td>{escultor.nombre}</Td>
                <Td>{escultor.apellido}</Td>
                <Td textAlign="center">
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => openDeleteModal(escultor)}
                  >
                    Eliminar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {selectedEscultor && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">
              Confirmar eliminación de "{selectedEscultor.nombre} {selectedEscultor.apellido}"
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

export default DeleteSculptorManager;
