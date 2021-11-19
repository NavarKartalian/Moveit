import { render, screen } from '@testing-library/react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import { useSession } from 'next-auth/react';
import Home from '../../pages';
import { mocked } from 'ts-jest/utils';

jest.mock('next-auth/react');

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
});

const result = {
  id: 'fake_id',
  name: 'John Doe',
  image: 'Fake Img',
  level: 2,
  curExp: 55,
  completedChallenges: 2,
}

describe('Home Page', () => {
  it('Renders correctly when not authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({data: null, status: 'unauthenticated'});

    render (
      <ChallengesContext.Provider 
        value={{
          level: result.level,
          levelUp: null,
          curExp: result.curExp,
          completedChallenges: result.completedChallenges,
          startNewChallenge: null ,
          activeChallenge: null,
          resetChallenge: null,
          completeChallenge: null,
          experienceToNextLevel: null,
          openModal: false
        }}>
        <Home result={null} />
      </ChallengesContext.Provider>
    );

    expect(screen.getByText('Faça login com seu Github para começar')).toBeInTheDocument();
  });

  it('Renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({data: {session: { user: {}}, expires: 'Fake_expire'}, status: 'authenticated'});

    render (
      <ChallengesContext.Provider 
        value={{
          level: result.level,
          levelUp: null,
          curExp: result.curExp,
          completedChallenges: result.completedChallenges,
          startNewChallenge: null ,
          activeChallenge: null,
          resetChallenge: null,
          completeChallenge: null,
          experienceToNextLevel: null,
          openModal: false
        }}>
        <Home result={result} />
      </ChallengesContext.Provider>
    );

    expect(screen.getByText(result.name)).toBeInTheDocument();
  });
});