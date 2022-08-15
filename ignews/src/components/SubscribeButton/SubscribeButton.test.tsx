import { render, screen, fireEvent } from '@testing-library/react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SubscribeButton } from '.';

jest.mock('next-auth/react');

jest.mock('next/router');

describe('SubscribeButton Component', () => {
  it('Renders correctly', () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false] as any);
    render( <SubscribeButton /> );

    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  });

  it('Redirects user to sign in when not authenticated', () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false] as any);
    const signInMocked = jest.mocked(signIn)
    render( <SubscribeButton /> );
    const subscribeButton = screen.getByText('Subscribe now');
    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it('redirects to posts when user already has a subscription', () => {
    const useRouterMocked = jest.mocked(useRouter);
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: 'John Doe',
          email: 'johndoe@example.com'
        },
        activeSubscription: 'fake-active-subscription',
        expires: 'fake-expires'
      }
    } as any);
    const pushMock = jest.fn();
    useRouterMocked.mockReturnValueOnce({push: pushMock} as any);
    render( <SubscribeButton /> );
    const subscribeButton = screen.getByText('Subscribe now');
    fireEvent.click(subscribeButton);
    expect(pushMock).toHaveBeenCalledWith('/posts');
  });
});
