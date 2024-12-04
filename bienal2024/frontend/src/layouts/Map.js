import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Image,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { useLocation } from "react-router-dom";
import Camara from "./public_sesion/Camara";

function Map() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const nombre =
    location.pathname === "/" ? (
      <>
        Scanear QR <MdOutlineQrCodeScanner />
      </>
    ) : location.pathname === "/actividades" ? (
      "Mapa del Predio"
    ) : (
      "Mapa"
    );

  const videoRef = location.pathname === "/" ? Camara(isOpen) : null;

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
        {nombre}
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent maxW="90%" maxH="90%" overflow="hidden">
          <ModalHeader>{nombre}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0} overflowY="auto" maxH="80vh">
            {location.pathname === "/actividades" ? (
              <Image
              src="https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/plano-predio-v2-scaled.jpg"
              alt="Mapa del Predio"
              width="100%"
              height="100%"
              objectFit="contain"
             
            />
            
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ width: "100%", height: "100%" }}
              ></video>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Map;
