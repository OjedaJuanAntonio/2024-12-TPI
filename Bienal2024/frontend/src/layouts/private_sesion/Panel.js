
import Loginbackground from '../../assets/Loginbackground.jpg';
import { Link } from 'react-router-dom'; 
import React, { useState } from "react";
import {
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";


function Panel() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Maneja la apertura y cierre del modal
  const [selectedModal, setSelectedModal] = useState(""); // Controla qué modal se muestra

  const handleModalOpen = (type) => {
    setSelectedModal(type); // Define qué tipo de gestión se seleccionó
    onOpen();
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Loginbackground})`,
        height: "90vh",
        padding: "80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack spacing={4} w="100%" maxW="500px" align="center" mt={5}>
        {/* Botón para gestionar escultores */}
        <Button
          w="100vh"
          h="20vh"
          colorScheme="teal"
          size="lg"
          fontSize="2xl"
          onClick={() => handleModalOpen("escultores")}
        >
          Gestionar Escultores
        </Button>

        {/* Botón para gestionar esculturas */}
        <Button
          w="100vh"
          h="20vh"
          colorScheme="teal"
          size="lg"
          fontSize="2xl"
          onClick={() => handleModalOpen("esculturas")}
        >
          Gestionar Esculturas
        </Button>

        {/* Botón para gestionar eventos */}
        <Button
          w="100vh"
          h="20vh"
          colorScheme="teal"
          size="lg"
          fontSize="2xl"
          onClick={() => handleModalOpen("eventos")}
        >
          Gestionar Eventos
        </Button>
      </Stack>

      {/* Modal con las opciones */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedModal === "escultores" && "Gestionar Escultores"}
            {selectedModal === "esculturas" && "Gestionar Esculturas"}
            {selectedModal === "eventos" && "Gestionar Eventos"}
          </ModalHeader>
          <ModalBody>
  <VStack spacing={4}>
    {/* Botón para agregar */}
    <Link to={`/${selectedModal}/add`}>
      <Button
        w="100%"
        colorScheme="teal"
        size="lg"
        fontSize="lg"
        leftIcon={<AddIcon />}
        borderRadius="full"
        boxShadow="md"
        _hover={{
          boxShadow: "lg",
          transform: "scale(1.05)",
        }}
        transition="all 0.2s ease-in-out"
      >
        Agregar{" "}
        {selectedModal === "escultores" && "Escultor"}
        {selectedModal === "esculturas" && "Escultura"}
        {selectedModal === "eventos" && "Evento"}
      </Button>
    </Link>

    {/* Botón para editar */}
    <Link to={`/${selectedModal}/edit`}>
      <Button
        w="100%"
        colorScheme="blue"
        size="lg"
        fontSize="lg"
        leftIcon={<EditIcon />}
        borderRadius="full"
        boxShadow="md"
        _hover={{
          boxShadow: "lg",
          transform: "scale(1.05)",
        }}
        transition="all 0.2s ease-in-out"
      >
        Editar{" "}
        {selectedModal === "escultores" && "Escultor"}
        {selectedModal === "esculturas" && "Escultura"}
        {selectedModal === "eventos" && "Evento"}
      </Button>
    </Link>

    <Link to={`/${selectedModal}/delete`}>
      <Button
        w="100%"
        colorScheme="red"
        size="lg"
        fontSize="lg"
        leftIcon={<DeleteIcon />}
        borderRadius="full"
        boxShadow="md"
        _hover={{
          boxShadow: "lg",
          transform: "scale(1.05)",
        }}
        transition="all 0.2s ease-in-out"
      >
        Eliminar{" "}
        {selectedModal === "escultores" && "Escultor"}
        {selectedModal === "esculturas" && "Escultura"}
        {selectedModal === "eventos" && "Evento"}
      </Button>
    </Link>
  </VStack>
</ModalBody>;
          <ModalFooter>
            <Button colorScheme="gray" onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Panel;
