import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Wrap,
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Text,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Image,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Map from './user_profile/Navprofile';

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    localStorage.removeItem('authUser'); // Elimina el usuario guardado
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      const userData = {
        sub: user.sub,
        given_name: user.given_name,
        family_name: user.family_name,
        name: user.name,
        email: user.email,
        picture: user.picture,
        nickname: user.nickname,
      };


      localStorage.setItem('authUser', JSON.stringify(userData));


      fetch('http://localhost:8000/usuarios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error al enviar datos: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Usuario guardado en el backend:', data);
        })
        .catch((error) => {
          alert('Error al guardar el usuario en el backend. Por favor, intente nuevamente.');
          console.error('Error al enviar datos del usuario:', error);
        });
    }
  }, [isAuthenticated, user]);

  // Recuperar usuario desde localStorage
  const savedUser = JSON.parse(localStorage.getItem('authUser'));

  const NavLink = ({ children }) => (
    <Text px={2} py={1} _hover={{ textDecoration: 'none', fontSize: '1.2em' }} transition="font-size 0.2s ease">
      {children}
    </Text>
  );

  return (
    <Box bg="black" px={4}>
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
          _hover={{ bg: 'rgba(255, 255, 255, 0.5)' }}
        />

        <HStack spacing={8} alignItems="center" flexGrow={1} color="white">
          <Link to="/">
            <Image
              src="https://www.bienaldelchaco.org/2024/wp-content/uploads/2019/01/web-logo-130x50-3.png"
              alt="Bienal 2024 Logo"
              objectFit="contain"
              boxSize="120px"
            />
          </Link>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Link to="/esculturas">
              <NavLink>Esculturas</NavLink>
            </Link>
            <Link to="/admin">
              <NavLink>
                <strong>Panel de Control</strong>
              </NavLink>
            </Link>

            <Link to="/Todas/esculturas">
              <NavLink>
                <strong>Esculturas Tablet</strong>
              </NavLink>
            </Link>
            <NavLink>Otras Ediciones</NavLink>
          </HStack>
        </HStack>

        <Flex alignItems="center">
          {isAuthenticated || savedUser ? (
            <Wrap>
              <Menu>
                <MenuButton as={Avatar} src={user?.picture || savedUser?.picture} size="md" />
                <MenuList>
                  <Text fontSize="md" px={4} py={2}>
                    ¡Hola, {user?.nickname || savedUser?.nickname}!
                  </Text>
                  <MenuGroup title="Perfil">
                    <MenuItem>
                      <Map />
                    </MenuItem>
                    <MenuItem onClick={handleLogout} color="red.500" fontStyle="oblique">
                      Cerrar Sesión
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title="Ayuda">
                    <MenuItem>FAQ</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </Wrap>
          ) : (
            <Wrap>
              <Menu>
                <MenuButton as={Avatar} src="https://bit.ly/broken-link" size="md" color="black" />
                <MenuList>
                  <MenuGroup>
                    <MenuItem onClick={loginWithRedirect}>Iniciar Sesión</MenuItem>
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
            <Link to="/esculturas">
              <NavLink>Esculturas</NavLink>
            </Link>
            <NavLink>Otras Ediciones</NavLink>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
