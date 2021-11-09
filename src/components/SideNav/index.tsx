import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from "next-auth/react";

import { 
  Flex, 
  Image, 
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, 
  useColorMode, 
  useColorModeValue, 
  useBreakpointValue, 
  useDisclosure 
} from '@chakra-ui/react';
import { FiHome, FiAward, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';

export function SideNav() {
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue('white', 'hsl(207, 26%, 17%)');
  const color = useColorModeValue('#666666', 'white');
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <>
      {!isMobile && 
        <Flex w='100%' maxW='112px' minH='100vh' bgColor={bg} direction='column'>
          <Flex h='100vh' direction='column' align='center'>
            <Flex direction='column'>
              <Image src='images/Icon.svg' alt='Moveit Icon' w='12' h='10' mt='8' />
              <IconButton 
                aria-label='Toggle color mode' 
                icon={colorMode === 'light' ? <FiMoon /> : <FiSun/>} 
                colorScheme=''
                color={color}
                fontSize='32'
                mt='8'
                _hover={{ color: '#5965E0' }}
                onClick={toggleColorMode}
              />
            </Flex>

            <Flex direction='column' my='auto' w='100%'>
              <Link passHref href='/'>
                  <IconButton 
                    aria-label='Home page' 
                    icon={<FiHome />} 
                    color={ colorMode === 'light' ? 
                            router.asPath === '/Leaderboard' ? '#666666' : 
                            '#5965E0' : router.asPath === '/Leaderboard' ? 
                            'white' : '#5965E0'
                          } 
                    fontSize='32' 
                    mb='8' 
                    colorScheme='' 
                    _hover={{ color: '#5965E0' }}
                    _after={router.asPath === '/' && {
                      content: `""`,
                      height: '100%',
                      width: '3px',
                      backgroundColor: '#5965E0',
                      position: 'absolute',
                      left: 0.4,
                      borderRightRadius: '3px'
                    }} 
                  />
                </Link>

                <Link passHref href='/Leaderboard'>
                  <IconButton 
                    aria-label='Leaderboard' 
                    icon={<FiAward />} 
                    color={ colorMode === 'light' ? 
                            router.asPath === '/' ? '#666666' : 
                            '#5965E0' : router.asPath === '/' ? 
                            'white' : '#5965E0'
                          } 
                    fontSize='32' 
                    mb='8'
                    colorScheme=''
                    _hover={{ color: '#5965E0' }}
                    _after={router.asPath === '/Leaderboard' && {
                      content: `""`,
                      height: '100%',
                      width: '3px',
                      backgroundColor: '#5965E0',
                      position: 'absolute',
                      left: 0.4,
                      borderRightRadius: '3px'
                    }} 
                  />
                </Link>

                <IconButton 
                  aria-label='Sign Out' 
                  icon={<FiLogOut />} 
                  colorScheme='' 
                  color={color} 
                  fontSize='32'
                  onClick={() => signOut()}
                  _hover={{ color: '#E83F5B' }}
                />
            </Flex>
          </Flex>
        </Flex>
      }

      {isMobile && 
        <>
          <IconButton aria-label='Open modal' 
            icon={<Image src='images/Icon.svg' alt='Moveit Icon' />} 
            colorScheme=''
            mt='10'
            maxW='112px'
            onClick={onOpen}
          />

          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
          >
            <DrawerOverlay w='100%' h='100%' />
            <DrawerContent w='100%' maxW='112px' minH='100%'>
              <DrawerBody>
              <Flex h='100%' direction='column' align='center'>
                <Flex direction='column'>
                  <IconButton aria-label='Open modal' 
                    icon={<Image src='images/Icon.svg' alt='Moveit Icon' />} 
                    colorScheme=''
                    mt='8'
                    onClick={onClose}
                  />
                  <IconButton 
                    aria-label='Toggle color mode' 
                    icon={colorMode === 'light' ? <FiMoon /> : <FiSun/>} 
                    colorScheme=''
                    color={color}
                    fontSize='32'
                    mt='8'
                    _hover={{ color: '#5965E0' }}
                    onClick={toggleColorMode}
                  />
                </Flex>

                <Flex direction='column' my='auto' w='100%'>
                  <Link passHref href='/'>
                      <IconButton 
                        aria-label='Home page' 
                        icon={<FiHome />} 
                        color={ colorMode === 'light' ? 
                                router.asPath === '/Leaderboard' ? '#666666' : 
                                '#5965E0' : router.asPath === '/Leaderboard' ? 
                                'white' : '#5965E0'
                              } 
                        fontSize='32' 
                        mb='8' 
                        colorScheme='' 
                        _hover={{ color: '#5965E0' }}
                      />
                    </Link>

                    <Link passHref href='/Leaderboard'>
                      <IconButton 
                        aria-label='Leaderboard' 
                        icon={<FiAward />} 
                        color={ colorMode === 'light' ? 
                                router.asPath === '/' ? '#666666' : 
                                '#5965E0' : router.asPath === '/' ? 
                                'white' : '#5965E0'
                              } 
                        fontSize='32' 
                        mb='8'
                        colorScheme=''
                        _hover={{ color: '#5965E0' }}
                      />
                    </Link>

                    <IconButton 
                      aria-label='Sign Out' 
                      icon={<FiLogOut />} 
                      colorScheme='' 
                      color={color} 
                      fontSize='32'
                      onClick={() => signOut()}
                      _hover={{ color: '#E83F5B' }}
                    />
                </Flex>
              </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      }
    </>
  );
}