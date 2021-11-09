import { useContext } from "react";

import { UserProps } from "../../pages";
import { ChallengesContext } from "../../contexts/ChallengesContext";

import { Flex, Avatar, Text, Image, Icon, useColorModeValue, useColorMode } from '@chakra-ui/react';
import { AiOutlineExperiment } from 'react-icons/ai';

interface ProfileProps {
  result: UserProps;
}

export function Profile({ result }: ProfileProps) {
  const { level, completedChallenges, curExp } = useContext(ChallengesContext);
  const { colorMode } = useColorMode();
  const color = useColorModeValue('#666666', 'white');

  return (
    <Flex 
      w='100%' 
      maxW='390px'
      direction='column'
    >
      <Flex align='center' mb='14'>
        <Avatar name={result.name} src={result.image} w='88px' h='88px'/>
        <Flex direction='column' marginLeft='4'>
          <Text color={colorMode === 'light' ? '#2E384D' : 'white'} fontWeight='bold' fontSize='24'>{result.name}</Text>
          
          <Flex align='center'>
            <Image src='images/UpArrow.svg' alt='Arrow up' color='lime' w='16px' h='14px' />
            <Text color={color} ml='2'>Level {level} |</Text>
            <Icon as={AiOutlineExperiment} color='lime' fontSize='18' ml='1' />
            <Text color={color} ml='2'>{curExp} xp</Text>
          </Flex>
        </Flex>
      </Flex>
      
      <Flex borderBottom='1px solid #D7D8DA' pb='2' justify='space-between'>
        <Text color={color} fontSize='18' fontWeight='500'>Desafios completados</Text>
        <Text color={color} fontSize='20' fontWeight='500'>{completedChallenges}</Text>
      </Flex>
    </Flex>
  );
}