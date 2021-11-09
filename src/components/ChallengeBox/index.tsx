import { Flex, Text, Image, Heading, Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { useContext } from 'react';

import { ChallengesContext } from '../../contexts/ChallengesContext';
import { CountdownContext } from '../../contexts/CountdownContext';

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  const { colorMode } = useColorMode();
  const bg = useColorModeValue('white', 'hsl(207, 26%, 17%)');
  const color = useColorModeValue('#666666', 'white');

  function handleChallengeSecceeded() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
}

  return (
    <Flex w='100%' maxW='468px' h='500px' align='center' justify='center' backgroundColor={bg} borderRadius='md' direction='column'>
      <Flex h='500px' align='center' justify='center'>
        { !activeChallenge ? 
          <Flex w='100%' maxW='251px' direction='column' align='center'>
            <Text fontSize='24' textAlign='center' color={color} fontWeight='500'>Inicie um ciclo <br/> para receber desafios</Text>
            <Image src='images/LevelUp.svg' alt='Arrow up' w='59px' h='80px' mt='16' />
            <Text fontSize='16' textAlign='center' color={color} fontWeight='400' mt='4'>Avance de level completando os desafios.</Text>
          </Flex> 

          :

          <Flex w='100%' maxW='340px' h='55px' justify='center' direction='column' textAlign='center'>
            <Heading color='#5965E0' fontSize='20' borderBottom='1px solid #DCDDE0' pb='6'>{`Ganhe ${activeChallenge.amount} xp`}</Heading>
            <Flex direction='column' align='center' w='100%'>
              <Image src={`images/${activeChallenge.type}.svg`} alt='Arrow up' w='150px' h='112px' mt='16' />
              <Text as='strong' color={colorMode === 'light' ? '#2E384D' : '#5965E0'} fontSize='30'>Novo desafio</Text>
              <Text color={color} fontSize='16'>{activeChallenge.description}</Text>
            </Flex>
          </Flex>
        }
      </Flex>
        { activeChallenge && <Flex direction='row' w='100%' pos='relative' justify='space-between' h='80px'>
          <Button 
            w='50%' 
            h='100%' 
            fontSize='20' 
            fontWeight='500' 
            bgColor={colorMode === 'dark' ? '#182129' : '#FFF5F5'} 
            borderRadius='none'
            borderBottomLeftRadius='md'
            color='#E83F5B'
            _hover={{filter: 'brightness(0.9)'}}
            _active={{filter: 'brightness(0.9)', transform: "scale(1.1)", zIndex: '1'}}
            onClick={handleChallengeFailed}
          >
            Falhei
          </Button>
          <Button 
            w='50%' 
            h='100%' 
            fontSize='20' 
            fontWeight='500' 
            bgColor={colorMode === 'dark' ? '#182129' : '#FFF5F5'} 
            borderRadius='none'
            borderBottomRightRadius='md'
            color='lime'
            _hover={{filter: 'brightness(0.9)'}}
            _active={{filter: 'brightness(0.9)', transform: "scale(1.1)", zIndex: '1'}}
            onClick={handleChallengeSecceeded}
          >
            Completei
          </Button>
        </Flex>}
    </Flex>
  );
}