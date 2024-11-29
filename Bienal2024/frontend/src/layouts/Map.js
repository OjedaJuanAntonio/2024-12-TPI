import React, { useRef, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { FiMap } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

function Map() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const nombre = location.pathname === "/1" ? "Mapa" : "Scanear QR";

  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Accede a la cámara cuando el modal está abierto
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error al acceder a la cámara:", err);
        }
      };
      startCamera();
    } else {
      // Detener la cámara cuando el modal se cierra
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [isOpen]);

  return (
    <>
      <Button
        onClick={onOpen}
        m={4}
        position="fixed"
        bottom="2vh"
        right="2vh"
        borderRadius="full"
        size="lg"
        colorScheme="teal"
        zIndex="9999"
      >
        {nombre} <FiMap />
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent maxW="90%" maxH="90%" overflow="hidden">
          <ModalHeader>{nombre}</ModalHeader>
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
    </>
  );
}

export default Map;
