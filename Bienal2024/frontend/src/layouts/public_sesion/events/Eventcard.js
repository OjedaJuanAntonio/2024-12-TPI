import React from 'react';
import { 
    Card, 
    CardHeader, 
    Flex, 
    Box, 
    Heading, 
    Text, 
    CardBody, 
    Image, 
    CardFooter, 
    Button 
} from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiLike, BiChat, BiShare } from 'react-icons/bi';

function Eventcard({ evento }) {
  return (
    <Card maxW='md'>
      <CardHeader>
        <Flex spacing='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Box>
              <Heading size='sm'>{evento.event_name}</Heading>
              <Text>{evento.creatorRole}</Text>
            </Box>
          </Flex>
          <IconButton
            variant='ghost'
            colorScheme='gray'
            aria-label='See menu'
            icon={<BsThreeDotsVertical />}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          {evento.info}
        </Text>
      </CardBody>
      <Image
        objectFit='cover'
        src={evento.Img_Profile} 
        alt={evento.imageAlt}
      />

      <CardFooter
        justify='space-between'
        flexWrap='wrap'
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
          Like
        </Button>
        <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
          Comment
        </Button>
        <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Eventcard;
