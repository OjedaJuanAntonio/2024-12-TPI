import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Image, Button, Flex } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { FiMap } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

function Map() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const nombre = location.pathname === "/" ? "Mapa" : "Scanear QR";
  return (
    <>
      <Button onClick={onOpen} m={4} position="fixed" bottom="2vh" right="2vh" borderRadius="full" size="lg" colorScheme="teal" zIndex="9999"> {nombre} <FiMap /> </Button>
      <Modal onClose={onClose} size='xl' isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent maxW="90%" maxH="90%" overflow="scroll">
          <ModalHeader>{nombre}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {location.pathname === "/" ? (
              <Image src='https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/plano-predio-v2-scaled.jpg' alt='Plano Predio' boxSize='100%' objectFit='cover'/>
            ) : (
                <Flex justifyContent="center" alignItems="center" height="100%">
                    <Image src='https://www.shutterstock.com/image-vector/camera-icon-symbol-vector-flat-600nw-2475639413.jpg' boxSize='40%' objectFit='cover'/>
                </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Map;
