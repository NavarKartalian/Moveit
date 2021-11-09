import { Flex, Progress, Text, useColorModeValue } from '@chakra-ui/react';
import { useContext } from 'react';

import { ChallengesContext } from '../../contexts/ChallengesContext';

export function ExperienceBar() {
  const { curExp, experienceToNextLevel } = useContext(ChallengesContext);

  const bg = useColorModeValue('#DCDDE0', 'hsl(207, 26%, 17%)');
  const color = useColorModeValue('#666666', 'white');

  return (
    <Flex w='100%' direction='row' align='center' mb={{'base': '70px', 'lg': '140px'}} justify='center'>
      <Text fontSize='14' color={color} mr='4'>0 xp</Text>

      <Progress 
        value={curExp} 
        borderRadius='2xl' 
        w='100%' 
        maxW='845px' 
        h='4px' 
        backgroundColor={bg} 
        colorScheme='lime'
        max={experienceToNextLevel}
      />

      <Text fontSize='14' color={color} ml='4'>{experienceToNextLevel} xp</Text>
    </Flex>
  );
}