
import React from 'react';
import {Modal,ModalOverlay, ModalContent,ModalHeader,ModalCloseButton,ModalBody,Image,Button,} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';



function Map() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} m={4}>Mapa del Predio</Button>
      <Modal onClose={onClose} size='xl' isOpen={isOpen}>
        <ModalOverlay/>
        <ModalContent maxW="90%" maxH="90%" overflow="scroll" >
          <ModalHeader>Mapa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Image src='https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/plano-predio-v2-scaled.jpg' alt='Plano Predio' boxSize='100%' objectFit='cover' />
          </ModalBody>
         
        </ModalContent>
      </Modal>
    </>
  )
}

export default Map