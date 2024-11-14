import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { Avatar, Wrap, Box, Flex, HStack, IconButton, useDisclosure, Text, Stack, Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider, Image } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Map from './user_profile/Navprofile';

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const handleLogout = () => logout({ returnTo: window.location.origin });

  return (
    <Box  bg="black" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Toggle Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          mr={4}
          bg="rgba(255, 255, 255, 0.3)"
          color="white"
          _hover={{ bg: "rgba(255, 255, 255, 0.5)" }}
        />
        
        <HStack spacing={8} alignItems="center" flexGrow={1} color="white">
          <Link to='/'><Image src='https://www.bienaldelchaco.org/2024/wp-content/uploads/2019/01/web-logo-130x50-3.png' alt="Bienal 2024 Logo" objectFit="contain" boxSize={'120px'} /></Link>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
          <Link to="/actividades"><NavLink>Actividades</NavLink></Link>
            <Link to='/esculturas'><NavLink>Esculturas</NavLink></Link>
            <NavLink>Otras Ediciones</NavLink>
            <Link to='/admin'><NavLink><strong>Panel de Control</strong></NavLink></Link>
            
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
                    <MenuItem><Map /></MenuItem>
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
            <Wrap>
              <Menu>
                <MenuButton as={Avatar} src='https://bit.ly/broken-link' size='md' color="black"/>
                <MenuList>
                  <MenuGroup >
                    <MenuItem onClick={loginWithRedirect}>Iniciar Sesión</MenuItem>
                    <Link to="/createAccount">
                      <MenuItem>Crear Cuenta</MenuItem>
                    </Link>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </Wrap>
          )}
        </Flex>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            <NavLink>Actividades</NavLink>
            <Link to='/esculturas'><NavLink>Esculturas</NavLink></Link>
            <NavLink>Otras Ediciones</NavLink>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

const NavLink = ({ children }) => (
  <Text px={2} py={1} _hover={{ textDecoration: 'none', fontSize: '1.2em' }} transition="font-size 0.2s ease">
    {children}
  </Text>
);

export default Navbar;
