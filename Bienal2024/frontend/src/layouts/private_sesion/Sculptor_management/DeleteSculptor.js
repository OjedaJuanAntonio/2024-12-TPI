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
  useBreakpointValue,
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

  const modalSize = useBreakpointValue({ base: "full", md: "md" });
  const pinSize = useBreakpointValue({ base: "md", md: "lg" });

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
    <Box bg="gray.100" minH="100vh" w="100%" p={4}>
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
            w={{ base: "100%", md: "50%" }}
          />
        </HStack>
        <Table variant="simple" w="100%" sx={{ borderSpacing: "0 5px" }}>
          <Thead bg="red.500">
            <Tr>
              <Th color="white" py={2}>
                Foto
              </Th>
              <Th color="white" py={2}>
                Nombre
              </Th>
              <Th color="white" py={2}>
                Apellido
              </Th>
              <Th color="white" py={2} textAlign="center">
                Acciones
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredEscultores.map((escultor) => (
              <Tr key={escultor.id} bg="gray.50" _hover={{ bg: "gray.100" }}>
                <Td py={1}>
                  <Image
                    src={escultor.photo}
                    alt={`${escultor.nombre} ${escultor.apellido}`}
                    boxSize="50px"
                    borderRadius="full"
                  />
                </Td>
                <Td py={1}>{escultor.nombre}</Td>
                <Td py={1}>{escultor.apellido}</Td>
                <Td py={1} textAlign="center">
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
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size={modalSize}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">
              Confirmar eliminación de "{selectedEscultor.nombre} {selectedEscultor.apellido}"
            </ModalHeader>
            <ModalBody>
              <Text mb={4} textAlign="center">
                Ingrese el PIN para confirmar:
              </Text>
              <HStack justifyContent="center">
                <PinInput
                  value={pin}
                  onChange={(value) => setPin(value)}
                  size={pinSize}
                  otp
                >
                  <PinInputField m={1} />
                  <PinInputField m={1} />
                  <PinInputField m={1} />
                  <PinInputField m={1} />
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
