import styled from 'styled-components'

// Usamos o as const para especificar que o STATUS_COLORS não recebe qualquer string, apenas uma das 3 opções que temos abaixo
const STATUS_COLORS = {
  red: 'red-500',
  yellow: 'yellow-500',
  green: 'green-500',
} as const

interface StatusProps {
  // Usamos o typeof porque o TypeScript não consegue ler objetos JavaScript, apenas informações de tipagem como por exemplo com o typeof
  // O typeof se refere ao tipo de uma variavel ou propriedade
  statusColor: keyof typeof STATUS_COLORS
}

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;

    color: ${({ theme }) => theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse; // Faz com que caso 2 bordas dos itens da table fiquem juntas uma ao lado da outra, conte apenas o comprimento de uma delas
    min-width: 600px;

    th {
      padding: 1rem;
      text-align: left;
      color: ${({ theme }) => theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      background-color: ${({ theme }) => theme['gray-600']};

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${({ theme }) => theme['gray-700']};
      border-top: 4px solid ${({ theme }) => theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;

    background-color: ${({ theme, statusColor }) =>
      theme[STATUS_COLORS[statusColor]]};
  }
`
