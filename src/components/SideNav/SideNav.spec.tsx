import { render, screen } from '@testing-library/react';
import { SideNav } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
});

describe('SideNav', () => {
  it('Renders correctly', () => {
    render (
        <SideNav />
    );

    expect(screen.getByAltText('Moveit Icon')).toBeInTheDocument();
    expect(screen.getByLabelText('Home page')).toBeInTheDocument();
    expect(screen.getByLabelText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByLabelText('Sign Out')).toBeInTheDocument();
  });
});

