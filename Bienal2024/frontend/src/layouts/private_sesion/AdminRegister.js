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
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaHammer } from "react-icons/fa6";
import { LuCalendar } from "react-icons/lu";
import { FaUser } from "react-icons/fa";

const EditUserManager = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetch("http://localhost:8000/usuarios/")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
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
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!selectedUser) return;

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

        // Recargar la página
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error al editar el usuario:", error);
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
    <Box p={4}>
      <Input
        placeholder="Buscar usuarios por nombre o correo..."
        value={searchQuery}
        onChange={handleSearch}
        mb={4}
      />
      <Table variant="simple">
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
                  colorScheme="blue"
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

      {/* Modal para editar usuario */}
      {selectedUser && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent maxW={{ base: "95%", md: "600px", lg: "800px" }}>
          <ModalHeader textAlign="center" fontSize="2xl" color="teal.600">
            Editar Rol del Usuario
          </ModalHeader>
          <ModalBody>
            <FormControl id="role" mt={6} isRequired>
              <FormLabel fontSize="lg" fontWeight="bold" color="teal.500">
                Seleccionar Rol
              </FormLabel>
              <RadioGroup
                onChange={(value) =>
                  setSelectedUser((prev) => ({
                    ...prev,
                    type_user: value,
                  }))
                }
                value={selectedUser.type_user}
              >
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={6}
                  justifyContent="center"
                >
                  {/* Rol: Esculturas */}
                  <Box
                    p={6}
                    borderWidth="2px"
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
                    boxShadow="lg"
                    transition="0.3s"
                    _hover={{
                      boxShadow: "xl",
                      transform: "scale(1.05)",
                    }}
                  >
                    <Radio value="admin_escultura">
                      <HStack>
                        <Icon as={FaHammer} color="teal.500" boxSize={6} />
                        <Text fontWeight="bold" fontSize="lg">
                          Esculturas
                        </Text>
                      </HStack>
                    </Radio>
                    <Text mt={3} color="gray.600" fontSize="sm">
                      Gestiona todas las esculturas del sistema.
                    </Text>
                  </Box>
      
                  {/* Rol: Eventos */}
                  <Box
                    p={6}
                    borderWidth="2px"
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
                    boxShadow="lg"
                    transition="0.3s"
                    _hover={{
                      boxShadow: "xl",
                      transform: "scale(1.05)",
                    }}
                  >
                    <Radio value="admin_eventos">
                      <HStack>
                        <Icon as={LuCalendar} color="teal.500" boxSize={6} />
                        <Text fontWeight="bold" fontSize="lg">
                          Eventos
                        </Text>
                      </HStack>
                    </Radio>
                    <Text mt={3} color="gray.600" fontSize="sm">
                      Gestiona todos los eventos relacionados con esculturas.
                    </Text>
                  </Box>
      
                  {/* Rol: Usuario Común */}
                  <Box
                    p={6}
                    borderWidth="2px"
                    borderRadius="lg"
                    bg={
                      selectedUser.type_user === "usuario_comun"
                        ? "teal.50"
                        : "white"
                    }
                    borderColor={
                      selectedUser.type_user === "usuario_comun"
                        ? "teal.300"
                        : "gray.200"
                    }
                    boxShadow="lg"
                    transition="0.3s"
                    _hover={{
                      boxShadow: "xl",
                      transform: "scale(1.05)",
                    }}
                  >
                    <Radio value="usuario_comun">
                      <HStack>
                        <Icon as={FaUser} color="teal.500" boxSize={6} />
                        <Text fontWeight="bold" fontSize="lg">
                          Usuario Común
                        </Text>
                      </HStack>
                    </Radio>
                    <Text mt={3} color="gray.600" fontSize="sm">
                      Solo tendrá acceso básico como un usuario común.
                    </Text>
                  </Box>
                </Stack>
              </RadioGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              colorScheme="teal"
              size="lg"
              width="40%"
              onClick={handleSave}
              boxShadow="lg"
              _hover={{ bg: "teal.400" }}
              mr={3}
            >
              Guardar
            </Button>
            <Button
              size="lg"
              variant="outline"
              width="40%"
              onClick={() => setIsModalOpen(false)}
              _hover={{ bg: "gray.100" }}
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

export default EditUserManager;
