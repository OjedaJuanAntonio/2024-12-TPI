import React from 'react';
import {Modal,ModalOverlay, ModalContent,ModalCloseButton,ModalBody,Button,} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import Profile from './Profile_user';

function Navprofile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} variant="link" fontWeight="normal" color="black" p={0}_hover={{ textDecoration: 'none' }} > Mi Cuenta</Button>
      <Modal onClose={onClose} size='xl' isOpen={isOpen}>
        <ModalOverlay/>
        <ModalContent  >
          <ModalCloseButton />
          <ModalBody>
             <Profile/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Navprofile;
