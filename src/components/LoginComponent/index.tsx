import { signIn } from "next-auth/react";
import { Flex, Text, Image, Icon, Button, useBreakpointValue } from '@chakra-ui/react';

import Head from 'next/head';

import { RiGithubFill } from 'react-icons/ri';

export function LoginComponent() {
  const isMobile = useBreakpointValue({ base: true, xl: false });

  return (
    <>
      <Head>
        <title>Moveit | Login</title>
      </Head>

      <Flex
        bgColor={'#5965E0'} 
        h='100vh'
        w='100%'
        justify={{'base': 'center', 'xl': 'space-between'}}
        align={{'md': 'center'}}
      >
        {!isMobile && <Flex
          w='100%'
          maxW='720px' 
          maxH='660px'
          alignSelf='flex-end'
        >
          <Image src='images/Simbolo.svg' alt='Simbolo' w='100%' />
        </Flex>}

        <Flex direction='column' w='100%' maxW='720px' align={{'base': 'center', 'xl': 'start'}} px='20' mt='20'>
          <Image src='images/Logo.svg' alt='Logo' mb='24' />
          <Text color='white' fontSize={['28', '32', '34', '36']} fontWeight='bold' mb='6'>Bem-vindo</Text>

          <Flex align='center' maxW='318px' marginBottom='10'>
            <Icon as={RiGithubFill} fontSize='40' color='#B2B9FF' />
            <Text marginLeft='6' fontSize={['14', '16', '18', '20']} color='#B2B9FF'>Faça login com seu Github para começar</Text>
          </Flex>
          
          <Button
            bgColor='#4953B8'
            color='#B2B9FF'
            fontSize={['14', '16', '18', '20']}
            height='16'
            maxW='72'
            _hover={{filter: 'brightness(0.9)'}}
            _active={{filter: 'brightness(0.9)', transform: "scale(1.1)"}}
            onClick={() => signIn('github')}
          >
            <Icon as={RiGithubFill} fontSize='32' color='#B2B9FF' marginRight='4' />
            Login com Github
          </Button>
        </Flex>
      </Flex>
    </>
  );
}