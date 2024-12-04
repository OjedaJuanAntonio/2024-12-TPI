import React from "react";
import {
  VStack,
  Text,
  Icon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import Camara from "../Camara";

const QrExpirado = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const videoRef = Camara(isOpen);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <VStack
      spacing={4}
      align="center"
      justify="center"
      bg="red.100"
      borderRadius="lg"
      p={6}
      boxShadow="md"
      w="100%"
      h="100vh"
    >
      <Icon as={WarningIcon} boxSize={90} color="red.500" />
      <Text fontSize="lg" color="red.700" fontWeight="semibold">
        QR expirado o dañado
      </Text>
      <Text fontSize="md" color="gray.600">
        Por favor, escanéalo nuevamente para continuar.
      </Text>
      <Button colorScheme="red" size="md" onClick={openModal}>
        Escanear de nuevo
      </Button>
      <Modal onClose={closeModal} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent maxW="90%" maxH="90%" overflow="hidden">
          <ModalHeader>Escanear QR</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{ width: "100%", height: "100%" }}
            ></video>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default QrExpirado;
