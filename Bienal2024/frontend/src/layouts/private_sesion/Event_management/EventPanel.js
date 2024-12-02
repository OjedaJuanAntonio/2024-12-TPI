import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Button,
  Icon,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import Loginbackground from "../../../assets/Loginbackground.webp"; // Ajusta la ruta de la imagen

const MotionBox = motion(Box);
const MotionButton = motion(Button);

function GestionarEventos() {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.3 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  };

  return (
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
          Gestión de Eventos
        </Heading>
        <Text
          fontSize="lg"
          color="gray.600"
          _dark={{ color: "gray.400" }}
          textAlign="center"
          mb={8}
        >
          Bienvenido al panel especial de administración de eventos relacionados con la Bienal de Esculturas.
        </Text>

        <VStack spacing={6}>
          <MotionButton
            as={Link}
            to="/eventos/add"
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
            Agregar Evento
          </MotionButton>

          <MotionButton
            as={Link}
            to="/eventos/edit"
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
            Editar Evento
          </MotionButton>

          <MotionButton
            as={Link}
            to="/eventos/delete"
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
            Eliminar Evento
          </MotionButton>
        </VStack>
      </MotionBox>
    </Flex>
  );
}

export default GestionarEventos;
