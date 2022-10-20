import styled from 'styled-components'

export const CoffeeCardContainer = styled.div`
  width: 16rem;
  background-color: ${({ theme }) => theme['color-styles'].base.card};
  border-radius: 6px 36px 6px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-top: -20px;
  }
`

export const TagsContainer = styled.div`
  margin: 0.75rem 30px 1rem 30px;
  display: flex;
  gap: 4px;

  span {
    color: ${({ theme }) => theme['color-styles'].brand['yellow-dark']};
    background-color: ${({ theme }) =>
      theme['color-styles'].brand['yellow-light']};
    font: ${({ theme }) => theme['text-styles'].components.tag};
    border-radius: 100px;
    padding: 4px 8px;
  }
`

export const CoffeeName = styled.span`
  color: ${({ theme }) => theme['color-styles'].base.subtitle};
  font: ${({ theme }) => theme['text-styles'].title.s};
`

export const CoffeeDescription = styled.p`
  margin: 8px 20px 33px 20px;
  color: ${({ theme }) => theme['color-styles'].base.label};
  font: ${({ theme }) => theme['text-styles'].text['regular-s']};
  text-align: center;
`

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 24px 20px;
`

export const Price = styled.span`
  color: ${({ theme }) => theme['color-styles'].base.text};
  font: ${({ theme }) => theme['text-styles'].text['regular-s']};

  strong {
    font: ${({ theme }) => theme['text-styles'].title.m};
  }
`

export const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.75rem 0.5rem;
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

export const AddToCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme['color-styles'].brand['purple-dark']};
  padding: 0.5rem 0.625rem;
  border-radius: 6px;
  border: none;
  transition: background-color 0.2s;

  :hover {
    background-color: ${({ theme }) => theme['color-styles'].brand.purple};
    cursor: pointer;
  }
`
