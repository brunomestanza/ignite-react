import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { SignInButton } from '.';

jest.mock('next-auth/react');

describe('SignInButton Component', () => {
  it('Renders correctly when user is not authenticated', () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false] as any);

    render(
      <SignInButton />
    );

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
  });

  it('Renders correctly when user is authenticated', () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce({data: { user: { name: 'John Doe', email: 'johndoe@example.com'}, expires: 'fake-expires'}} as any);
    render(
      <SignInButton />
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
