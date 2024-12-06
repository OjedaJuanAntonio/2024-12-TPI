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
  Image,useToast
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Map from './user_profile/Navprofile';
import { useUser } from '../../context/ContextoUsuario';

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { userType } = useUser();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    localStorage.removeItem('authUser'); 
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
        type_user: 'normal'
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
          if (data.message === 'Bienvenida al Usuario') {
            
            const hasShownWelcomeMessage = localStorage.getItem('hasShownWelcomeMessage');
          
            if (!hasShownWelcomeMessage) {
              
              toast({
                title: `¡Bienvenido de nuevo, ${data.user_data.name || 'Usuario'}!`,
                description: 'Nos alegra verte nuevamente.',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top',
              });
          
              
              localStorage.setItem('hasShownWelcomeMessage', 'true');
            }
          } else {
            
            toast({
              title: '¡Registro exitoso!',
              description: 'Bienvenido al sistema.',
              status: 'success',
              duration: 5000,
              isClosable: true,
              position: 'top',
            });
          }
          console.log('Usuario guardado en el backend:', data);
        })
        .catch((error) => {
          
          toast({
            title: 'Error al guardar el usuario.',
            description: 'Por favor, intente nuevamente.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top',
          });
          console.error('Error al enviar datos del usuario:', error);
        });
    }
  }, [isAuthenticated, user, toast]);




  
  const savedUser = JSON.parse(localStorage.getItem('authUser'));

  const NavLink = ({ children }) => (
    <Text px={2} py={1} _hover={{ textDecoration: 'none', fontSize: '1.2em' }} transition="font-size 0.2s ease">
      {children}
    </Text>
  );
  console.log(userType)
  
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
            
            <HStack as="nav" spacing={4}>
            {userType === 'admin_esculturas' && (
              <Link to="/admin/esculturas">
                <NavLink>Panel del control</NavLink>
              </Link>
            )}
            {userType === 'admin_eventos' && (
              <Link to="/admin/eventos">
                <NavLink>Panel del control</NavLink>
              </Link>
            )}
            {userType === 'admin_escultores' && (
              <Link to="/admin/escultores">
                <NavLink>Panel del control</NavLink>
              </Link>
            )}
            {userType === 'superuser' && (
              <Link to="/admin/superuser">
                <NavLink>Panel del control</NavLink>
              </Link>
            )}
          </HStack>
      
           
            <Menu>
    <MenuButton
      as={Text} 

      fontSize="md"
      cursor="pointer"
    >
      Otras Ediciones
    </MenuButton>
    <MenuList bg="white" color="black" border="1px solid #ddd">
      <MenuItem as={Link} to="https://www.bienaldelchaco.org/2022/">
        Edición 2022
      </MenuItem>
      <MenuItem as={Link} to="http://www.bienaldelchaco.org/2018/">
        Edición 2018
      </MenuItem>
      <MenuItem as={Link} to="http://www.bienaldelchaco.org/2016/">
        Edición 2016
      </MenuItem>
    </MenuList>
  </Menu>
          </HStack>
        </HStack>

        <Flex alignItems="center">
  {isAuthenticated || savedUser ? (
    <Wrap>
      <Menu>
        {/* Validación adicional para determinar qué imagen mostrar */}
        <MenuButton>
  <Avatar src={user?.picture || savedUser?.picture || 'https://bit.ly/broken-link'} size="md" />
</MenuButton>

        <MenuList>
          <Text fontSize="md" px={4} py={2}>
            ¡Hola, {user?.nickname || savedUser?.nickname || 'Invitado'}!
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
        <MenuButton
          as={Avatar}
          src="https://bit.ly/broken-link" 
          size="md"
          color="black"
        />
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
