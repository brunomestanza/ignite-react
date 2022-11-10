import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import styled from 'styled-components'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw; // Estilização para que o modal se posicione de forma relativa a viewport, e ocupe a tela inteira
  height: 100vh;

  inset: 0; // Mesma coisa que escrever top: 0, left: 0, bottom: 0, right: 0

  background-color: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background-color: ${(props) => props.theme['gray-800']};
  position: fixed;

  // As duas linhas abaixo fazem com que o conteúdo vá pro centro da tela, mas isso não conta com o tamanho do conteúdo em si
  top: 50%;
  left: 50%;

  // Aqui contamos com o tamanho do conteúdo e o centralizamos ao centro exato da tela
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      border-radius: 6px;
      border: 0;
      background-color: ${(props) => props.theme['gray-900']};
      color: ${(props) => props.theme['gray-300']};
      padding: 1rem;

      &::placeholder {
        color: ${(props) => props.theme['gray-500']};
      }
    }

    button[type='submit'] {
      height: 58px;
      border: 0;
      background-color: ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 1.5rem;
      cursor: pointer;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:not(:disabled)&:hover {
        background-color: ${(props) => props.theme['green-700']};
        transition: background-color 0.2s;
      }
    }
  }
`

export const CloseButton = styled(Dialog.Trigger)`
  position: absolute;
  background-color: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0; // Faz com que a caixa que aparece ao redor do botão em alguns casos, com em tab por exemplo, fique do tamanho do botão
  cursor: pointer;
  color: ${(props) => props.theme['gray-500']};
`

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`

interface TransactionTypeButtonProps {
  variant: 'income' | 'outcome'
}

export const TransactionTypeButton = styled(
  RadioGroup.Item,
)<TransactionTypeButtonProps>`
  background-color: ${(props) => props.theme['gray-700']};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  border: 0;
  color: ${(props) => props.theme['gray-300']};

  svg {
    color: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-300']
        : props.theme['red-300']};
  }

  &[data-state='unchecked']:hover {
    // // Data attribute settado pelo radix quando o botão não está ativo
    background-color: ${(props) => props.theme['gray-600']};
    transition: background-color 0.2s;
  }

  &[data-state='checked'] {
    // Data attribute settado pelo radix quando o botão é clicado
    color: ${(props) => props.theme.white};
    background-color: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-500']
        : props.theme['red-500']};

    svg {
      color: ${(props) => props.theme.white};
    }
  }
`
