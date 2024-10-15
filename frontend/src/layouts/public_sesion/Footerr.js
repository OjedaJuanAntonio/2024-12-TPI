import React from 'react'
import { Box,Flex,Text,Link,Stack,IconButton,} from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footerr() {
  return (
     <Box bg="black" color="white" py={10}>
      <Flex maxW="1200px" mx="auto" flexDirection={{ base: 'column', md: 'row' }}justifyContent="center"alignItems="center"px={6}>
        <Stack textAlign="center">
          <Text fontWeight="bold" fontSize="lg" fontStyle="oblique">REDES SOCIALES</Text>
          <Flex justifyContent="center" gap={4}>
            <Link href="#" _hover={{ transform: 'scale(1.2)', transition: '0.2s' }}>
              <IconButton icon={<FaFacebook />} colorScheme="gray" variant="outline" />
            </Link>
            <Link href="#" _hover={{ transform: 'scale(1.2)', transition: '0.2s' }}>
              <IconButton icon={<FaTwitter />} colorScheme="gray" variant="outline" />
            </Link>
            <Link href="#" _hover={{ transform: 'scale(1.2)', transition: '0.2s' }}>
              <IconButton icon={<FaInstagram />} colorScheme="gray" variant="outline" />
            </Link>
          </Flex>
        </Stack>
      </Flex>

      <Box textAlign="center" mt={6}>
        <Text fontSize="xl">© Copyright 2024</Text>
      </Box>
    </Box>
  )
}

export default Footerr