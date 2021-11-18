import { render, screen } from '@testing-library/react';
import { ModalCard } from '.';
import { ChallengesContext } from '../../contexts/ChallengesContext';

describe('ModalCard', () => {
  it('Renders correctly', () => {
    const level = 2

    render (
      <ChallengesContext.Provider 
        value={{
          level: level,
          levelUp: null,
          curExp: null,
          completedChallenges: null,
          startNewChallenge: null ,
          activeChallenge: null,
          resetChallenge: null,
          completeChallenge: null,
          experienceToNextLevel: null,
          openModal: true
        }}>
        <ModalCard />
      </ChallengesContext.Provider>
    );

    expect(screen.getByText(level)).toBeInTheDocument()
    expect(screen.getByText('Parabéns')).toBeInTheDocument()
    expect(screen.getByText('Você alcançou um novo level.')).toBeInTheDocument()
  });
});

