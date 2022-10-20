import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap; // Usado para quebrar o conteúdo em mais linhas caso falte espaço

  color: ${({ theme }) => theme['gray-100']};
`

const BaseInput = styled.input`
  background-color: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${({ theme }) => theme['gray-500']};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;

  color: ${({ theme }) => theme['gray-100']};

  &:focus {
    box-shadow: none;
    border-color: ${({ theme }) => theme['green-500']};
  }

  &::placeholder {
    color: ${({ theme }) => theme['gray-500']};
  }

  &:disabled {
    cursor: not-allowed;
  }
`

export const TaskInput = styled(BaseInput)`
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }

  flex: 1;
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`
