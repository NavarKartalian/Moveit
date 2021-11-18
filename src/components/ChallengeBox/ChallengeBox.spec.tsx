import { render, screen, fireEvent } from '@testing-library/react';
import { ChallengeBox } from '.';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import { CountdownContext } from '../../contexts/CountdownContext';

describe('ChallengeBox', () => {
  it('Renders correctly when no challenge is avaiable', () => {
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
          experienceToNextLevel: null,
          openModal: false
        }}>
        <ChallengeBox />
      </ChallengesContext.Provider>
    );

    expect(screen.getByText('Avance de level completando os desafios.')).toBeInTheDocument()
  });

  it('Renders Challenge', () => {
    render(
      <ChallengesContext.Provider 
        value={{
          level: null,
          levelUp: null,
          curExp: null,
          completedChallenges: null,
          startNewChallenge: null ,
          activeChallenge: {amount: 1, description: 'fake description', type: 'body'},
          resetChallenge: null,
          completeChallenge: null,
          experienceToNextLevel: null,
          openModal: false
        }}>
        <ChallengeBox />
      </ChallengesContext.Provider>
    );

    expect(screen.getByText(`Ganhe ${1} xp`)).toBeInTheDocument();
    expect(screen.getByText('fake description')).toBeInTheDocument();
    expect(screen.getByText('Falhei')).toBeInTheDocument();
    expect(screen.getByText('Completei')).toBeInTheDocument();
  });

  it('Complete Challenge', () => {
    const mockCompleteChallenge = jest.fn()
    const mockResetCountdown = jest.fn()

    render(
      <ChallengesContext.Provider 
        value={{
          level: null,
          levelUp: null,
          curExp: null,
          completedChallenges: null,
          startNewChallenge: null ,
          activeChallenge: {amount: 1, description: 'fake description', type: 'body'},
          resetChallenge: null,
          completeChallenge: mockCompleteChallenge,
          experienceToNextLevel: null,
          openModal: false
        }}>
        <CountdownContext.Provider value={{
            minutes: 0,
            seconds: 0,
            hasFinished: true,
            isActive: false,
            resetCountdown: mockResetCountdown,
            startCountdown: null,
        }}>
          <ChallengeBox />
        </CountdownContext.Provider>
      </ChallengesContext.Provider>
    );

    const completeButton = screen.getByText('Completei');
    
    fireEvent.click(completeButton)

    expect(mockCompleteChallenge).toHaveBeenCalled();
    expect(mockResetCountdown).toHaveBeenCalled();
  });

  it('Fail Challenge', () => {
    const mockResetCountdown = jest.fn()
    const mockResetChallenge = jest.fn()

    render(
      <ChallengesContext.Provider 
        value={{
          level: null,
          levelUp: null,
          curExp: null,
          completedChallenges: null,
          startNewChallenge: null ,
          activeChallenge: {amount: 1, description: 'fake description', type: 'body'},
          resetChallenge: mockResetChallenge,
          completeChallenge: null,
          experienceToNextLevel: null,
          openModal: false
        }}>
        <CountdownContext.Provider value={{
            minutes: 0,
            seconds: 0,
            hasFinished: true,
            isActive: false,
            resetCountdown: mockResetCountdown,
            startCountdown: null,
        }}>
          <ChallengeBox />
        </CountdownContext.Provider>
      </ChallengesContext.Provider>
    );

    const failButton = screen.getByText('Falhei');
    
    fireEvent.click(failButton)

    expect(mockResetChallenge).toHaveBeenCalled();
    expect(mockResetCountdown).toHaveBeenCalled();
  });
});

