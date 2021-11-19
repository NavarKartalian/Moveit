import { render, screen, fireEvent } from '@testing-library/react';
import { signIn, useSession } from 'next-auth/react';
import { mocked } from 'ts-jest/utils'
import { LoginComponent } from '.';

jest.mock('next-auth/react');

describe('LoginComponent', () => {
  it('Renders correctly', () => {
    render ( <LoginComponent /> );

    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Bem-vindo')).toBeInTheDocument();
    expect(screen.getByText('Faça login com seu Github para começar')).toBeInTheDocument();
    expect(screen.getByText('Login com Github')).toBeInTheDocument();
  });

  it('Should SignIn when not authenticated', () => {
    const useSessionMocked = mocked(useSession);
    const signInMocked = mocked(signIn);

    useSessionMocked.mockReturnValueOnce({data: null, status: 'unauthenticated'});

    render ( <LoginComponent /> );

    const signInButton = screen.getByText('Login com Github');

    fireEvent.click(signInButton);

    expect(signInMocked).toHaveBeenCalled();
  });
});

