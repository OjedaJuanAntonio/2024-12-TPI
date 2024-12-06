import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import Loginbackground from "../../assets/Loginbackground.webp"; // Ajusta la ruta de la image
import GestionarEscultores from "./Sculptor_management/SculptorPanel";
import GestionarEsculturas from "./Sculpture_management/SculpturePanel";
import GestionarEventos from "./Event_management/EventPanel";
import EditUserManager from "./AdminRegister";
import Podium from "./Podio";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";
import { MdEventAvailable } from "react-icons/md";
import { LiaMonumentSolid } from "react-icons/lia";
import { GrUserWorker } from "react-icons/gr";
const MotionBox = motion(Box);
const MotionButton = motion(Button);

function SuperUserPanel() {
  const [vista, setVista] = useState(null); 
  const { isOpen, onOpen, onClose } = useDisclosure(); 

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  const [responseData, setResponseData] = useState(null);  
  const [userType, setUserType] = useState('normal');

  useEffect(() => {
    // Solo ejecutar si el userType está definido
    if (userType) {
      fetch('http://localhost:8000/ver/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Si tienes un token, agrégalo aquí en los headers
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ type_user: userType }), // Enviar el type_user en el cuerpo de la solicitud
      })
      .then(response => response.json())
      .then(data => {
        setResponseData(data); 
        
        console.log(data)
  // Guardamos los datos de la respuesta
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
    }
  }, [userType]);  // Se ejecuta cada vez que el userType cambie






  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.3 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  };

  const renderizarVista = () => {
    switch (vista) {
      case "Gestion Esculturas":
        return <GestionarEsculturas/>;
      case "Gestion Escultores":
        return <GestionarEscultores/>;
      case "Gestion Eventos":
        return <GestionarEventos/>;
        case "Gestion Roles":
        return <EditUserManager/>;
        case "Top 3":
        return <Podium />;
      default:
        return null;
    }
  };
 
  

  const handleOpenModal = (vistaSeleccionada) => {
    setVista(vistaSeleccionada); // Configura la vista activa
    onOpen(); // Abre el modal
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
            Gestión de Superusuario
          </Heading>
          <Text
            fontSize="lg"
            color="gray.600"
            _dark={{ color: "gray.400" }}
            textAlign="center"
            mb={8}
          >
            Panel de control avanzado para gestionar escultores, esculturas,
            eventos, roles y más.
          </Text>


          <VStack spacing={6}>
            <MotionButton
              onClick={() => handleOpenModal("Gestion Esculturas")}
              w="100%"
              size="lg"
              bgGradient="linear(to-r, teal.400, teal.600)"
              color="white"
              _hover={{ bgGradient: "linear(to-r, teal.500, teal.700)" }}
              leftIcon={<LiaMonumentSolid  />}
              fontWeight="bold"
              boxShadow="md"
              borderRadius="lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Gestion Esculturas
            </MotionButton>

        

            <MotionButton
              onClick={() => handleOpenModal("Gestion Escultores")}
              w="100%"
              size="lg"
              bgGradient="linear(to-r, teal.400, teal.600)"
              color="white"
              _hover={{ bgGradient: "linear(to-r, teal.500, teal.700)" }}
              leftIcon={<GrUserWorker/>}
              fontWeight="bold"
              boxShadow="md"
              borderRadius="lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Gestion Escultores
            </MotionButton>

            <MotionButton
              onClick={() => handleOpenModal("Gestion Eventos")}
              w="100%"
              size="lg"
              bgGradient="linear(to-r, teal.400, teal.600)"
              color="white"
              _hover={{ bgGradient: "linear(to-r, teal.500, teal.700)" }}
              leftIcon={<MdEventAvailable/>}
              fontWeight="bold"
              boxShadow="md"
              borderRadius="lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Gestion Eventos
            </MotionButton>
            <MotionButton
              onClick={() => handleOpenModal("Gestion Roles")}
              w="100%"
              size="lg"
              bgGradient="linear(to-r, teal.400, teal.600)"
              color="white"
              _hover={{ bgGradient: "linear(to-r, teal.500, teal.700)" }}
              leftIcon={<FaUserPen />}
              fontWeight="bold"
              boxShadow="md"
              borderRadius="lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Gestion Roles
            </MotionButton>
            <MotionButton
              onClick={() => handleOpenModal("Top 3")}
              w="100%"
              size="lg"
              bgGradient="linear(to-r, teal.400, teal.600)"
              color="white"
              _hover={{ bgGradient: "linear(to-r, teal.500, teal.700)" }}
              leftIcon={<MdOutlineEmojiEvents  />}
              fontWeight="bold"
              boxShadow="md"
              borderRadius="lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Ver Top 3
            </MotionButton>
          </VStack>
        </MotionBox>
        
      </Flex>

      {/* Modal de pantalla completa */}
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent bg="white" _dark={{ bg: "gray.800" }}>
          <ModalBody p={0}>
            <Box position="relative" w="100%" h="100%">
              <IconButton
                position="absolute"
                top="10px"
                right="10px"
                zIndex={1}
                aria-label="Cerrar modal"
                _hover={{
                  transform: "scale(1.2)",
                  transition: "transform 0.2s",
                }}
                icon={<CloseIcon />}
                onClick={onClose}
              />
              {renderizarVista()}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SuperUserPanel;
