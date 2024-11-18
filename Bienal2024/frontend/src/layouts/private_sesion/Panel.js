import React from 'react';
import Loginbackground from '../../assets/Loginbackground.jpg';
import { Link } from 'react-router-dom'; 
import { Button, Stack} from '@chakra-ui/react';

function Panel() {

  return (
    <div style={{ backgroundImage: `url(${Loginbackground})`,height: '90vh', padding: '80px',display: 'flex',justifyContent: 'center', alignItems: 'center', }}>
      <Stack spacing={4} w="100%" maxW="500px" align="center" mt={5}>
        <Link to='/register/scultors' > 
          <Button  w="100vh"  h="25vh" colorScheme="teal" size="lg"fontSize="2xl" >Agregar Escultor</Button>
        </Link>
        <Link to='/register/sculpture' > 
            <Button  w="100vh" h="25vh" colorScheme="teal" size="lg" fontSize="2xl" >Agregar Escultura</Button>
        </Link>
      </Stack>
    </div>
  );
}

export default Panel;
