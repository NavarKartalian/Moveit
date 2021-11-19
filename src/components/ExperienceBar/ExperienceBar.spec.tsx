import { render, screen, fireEvent } from '@testing-library/react';
import { ExperienceBar } from '.';
import { ChallengesContext } from '../../contexts/ChallengesContext';

describe('ExperienceBar', () => {
  it('Renders correctly', () => {
    const experienceToNextLevel = 96;

    render (
      <ChallengesContext.Provider 
        value={{
          level: null,
          levelUp: null,
          curExp: null,
          completedChallenges: null,
          startNewChallenge: null ,
          activeChallenge: null,
          resetChallenge: null,
          completeChallenge: null,
          experienceToNextLevel: experienceToNextLevel,
          openModal: false
        }}>
        <ExperienceBar />
      </ChallengesContext.Provider>
    );

    expect(screen.getByText('0 xp')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText(`${experienceToNextLevel} xp`)).toBeInTheDocument()
  });
})