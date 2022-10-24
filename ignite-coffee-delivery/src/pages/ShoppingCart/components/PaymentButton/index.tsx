import { CreditCard, Bank, Money } from 'phosphor-react'
import { useTheme } from 'styled-components'
import { PaymentButtonContainer } from './styles'

interface PaymentButtonProps {
  type: 'credit-card' | 'debit-card' | 'money'
  isActive: boolean
  setOnlyOneButtonActive: (activeButton: number) => void
}

export function PaymentButton({
  type,
  isActive,
  setOnlyOneButtonActive,
}: PaymentButtonProps) {
  const theme = useTheme()
  const paymentMethodId =
    type === 'credit-card' ? 0 : type === 'debit-card' ? 1 : 2
  const paymentMethodTitle =
    type === 'credit-card'
      ? 'CARTÃO DE CRÉDITO'
      : type === 'debit-card'
      ? 'CARTÃO DE DÉBITO'
      : 'DINHEIRO'

  return (
    <PaymentButtonContainer
      isActive={isActive}
      type="button"
      onClick={() => {
        setOnlyOneButtonActive(paymentMethodId)
      }}
    >
      {type === 'credit-card' ? (
        <CreditCard size={16} color={theme['color-styles'].brand.purple} />
      ) : type === 'debit-card' ? (
        <Bank size={16} color={theme['color-styles'].brand.purple} />
      ) : type === 'money' ? (
        <Money size={16} color={theme['color-styles'].brand.purple} />
      ) : (
        ''
      )}
      {paymentMethodTitle}
    </PaymentButtonContainer>
  )
}
