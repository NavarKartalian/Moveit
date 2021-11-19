import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { mocked } from 'ts-jest/utils';
import Leaderboard from '../../pages/Leaderboard';

jest.mock('next-auth/react');

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/Leaderboard'
      }
    }
  }
});

const result = [{
  data: {
    id: 54,
    name: 'John Doe',
    image: 'Fake Img',
    level: 2,
    curExp: 55,
    completedChallenges: 2,
  }
}]

describe('Leaderboard Page', () => {
  it('Renders correctly when not authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({data: null, status: 'unauthenticated'});

    render ( <Leaderboard result={result}/> );

    expect(screen.getByText('Faça login com seu Github para começar')).toBeInTheDocument();
  });

  it('Renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({data: {session: { user: {}}, expires: 'Fake_expire'}, status: 'authenticated'});

    render ( <Leaderboard result={result} /> );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});