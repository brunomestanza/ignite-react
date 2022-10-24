import styled from 'styled-components'

export const ProductContainer = styled.div`
  margin: 2.5rem 2.5rem 0 2.5rem;
  padding-bottom: 1.5rem;
  display: flex;
  white-space: nowrap;
  border-bottom: 1px solid ${({ theme }) => theme['color-styles'].base.button};

  img {
    height: 64px;
    width: 64px;
    margin-right: 20px;
  }
`

export const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  span {
    color: ${({ theme }) => theme['color-styles'].base.subtitle};
    font: ${({ theme }) => theme['text-styles'].text['regular-m']};
  }
`

export const ProductButtonsContainer = styled.div`
  display: flex;
  margin-right: 50px;
  gap: 0.5rem;
`

export const ProductCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 6.5px 8px;
  border-radius: 6px;

  background-color: ${({ theme }) => theme['color-styles'].base.button};

  button {
    background-color: ${({ theme }) => theme['color-styles'].base.button};
    color: ${({ theme }) => theme['color-styles'].brand.purple};
    border: none;

    :hover {
      color: ${({ theme }) => theme['color-styles'].brand['purple-dark']};
      cursor: pointer;
    }
  }
`

export const ProductRemove = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6.5px 8px;
  border: none;
  background-color: ${({ theme }) => theme['color-styles'].base.button};
  color: ${({ theme }) => theme['color-styles'].base.text};
  border-radius: 6px;
  gap: 0.5rem;
  font: ${({ theme }) => theme['text-styles'].components['button-s']};

  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme['color-styles'].base.subtitle};
    background-color: ${({ theme }) => theme['color-styles'].base.hover};

    svg {
      color: ${({ theme }) => theme['color-styles'].brand['purple-dark']};
    }
  }

  svg {
    color: ${({ theme }) => theme['color-styles'].brand.purple};
  }
`

export const ProductPrice = styled.span`
  color: ${({ theme }) => theme['color-styles'].base.text};
  font: ${({ theme }) => theme['text-styles'].text['bold-m']};
`
