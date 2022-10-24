import styled from 'styled-components'

interface InputStyleProps {
  type:
    | 'cep'
    | 'street'
    | 'houseNumber'
    | 'complement'
    | 'district'
    | 'city'
    | 'uf'
}

export const ShoppingCartContainer = styled.form`
  display: flex;
  margin-top: 4.5rem;
  gap: 2rem;
  justify-content: space-between;

  h3 {
    font: ${({ theme }) => theme['text-styles'].title.xs};
    color: ${({ theme }) => theme['color-styles'].base.subtitle};
  }
`

export const UserInformationContainer = styled.div`
  max-width: 640px;
`

const GrayContainer = styled.div`
  background-color: ${({ theme }) => theme['color-styles'].base.card};
  padding: 2.5rem;
  border-radius: 6px;
  span {
    display: flex;
    align-items: center;

    font: ${({ theme }) => theme['text-styles'].text['regular-m']};
    color: ${({ theme }) => theme['color-styles'].base.subtitle};

    svg {
      margin-right: 0.5rem;
    }
  }

  p {
    font: ${({ theme }) => theme['text-styles'].text['regular-s']};
    color: ${({ theme }) => theme['color-styles'].base.text};
    margin-left: 1.875rem;
  }
`

export const AddressContainer = styled(GrayContainer)`
  margin-top: 1rem;
`

const BaseInput = styled.input<InputStyleProps>`
  grid-area: ${({ type }) => type};
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme['color-styles'].base.button};
  background-color: ${({ theme }) => theme['color-styles'].base.input};
  color: ${({ theme }) => theme['color-styles'].base.text};
  border-radius: 4px;

  ::placeholder {
    color: ${({ theme }) => theme['color-styles'].base.label};
  }

  :focus {
    border: 1px solid
      ${({ theme }) => theme['color-styles'].brand['yellow-dark']};
  }
`

export const Input = styled(BaseInput)``

export const InputsContainer = styled.div`
  margin-top: 2rem;
  gap: 1rem;
  display: grid;
  grid-template-columns: 200px 276px 60px;
  grid-template-areas:
    'cep . .'
    'street street street'
    'houseNumber complement complement'
    'district city uf';
`

export const PaymentContainer = styled(GrayContainer)`
  margin-top: 0.75rem;
`

export const PaymentButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 0.75rem;
  margin-top: 2rem;
`

export const FinishPurchaseContainer = styled.div`
  border-radius: 6px 44px 6px 44px;
  background-color: ${({ theme }) => theme['color-styles'].base.card};
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const BaseCheckoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const CheckoutContainer = styled.div`
  padding: 1.5rem 40px 0 40px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const CheckoutValues = styled(BaseCheckoutContainer)`
  span {
    color: ${({ theme }) => theme['color-styles'].base.text};

    :first-child {
      font: ${({ theme }) => theme['text-styles'].text['regular-s']};
    }

    :last-child {
      font: ${({ theme }) => theme['text-styles'].text['regular-m']};
    }
  }
`

export const CheckoutTotal = styled(BaseCheckoutContainer)`
  span {
    color: ${({ theme }) => theme['color-styles'].base.subtitle};
    font: ${({ theme }) => theme['text-styles'].text['bold-l']};
  }
`

export const CheckoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  color: ${({ theme }) => theme['color-styles'].base.white};
  background-color: ${({ theme }) => theme['color-styles'].brand.yellow};
  border: none;
  padding: 0.75rem;
  margin: 24px 40px 40px 40px;

  :hover {
    background-color: ${({ theme }) =>
      theme['color-styles'].brand['yellow-dark']};
  }
`
