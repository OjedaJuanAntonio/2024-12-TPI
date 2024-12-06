import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import Loginbackground from "../../../assets/Loginbackground.webp";
import Sculptor_register from "./SculptorRegister";
import EditSculptorManager from "./EditSculptor";
import DeleteSculptorManager from "./DeleteSculptor";
import { IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

function GestionarEscultores() {
  const [vista, setVista] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure(); 

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.3 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  };

  const renderizarVista = () => {
    switch (vista) {
      case "add":
        return <Sculptor_register />;
      case "edit":
        return <EditSculptorManager />;
      case "delete":
        return <DeleteSculptorManager />;
      default:
        return null;
    }
  };

  const handleOpenModal = (vistaSeleccionada) => {
    setVista(vistaSeleccionada); 
    onOpen(); 
  };

  return (
    <>
      <Flex
        style={{
          backgroundImage: `url(${Loginbackground})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "95vh",
        }}
      >
        <MotionBox
          bg="white"
          _dark={{ bg: "gray.800" }}
          borderRadius="xl"
          boxShadow="2xl"
          w="100%"
          maxW="800px"
          p={8}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Heading
            as="h1"
            textAlign="center"
            size="2xl"
            color="teal.600"
            _dark={{ color: "teal.300" }}
            mb={6}
          >
            Gestión de Escultores
          </Heading>
          <Text
            fontSize="lg"
            color="gray.600"
            _dark={{ color: "gray.400" }}
            textAlign="center"
            mb={8}
          >
            Bienvenido al panel especial de administración de escultores que
            participan de la Bienal de Esculturas.
          </Text>

          <VStack spacing={6}>
            <MotionButton
              onClick={() => handleOpenModal("add")}
              w="100%"
              size="lg"
              bgGradient="linear(to-r, teal.400, teal.600)"
              color="white"
              _hover={{ bgGradient: "linear(to-r, teal.500, teal.700)" }}
              leftIcon={<Icon as={AddIcon} boxSize={5} />}
              fontWeight="bold"
              boxShadow="md"
              borderRadius="lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Agregar Escultor
            </MotionButton>

            <MotionButton
              onClick={() => handleOpenModal("edit")}
              w="100%"
              size="lg"
              bgGradient="linear(to-r, blue.400, blue.600)"
              color="white"
              _hover={{ bgGradient: "linear(to-r, blue.500, blue.700)" }}
              leftIcon={<Icon as={EditIcon} boxSize={5} />}
              fontWeight="bold"
              boxShadow="md"
              borderRadius="lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Editar Escultor
            </MotionButton>

            <MotionButton
              onClick={() => handleOpenModal("delete")}
              w="100%"
              size="lg"
              bgGradient="linear(to-r, red.400, red.600)"
              color="white"
              _hover={{ bgGradient: "linear(to-r, red.500, red.700)" }}
              leftIcon={<Icon as={DeleteIcon} boxSize={5} />}
              fontWeight="bold"
              boxShadow="md"
              borderRadius="lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Eliminar Escultor
            </MotionButton>
          </VStack>
        </MotionBox>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent bg="white" _dark={{ bg: "gray.800" }}>
          <ModalBody p={0}>
            <Box position="relative" w="100%" h="100%">
              <IconButton position="absolute" top="10px" right="10px" zIndex={1} aria-label="Cerrar modal"_hover={{ transform: "scale(1.2)", transition: "transform 0.2s", }}icon={<CloseIcon />} onClick={onClose}/>
              {renderizarVista()}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GestionarEscultores;