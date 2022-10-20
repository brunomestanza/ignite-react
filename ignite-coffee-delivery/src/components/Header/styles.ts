import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    display: block;
    max-width: 85px;
    max-height: 40px;
    width: auto;
    height: auto;
  }
`

export const HeaderActionsContainer = styled.div`
  display: flex;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    padding: 0.5rem;
    margin-right: 0.75rem;

    color: ${({ theme }) => theme['color-styles'].brand['purple-dark']};
    font: ${({ theme }) => theme['text-styles'].text['regular-s']};
    background-color: ${({ theme }) =>
      theme['color-styles'].brand['purple-light']};

    svg {
      margin-right: 0.25rem;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    background-color: ${({ theme }) =>
      theme['color-styles'].brand['yellow-light']};
    border: none;
    border-radius: 6px;
  }
`
