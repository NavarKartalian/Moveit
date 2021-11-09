import { Flex, Text, Box, Button, Icon, useColorModeValue } from '@chakra-ui/react';
import { useContext } from 'react';

import { AiFillCaretRight, AiOutlineClose, AiFillCheckCircle } from 'react-icons/ai';

import { CountdownContext } from '../../contexts/CountdownContext';

export function Countdown() {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    resetCountdown,
    startCountdown
  } = useContext(CountdownContext);

  const bg = useColorModeValue('white', 'hsl(207, 26%, 17%)');
  const color = useColorModeValue('#2E384D', 'white');

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <Flex direction='column' maxW='389px' mb={{'base': '8', 'lg': '0'}}>
      <Flex 
        textAlign='center' 
        fontFamily='Rajdhani' 
        fontSize={{'base': '96', 'lg': '120'}} 
        color={color} 
        fontWeight='bold' 
        mt='14' 
        maxH='144px' 
        align='center'
        mb='10'
      >
        <Text width={{'base': '64px', 'lg': '88px'}} bgColor={bg} borderRadius='md' mr='1'>{minuteLeft}</Text>
        <Text width={{'base': '64px', 'lg': '88px'}} bgColor={bg} borderRadius='md' mr='1'>{minuteRight}</Text>

        <Text mr='1'>:</Text>

        <Text width={{'base': '64px', 'lg': '88px'}} bgColor={bg} borderRadius='md' mr='1'>{secondLeft}</Text>
        <Text width={{'base': '64px', 'lg': '88px'}} bgColor={bg} borderRadius='md'>{secondRight}</Text>
      </Flex>

      <Box width='100%' fontWeight='600'>
        {!! !hasFinished ? !isActive ?
          <Button 
            w='100%' 
            p='10' 
            bgColor='#5965E0' 
            color='white' 
            fontSize='20'
            borderRadius='md'
            _hover={{filter: 'brightness(0.9)'}}
            _active={{filter: 'brightness(0.9)', transform: "scale(1.1)"}}
            onClick={startCountdown}
          >
            Iniciar um ciclo
            <Icon as={AiFillCaretRight} ml='2' />
          </Button>

          :

          <Button 
            w='100%' 
            p='10' 
            bgColor='#E83F5B' 
            color='white' 
            fontSize='20'
            borderRadius='md'
            _hover={{filter: 'brightness(0.9)'}}
            _active={{filter: 'brightness(0.9)', transform: "scale(1.1)"}}
            onClick={resetCountdown}
          >
            Abandonar ciclo
            <Icon as={AiOutlineClose} ml='2' />
          </Button>

          :

          <Button 
            w='100%' 
            p='10' 
            bgColor='lime' 
            color='white' 
            fontSize='20'
            borderRadius='md'
            _hover={{filter: 'brightness(0.9)'}}
            disabled
          >
            Ciclo encerrado
            <Icon as={AiFillCheckCircle} ml='2' />
          </Button>
        }
      </Box>
    </Flex>
  );
}