import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import LogForm from './Logform';
import loginBackground from '../../../assets/loginBackground.png'; 
import { Spinner, Box } from '@chakra-ui/react';

function Addnew() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {const timer = setTimeout(() => {setLoading(false); }, 1000);

  return () => clearTimeout(timer);}, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Box height="100vh"display="flex"justifyContent="center" alignItems="center" >
          <Spinner size="xl" /> 
        </Box>
      ) : (
        
        <div style={{ backgroundImage: `url(${loginBackground})`, backgroundSize: 'cover',backgroundPosition: 'center', height: '100vh',display: 'flex',justifyContent: 'center',alignItems: 'center', }} >
          <LogForm />
        </div>
      )}
    </>
  );
}

export default Addnew;
