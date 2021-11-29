import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession, useSession } from "next-auth/react";
import { Flex, useBreakpointValue } from '@chakra-ui/react';

import { api } from '../services/api';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from "../contexts/CountdownContext";

import { ChallengeBox } from '../components/ChallengeBox';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { LoginComponent } from "../components/LoginComponent";
import { Profile } from '../components/Profile';
import { SideNav } from '../components/SideNav';
import { ModalCard } from '../components/ModalCard';

export interface UserProps {
  id: string;
  name: string;
  image: string;
  level: number;
  curExp: number;
  completedChallenges: number;
}

interface UserResults {
  result: UserProps;
}

export default function Home({ result }: UserResults) {
  const { data: session } = useSession();

  const isMobile = useBreakpointValue({ base: true, lg: false });

  if(!result) {
    return <LoginComponent />
  }

  return (
    <>
      { !session ? <LoginComponent /> :

        <ChallengesProvider
          level={result.level}
          curExp={result.curExp}
          completedChallenges={result.completedChallenges}
        >
          <Head>
            <title>Moveit | Home</title>
          </Head>

          <Flex w='100%' direction={{'base': 'column', 'lg': 'row'}}>
            <ModalCard />
            <SideNav />

            <Flex 
              w='100%' 
              maxW='960px' 
              direction='column' 
              mx='auto' 
              mt='10'
              p={{'base': '8', 'lg': '0'}} 
              align={{'base': 'center', 'lg': 'unset'}}
            >
              <ExperienceBar />

              <CountdownProvider>
                <Flex justify={{'base': 'center', 'lg': 'space-between'}} direction={{'base': 'column', 'lg': 'row'}}>
                  <Flex direction='column'>
                    <Profile result={result} />
                    <Countdown />
                  </Flex>

                  <ChallengeBox />
                </Flex>
              </CountdownProvider>
            </Flex>
          </Flex>
        </ChallengesProvider>
      }
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const session = await getSession({ req });
    const id = session.userId
    
    if(session) {
      const response = await api.get('getUser', { params: { id: id, key: process.env.API_KEY } });
      const result = response.data

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
