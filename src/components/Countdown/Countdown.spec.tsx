import { render, screen, fireEvent } from '@testing-library/react';
import { Countdown } from '.';
import { CountdownContext } from '../../contexts/CountdownContext';

describe('Countdown', () => {
  it('Renders correctly when cicle was not started', () => {
    render (
      <CountdownContext.Provider value={{
        minutes: 25,
        seconds: 0,
        hasFinished: false,
        isActive: false,
        resetCountdown: null,
        startCountdown: null,
    }}>
        <Countdown />
      </CountdownContext.Provider>
    );

    expect(screen.getByText('Iniciar um ciclo')).toBeInTheDocument()
  });

  it('Renders correctly when cicle was started', () => {
    render (
      <CountdownContext.Provider value={{
        minutes: 25,
        seconds: 0,
        hasFinished: false,
        isActive: true,
        resetCountdown: null,
        startCountdown: null,
    }}>
        <Countdown />
      </CountdownContext.Provider>
    );

    expect(screen.getByText('Abandonar ciclo')).toBeInTheDocument()
  });

  it('Renders correctly when cicle was finished', () => {
    render (
      <CountdownContext.Provider value={{
        minutes: 0,
        seconds: 0,
        hasFinished: true,
        isActive: true,
        resetCountdown: null,
        startCountdown: null,
    }}>
        <Countdown />
      </CountdownContext.Provider>
    );

    expect(screen.getByText('Ciclo encerrado')).toBeInTheDocument()
  });

  it('Starts cicle', () => {
    const mockStartCicle = jest.fn()
    const mockResetCicle = jest.fn()

    render (
      <CountdownContext.Provider value={{
        minutes: 25,
        seconds: 0,
        hasFinished: false,
        isActive: false,
        resetCountdown: mockResetCicle,
        startCountdown: mockStartCicle,
    }}>
        <Countdown />
      </CountdownContext.Provider>
    );

    const startCicle = screen.getByText('Iniciar um ciclo');
    
    fireEvent.click(startCicle)

    expect(mockResetCicle).not.toBeCalled();
    expect(mockStartCicle).toBeCalled();
  });

  it('Abandon cicle', () => {
    const mockStartCicle = jest.fn()
    const mockResetCicle = jest.fn()

    render (
      <CountdownContext.Provider value={{
        minutes: 25,
        seconds: 0,
        hasFinished: false,
        isActive: true,
        resetCountdown: mockResetCicle,
        startCountdown: mockStartCicle,
    }}>
        <Countdown />
      </CountdownContext.Provider>
    );

    const abandonCicle = screen.getByText('Abandonar ciclo');
    
    fireEvent.click(abandonCicle)

    expect(mockStartCicle).not.toBeCalled();
    expect(mockResetCicle).toBeCalled();
  });
});

