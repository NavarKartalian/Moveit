import { 
  Flex, 
  Heading, 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  Avatar, 
  Text, 
  Image,
  useColorMode,
  useColorModeValue,
  useBreakpointValue
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from 'next/head';

import { LoginComponent } from "../../components/LoginComponent";
import { SideNav } from "../../components/SideNav";
import { api } from "../../services/api";

interface userProps {
  data: {
    id: number,
    name: string,
    image: string,
    level: number,
    curExp: number,
    completedChallenges: number,
  }
}

interface UserResults {
  result: userProps[];
}

export default function Leaderboard({ result }: UserResults) {
  const { data: session } = useSession();

  const { colorMode } = useColorMode();
  const bg = useColorModeValue('white', 'hsl(207, 26%, 17%)');
  const color = useColorModeValue('#666666', 'white');
  const isMobile = useBreakpointValue({ base: true, lg: false });

  if(!result) {
    return <LoginComponent />
  }
  
  return (
    <>
      <Head>
        <title>Moveit | Leaderboard</title>
      </Head>
      
      { !session ? <LoginComponent /> :
        <Flex w='100%' direction={{'base': 'column', 'lg': 'row'}}>
          <SideNav />

          <Flex w='100%' maxW='960px' direction='column' mx='auto' mt='10' mb='8'>
            <Heading color={colorMode === 'light' ? '#2E384D' : 'white'} fontWeight='600' mb='10'>Leaderboard</Heading>
            
            <Table variant="unstyled" size='lg'>
              <Thead>
                <Tr>
                  <Th p='0' color={color} fontSize='14' fontWeight='700'>Posição</Th>
                  <Th color={color} fontSize='14'>Usuário</Th>
                  <Th isNumeric color={color} w='220px'>Desafios</Th>
                  <Th isNumeric color={color} w='200px'>Experiência</Th>
                </Tr>
              </Thead>
              <Tbody>
                {result.map((user, index) => (
                  <Tr key={user.data.id}>
                    <Td 
                      p='0' 
                      borderRadius='md' 
                      backgroundColor={bg}
                      borderBottom={colorMode === 'light' ? '4px solid #E5E5E5' : '4px solid hsl(207, 17%, 24%)'}
                      textAlign='center' 
                      w='72px' 
                      h='96px' 
                      color={color} 
                      fontSize='24'
                    >
                      {index + 1 }
                    </Td>
                    <Td 
                      borderLeftRadius='md' 
                      borderLeft={colorMode === 'light' ? '4px solid #E5E5E5' : '4px solid hsl(207, 17%, 24%)'} 
                      borderBottom={colorMode === 'light' ? '4px solid #E5E5E5' : '4px solid hsl(207, 17%, 24%)'} 
                      backgroundColor={bg}
                    >
                      <Flex direction='row' align='center'>
                        <Avatar name='Navar Kartalian' src={user.data.image} w='64px' h='64px' mr='2'/>
                        <Flex direction='column'>
                          <Text color={colorMode === 'light' ? '#2E384D' : 'white'} fontWeight='bold' fontSize='20'>{user.data.name}</Text>
                          <Flex align='center'>
                            <Image src='images/UpArrow.svg' alt='Arrow up' color='lime' w='16px' h='14px' />
                            <Text color={color} ml='2' fontSize='16'>Level {user.data.level}</Text>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td 
                      isNumeric 
                      backgroundColor={bg} 
                      borderBottom={colorMode === 'light' ? '4px solid #E5E5E5' : '4px solid hsl(207, 17%, 24%)'}
                    >
                      <Text color='#5965E0' fontSize='16'>{user.data.completedChallenges}
                        <Text as='span' color={color}> completados</Text>
                      </Text>
                    </Td>
                    <Td 
                      borderRightRadius='md' 
                      isNumeric 
                      backgroundColor={bg} 
                      borderBottom={colorMode === 'light' ? '4px solid #E5E5E5' : '4px solid hsl(207, 17%, 24%)'}
                    >
                      <Text color='#5965E0' fontSize='16'>{user.data.curExp}
                        <Text as='span' color={color}> xp</Text>
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
        </Flex>
      }
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const session = await getSession({ req });
    
    if(session) {
      const response = await api.get('getAllUsers', { params: { key: process.env.API_KEY } });
      const data = response.data

      const sortedResult = [...data];

      const result = sortedResult.sort((a, b) => {
        if(a.data.level < b.data.level || a.data.level == b.data.level && a.data.completedChallenges < b.data.completedChallenges) {
          return 1
        }
        if (a.data.level > b.data.level || a.data.level == b.data.level && a.data.completedChallenges > b.data.completedChallenges) {
          return -1;
        }
        return 0;
      });

      return {
        props: {
          result,
        }
      }
    } else {
      return {
        props: {}
      }
    }
  } catch {
    return {
      props: {}
    }
  }
}