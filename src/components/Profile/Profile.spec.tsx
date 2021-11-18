import { render, screen, fireEvent } from '@testing-library/react';
import { Profile } from '.';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import { CountdownContext } from '../../contexts/CountdownContext';

describe('Profile', () => {
  it('Renders correctly', () => {
    const result = {
      id: 'fake_id',
      name: 'John Doe',
      image: 'Fake Img',
      level: 2,
      curExp: 55,
      completedChallenges: 2,
    }

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
        <Profile result={result} />
      </ChallengesContext.Provider>
    );

    expect(screen.getByText(result.name)).toBeInTheDocument()
    expect(screen.getByText(`Level ${result.level} |`)).toBeInTheDocument()
    expect(screen.getByText(`${result.curExp} xp`)).toBeInTheDocument()
    expect(screen.getByText('Desafios completados')).toBeInTheDocument()
    expect(screen.getByText(result.completedChallenges)).toBeInTheDocument()
  });
});

