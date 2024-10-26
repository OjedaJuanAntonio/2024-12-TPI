import React, { useEffect, useState } from 'react';
import LogForm from './Logform';
import Loginbackground from '../../../assets/Loginbackground.jpg'
import { Box } from '@chakra-ui/react';
import { HashLoader } from 'react-spinners';


function Addnew() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {const timer = setTimeout(() => {setLoading(false); }, 1000);

  return () => clearTimeout(timer);}, []);

  return (
    <>
     
      {loading ? (
        <Box height="100vh"display="flex"justifyContent="center" alignItems="center" >
          <HashLoader/>
        </Box>
      ) : (
        <div style={{ backgroundImage: `url(${Loginbackground})`,height: "90vh",padding:'80px'}}>
            <LogForm />
        </div>
      )}
    </>
  );
}

export default Addnew;
