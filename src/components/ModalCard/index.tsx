import { 
  useDisclosure, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalCloseButton,
  ModalBody,
  Flex,
  Text,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";

import { ChallengesContext } from "../../contexts/ChallengesContext";


export function ModalCard() {
  const { level, openModal } = useContext(ChallengesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { colorMode } = useColorMode();
  const bg = useColorModeValue('#f1f1f1', 'hsl(207, 26%, 17%)');
  const color = useColorModeValue('#666666', 'white');

  useEffect(() => {
    if(openModal === true) {
      onOpen();
    }
  }, [openModal, onOpen]);

  return (
    <Flex position='absolute'>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW={{'base': '300px', 'lg': '398px'}} height={{'base': '260px', 'lg': '340px'}}>
          <ModalCloseButton />
          <ModalBody backgroundColor={bg} borderRadius='lg'>
            <Flex direction='column' align='center'>
              <Text 
                color='#5965E0' 
                minW={{'base': '130px', 'lg': '160px'}} 
                minH={{'base': '150px', 'lg': '180px'}}
                fontSize={{'base': '100px', 'lg': '140px'}} 
                backgroundImage='images/Union.png' 
                backgroundPosition='center' 
                backgroundSize='contain' 
                backgroundRepeat='no-repeat'
                textAlign='center'
              >
                {level}
              </Text>
              <Text color={colorMode === 'light' ? '#2E384D' : 'white'} fontSize='30' fontWeight='600'>Parabéns</Text>
              <Text color={color} fontSize={{'base': '16', "lg": '20'}}>Você alcançou um novo level.</Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}