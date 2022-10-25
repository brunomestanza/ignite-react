import { MapPin, Timer, CurrencyDollar } from 'phosphor-react'
import { useTheme } from 'styled-components'
import {
  FinishedPurchaseContainer,
  ContentContainer,
  BorderContainer,
  PurchaseInfoContainer,
  PurchaseIconContainer,
  PurchaseItemContainer,
} from './styles'

export function FinishedPurchase() {
  const theme = useTheme()

  return (
    <FinishedPurchaseContainer>
      <h2>Uhu! Pedido confirmado</h2>
      <span>Agora é só aguardar que logo o café chegará até você</span>
      <ContentContainer>
        <BorderContainer>
          <PurchaseInfoContainer>
            <PurchaseItemContainer>
              <PurchaseIconContainer
                backgroundColor={theme['color-styles'].brand.purple}
              >
                <MapPin
                  weight="fill"
                  color={theme['color-styles'].base.white}
                />
              </PurchaseIconContainer>
              <div>
                <span>
                  Entrega em <strong>Rua João Daniel Martinelli, 102</strong>
                </span>
                <br />
                <span>Farrapos - Porto Alegre, RS</span>
              </div>
            </PurchaseItemContainer>
            <PurchaseItemContainer>
              <PurchaseIconContainer
                backgroundColor={theme['color-styles'].brand.yellow}
              >
                <Timer weight="fill" color={theme['color-styles'].base.white} />
              </PurchaseIconContainer>
              <div>
                <span>Previsão de entrega</span>
                <br />
                <strong>20 min - 30 min </strong>
              </div>
            </PurchaseItemContainer>
            <PurchaseItemContainer>
              <PurchaseIconContainer
                backgroundColor={theme['color-styles'].brand['yellow-dark']}
              >
                <CurrencyDollar color={theme['color-styles'].base.white} />
              </PurchaseIconContainer>
              <div>
                <span>Pagamento na entrega</span>
                <br />
                <strong>Cartão de Crédito</strong>
              </div>
            </PurchaseItemContainer>
          </PurchaseInfoContainer>
        </BorderContainer>
        <img src="./delivery-man.svg" alt="Homem entregando pedido" />
      </ContentContainer>
    </FinishedPurchaseContainer>
  )
}
