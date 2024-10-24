import React, { useEffect, useRef } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import mainVideo from '../../../assets/main_video.mp4';
import mainBackgroundVideo from '../../../assets/Main.mp4';
import { ChevronRightIcon } from '@chakra-ui/icons';

export function Mainvideo1() {
  const videoRef = useRef(null);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
        } catch (error) {
          console.error('Error playing video:', error);
        }
      }
    };
    playVideo();
  }, []);

  return (
    <Box position="relative" height="55vh" overflow="hidden">
      <Box 
        as="video" 
        ref={videoRef}
        src={mainVideo} 
        autoPlay 
        loop 
        muted 
        controls={false} // Desactiva los controles
        playsInline // Previene la pantalla completa en móviles
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="90%"
        objectFit="cover"
      />
      {/* Div que previene la interacción */}
      <Box 
        position="absolute" 
        top={0} 
        left={0} 
        width="100%" 
        height="100%" 
        onClick={(e) => e.stopPropagation()} // Evita que se propaguen los clics
      />
    </Box>
  );
}

export function Mainvideo2() {
  const backgroundVideoRef = useRef(null);

  useEffect(() => {
    const playBackgroundVideo = async () => {
      if (backgroundVideoRef.current) {
        try {
          await backgroundVideoRef.current.play();
        } catch (error) {
          console.error('Error playing background video:', error);
        }
      }
    };
    playBackgroundVideo();
  }, []);

  return (
    <Box>
      <Box position="relative" width="100%" height="25vh" overflow="hidden" mt={2}>
        <Box 
          as="video" 
          ref={backgroundVideoRef}
          src={mainBackgroundVideo} 
          autoPlay 
          loop 
          muted 
          controls={false} // Desactiva los controles
          playsInline // Previene la pantalla completa en móviles
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          objectFit="cover"
          zIndex="-1" 
        />
        {/* Div que previene la interacción */}
        <Box 
          position="absolute" 
          top={0} 
          left={0} 
          width="100%" 
          height="100%" 
          onClick={(e) => e.stopPropagation()} // Evita que se propaguen los clics
        />
        <Flex direction="column" align="center" position="relative" zIndex="1" color="white" p="20px">
          <Box alignContent="left">
            <Text fontSize="2xl" fontWeight="bold" mb={3}>TPI DESARROLLO DE SOFTWARE - Bienal 2024 -</Text>
            <Text fontSize="xl">Alumnos:</Text>
            <Text fontSize="lg" mt={1}><ChevronRightIcon />Aguirre, Julian</Text>
            <Text fontSize="lg"><ChevronRightIcon />Muñoz, Alan</Text>
            <Text fontSize="lg"><ChevronRightIcon />Ojeda, Juan</Text>
          </Box>
        </Flex>
      </Box>
      <Box bg="rgba(0, 0, 0, 0.2)" textAlign="center" p={2} fontWeight="bold">
        <Text fontSize="2xl" color="white">Artistas Invitados</Text>
      </Box>
    </Box>
  );
}
