import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { Avatar, Wrap, Box, Flex, HStack, IconButton, useDisclosure, Text, Stack, Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider, Image } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import logo from '../../assets/logo.png'; 
import Map from './user_profile/Navprofile';


const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLogout = () => logout({ returnTo: window.location.origin });
  return (
    <Box style={{ backdropFilter: 'blur(15px)', position: 'relative', zIndex: 10 }} bg="rgba(255, 255, 255, 0.3)" px={4} >
      <Flex h={16} alignItems="center" justifyContent="space-between">
      <IconButton size="md"icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}aria-label="Toggle Menu"display={{ md: 'none' }}onClick={isOpen ? onClose : onOpen} mr={4}bg="rgba(255, 255, 255, 0.3)"  color="black"  _hover={{ bg: "rgba(255, 255, 255, 0.5)" }}  />
        <HStack spacing={8} alignItems="center" flexGrow={1}>
         <Link to='/'><Image src={logo} alt="Bienal 2024 Logo" objectFit="contain" boxSize={'120px'}/></Link> 
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavLink>Actividades</NavLink>
            <NavLink>Esculturas</NavLink>
            <NavLink>Otras Ediciones</NavLink>
          </HStack>
        </HStack>

        <Flex alignItems="center">
          {isAuthenticated ? (
            <Wrap>
              <Menu>
                <MenuButton as={Avatar} src={user.picture} size='md' />
                <MenuList>
                  <Text fontSize="md" px={4} py={2}>¡Hola, {user.given_name}!</Text>
                  <MenuGroup title='Perfil'>
                    <MenuItem><Map/></MenuItem>
                    <MenuItem onClick={handleLogout} color="red.500" fontStyle='oblique'>Cerrar Sesión</MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title='Ayuda'>
                    <MenuItem>FAQ</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </Wrap>
            
          ) : (
            <Avatar size='md' src='https://bit.ly/broken-link' onClick={loginWithRedirect} />
          )}
        </Flex>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            <NavLink>Actividades</NavLink>
            <NavLink>Esculturas</NavLink>
            <NavLink>Otras Ediciones</NavLink>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

const NavLink = ({ children }) => (
   <Text  px={2} py={1} _hover={{ textDecoration: 'none', fontSize: '1.2em' }} transition="font-size 0.2s ease"  >
    {children}
  </Text>
);

export default Navbar;
