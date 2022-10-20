import styled from 'styled-components'

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  display: flex;
  gap: 1rem;

  color: ${({ theme }) => theme['gray-100']};

  span {
    padding: 2rem 1rem;
    border-radius: 8px;

    background-color: ${({ theme }) => theme['gray-700']};
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;

  color: ${({ theme }) => theme['green-500']};
`
