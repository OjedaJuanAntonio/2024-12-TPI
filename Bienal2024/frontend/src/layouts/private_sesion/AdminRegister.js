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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  RadioGroup,
  Radio,
  Stack, // Importación añadida
  Text,
  HStack,
  PinInput,
  PinInputField,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { FaHammer } from "react-icons/fa";
import { LuCalendar } from "react-icons/lu";

const EditUserManager = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pin, setPin] = useState("");
  const toast = useToast();

  useEffect(() => {
    fetch("http://localhost:8000/usuarios/")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "No se pudieron cargar los usuarios.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, [toast]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      )
    );
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    setIsPinModalOpen(true);
  };

  const handleConfirmSave = () => {
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

    fetch(`http://localhost:8000/usuarios/${selectedUser.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        toast({
          title: "Usuario actualizado",
          description: `El usuario "${data.name}" fue actualizado con éxito.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        setIsPinModalOpen(false);
        setIsEditModalOpen(false);
        setPin("");
        window.location.reload();
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "No se pudo editar el usuario.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Box  mx="auto">
      <Heading as="h1" mb={6} textAlign="center" color="teal.600" fontSize={{ base: "lg", md: "2xl" }}>
        Gestión de Usuarios
      </Heading>
      <Input
        placeholder="Buscar usuarios por nombre o correo..."
        value={searchQuery}
        onChange={handleSearch}
        mb={6}
        borderRadius="lg"
        boxShadow="sm"
        _focus={{ boxShadow: "outline" }}
      />
      <Box
        overflowX="auto"
        borderRadius="lg"
        border="1px"
        borderColor="gray.200"
        boxShadow="lg"
        bg="white"
      >
        <Table variant="striped" colorScheme="teal" size="sm">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Email</Th>
              <Th>Rol</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredUsers.map((user) => (
              <Tr key={user.id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.type_user}</Td>
                <Td>
                  <Button
                    colorScheme="teal"
                    size="sm"
                    onClick={() => handleEdit(user)}
                  >
                    Editar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {selectedUser && (
        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Rol del Usuario</ModalHeader>
            <ModalBody>
              <FormControl id="role" mt={6} isRequired>
                <FormLabel color="teal.500">Seleccionar Rol</FormLabel>
                <RadioGroup
                  onChange={(value) =>
                    setSelectedUser((prev) => ({
                      ...prev,
                      type_user: value,
                    }))
                  }
                  value={selectedUser.type_user}
                >
                  <Stack direction={{ base: "column", md: "row" }} spacing={6}>
                    <Box
                      p={4}
                      borderWidth="1px"
                      borderRadius="lg"
                      bg={
                        selectedUser.type_user === "admin_escultura"
                          ? "teal.50"
                          : "white"
                      }
                      borderColor={
                        selectedUser.type_user === "admin_escultura"
                          ? "teal.300"
                          : "gray.200"
                      }
                      transition="0.3s"
                    >
                      <Radio value="admin_escultura">
                        <HStack>
                          <Icon as={FaHammer} color="teal.500" boxSize={6} />
                          <Text fontWeight="bold">Esculturas</Text>
                        </HStack>
                      </Radio>
                      <Text mt={2} color="gray.600" fontSize="sm">
                        Gestiona todas las esculturas del sistema.
                      </Text>
                    </Box>

                    <Box
                      p={4}
                      borderWidth="1px"
                      borderRadius="lg"
                      bg={
                        selectedUser.type_user === "admin_eventos"
                          ? "teal.50"
                          : "white"
                      }
                      borderColor={
                        selectedUser.type_user === "admin_eventos"
                          ? "teal.300"
                          : "gray.200"
                      }
                      transition="0.3s"
                    >
                      <Radio value="admin_eventos">
                        <HStack>
                          <Icon as={LuCalendar} color="teal.500" boxSize={6} />
                          <Text fontWeight="bold">Eventos</Text>
                        </HStack>
                      </Radio>
                      <Text mt={2} color="gray.600" fontSize="sm">
                        Gestiona todos los eventos relacionados con esculturas.
                      </Text>
                    </Box>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={handleSave}>
                Guardar
              </Button>
              <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <Modal isOpen={isPinModalOpen} onClose={() => setIsPinModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Acción</ModalHeader>
          <ModalBody>
            <Text mb={4}>Ingrese el PIN para confirmar:</Text>
            <HStack justify="center">
              <PinInput value={pin} onChange={(value) => setPin(value)}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleConfirmSave} mr={3}>
              Confirmar
            </Button>
            <Button variant="ghost" onClick={() => setIsPinModalOpen(false)}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EditUserManager;
