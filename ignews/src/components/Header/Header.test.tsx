import { render, screen } from '@testing-library/react';
import { Header } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      };
    },
  };
});

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});

describe('Header Component', () => {
  it('Renders correctly', () => {
    render(
      <Header />
    );
    // Maneira simples de procurar por algo dentro da renderização de por exemplo um componente
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
  });
});
