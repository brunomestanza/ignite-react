import styled from 'styled-components'

interface PaymentButtonStylesProps {
  isActive: boolean
}

export const PaymentButtonContainer = styled.button<PaymentButtonStylesProps>`
  font: ${({ theme }) => theme['text-styles'].components['button-s']};
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  border-radius: 6px;
  background-color: ${({ theme, isActive }) =>
    isActive
      ? theme['color-styles'].brand['purple-light']
      : theme['color-styles'].base.button};
  color: ${({ theme, isActive }) =>
    isActive
      ? theme['color-styles'].base.subtitle
      : theme['color-styles'].base.text};
  min-width: 175px;
  border: ${({ theme, isActive }) =>
    isActive
      ? `1px solid ${theme['color-styles'].brand.purple}`
      : '1px solid transparent'};

  svg {
    margin-right: 0.75rem;
  }

  :hover {
    color: ${({ theme }) => theme['color-styles'].base.subtitle};
    background-color: ${({ theme }) => theme['color-styles'].base.hover};
  }

  :active {
    color: ${({ theme }) => theme['color-styles'].base.subtitle};
    background-color: ${({ theme }) =>
      theme['color-styles'].brand['purple-light']};
    border: 1px solid ${({ theme }) => theme['color-styles'].brand.purple};
  }
`
