import React from 'react';
import {Box,Text,Center,Avatar,WrapItem,Wrap,} from '@chakra-ui/react';

function SculptorCardMain() {

  return (
    <Center>
        <Box textAlign="center" maxW="200px"p={4} boxShadow="2xl" bg="white" spacing="20px" >
            <Center>
                <Wrap>
                    <WrapItem>
                        <Avatar size='2xl' name='Dan Abrahmov' src='https://bit.ly/dan-abramov'  border="3px solid black"  />
                    </WrapItem>
                </Wrap>
            </Center>
            <Text fontWeight="bold" fontSize="lg" mt={2}>Joenas Brauers</Text>
            <Text color="gray.500" fontSize="sm">Web Developer</Text>
        </Box>
    </Center>
  );
}

export default SculptorCardMain;
