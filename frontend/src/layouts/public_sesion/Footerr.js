import React from 'react';
import { Box, Flex, Text, Link, IconButton, Divider, VStack } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { ChevronRightIcon} from '@chakra-ui/icons'


function Footerr() {
  return (
    <Box as="footer" py={8} bg="#1E2A38" color="white" borderTop="4px solid #6BC2E5">
      <Flex  maxW="1200px" mx="auto"  flexDirection={{ base: 'column', md: 'row' }} justifyContent="space-between"  alignItems="center" px={6} >

        <Box width={{ base: '100%', md: '50%' }} mb={{ base: 4, md: 0 }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28327.271312574412!2d-59.00003899311525!3d-27.440949284939734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94450c5b839b242d%3A0x394981d825e78300!2sParque%20Intercultural%202%20de%20Febrero!5e0!3m2!1ses-419!2sar!4v1729123363700!5m2!1ses-419!2sar" 
            width="100%" 
            height="250" 
            style={{ border: 0, borderRadius: '8px' }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>

    
        <Box width={{ base: '100%', md: '40%' }} mb={{ base: 4, md: 0 }} ml={{ md: 4 }} color="#B0DAE8">
          <Text fontWeight="bold" fontSize="lg">Contacto</Text>
          <Text>Dirección:</Text>
          <Text><ChevronRightIcon/>Av. Avalos 950 Resistencia,Chaco</Text>
          <Text>Teléfono: </Text>
          <Text><ChevronRightIcon/>+54(0362)4458366</Text>
        </Box>
     
        <VStack spacing={4} alignItems="flex-end" textAlign="center" color="#B0DAE8">
          <Text fontWeight="bold" fontSize="lg" fontStyle="oblique">REDES SOCIALES</Text>
          <Flex justifyContent="center" gap={4}>
            <Link to="#" _hover={{ transform: 'scale(1.2)', transition: '0.2s', color: '#6BC2E5' }}>
              <IconButton icon={<FaFacebook />} colorScheme="transparent" variant="outline" aria-label="Facebook" />
            </Link>
            <Link to="#" _hover={{ transform: 'scale(1.2)', transition: '0.2s', color: '#6BC2E5' }}>
              <IconButton icon={<FaTwitter />} colorScheme="transparent" variant="outline" aria-label="Twitter" />
            </Link>
            <Link to="#"_hover={{ transform: 'scale(1.2)', transition: '0.2s', color: '#6BC2E5' }}>
              <IconButton icon={<FaInstagram />} colorScheme="transparent" variant="outline" aria-label="Instagram" />
            </Link>
          </Flex>
        </VStack>
      </Flex>
      <Divider orientation="horizontal" height='3px' borderColor="#6BC2E5" my={6} />
      <Box textAlign="center" mt={6} fontSize="sm" color="gray.300">
        <Text>
          © {new Date().getFullYear()} Ejemplo Inc. Todos los derechos reservados. | 
          <Link to="#" color="gray.400" _hover={{ color: '#6BC2E5' }}> Política de Privacidad </Link> | 
          <Link to="#" color="gray.400" _hover={{ color: '#6BC2E5' }}> Términos y Condiciones </Link> 
        </Text>
      </Box>
    </Box>
  );
}

export default Footerr;
