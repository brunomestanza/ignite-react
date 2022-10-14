import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 3px solid transparent; // Utilizamos essa borda para que ele tenha o mesmo espaço de borda em cima e em baixo e se mantenha centralizado
      border-bottom: 3px solid transparent;

      color: ${({ theme }) => theme['gray-100']};

      &:hover {
        border-bottom: 3px solid ${({ theme }) => theme['green-500']};
      }

      &.active {
        // Sempre que estamos na rota, componente NavLink responsável pela navegação setta o elemento HTML com uma classe active automaticamente
        color: ${({ theme }) => theme['green-500']};
      }
    }
  }
`
