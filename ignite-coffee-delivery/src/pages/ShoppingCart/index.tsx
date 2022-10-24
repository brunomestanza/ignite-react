import { MapPinLine, CurrencyDollar } from 'phosphor-react'
import { useState } from 'react'
import { useTheme } from 'styled-components'
import { PaymentButton } from './components/PaymentButton'
import { Product } from './components/Product'
import {
  ShoppingCartContainer,
  UserInformationContainer,
  AddressContainer,
  InputsContainer,
  PaymentContainer,
  FinishPurchaseContainer,
  Input,
  PaymentButtons,
  CheckoutContainer,
  CheckoutValues,
  CheckoutTotal,
  CheckoutButton,
} from './styles'

export function ShoppingCart() {
  const [activeButtons, setActiveButtons] = useState([false, false, false])
  const theme = useTheme()

  function setOnlyOneButtonActive(activeButton: number) {
    const newActiveButtons = [false, false, false]
    newActiveButtons[activeButton] = true

    setActiveButtons(newActiveButtons)
  }

  return (
    <ShoppingCartContainer>
      <UserInformationContainer>
        <h3>Complete seu pedido</h3>
        <AddressContainer>
          <span>
            <MapPinLine
              color={theme['color-styles'].brand['yellow-dark']}
              size={22}
            />
            Endereço de entrega
          </span>
          <p>Informe o endereço onde deseja receber seu pedido</p>
          <InputsContainer>
            <Input type="cep" placeholder="CEP" />
            <Input type="street" placeholder="Rua" />
            <Input type="houseNumber" placeholder="Número" />
            <Input type="complement" placeholder="Complemento" />
            <Input type="district" placeholder="Bairro" />
            <Input type="city" placeholder="Cidade" />
            <Input type="uf" placeholder="UF" />
          </InputsContainer>
        </AddressContainer>
        <PaymentContainer>
          <span>
            <CurrencyDollar
              color={theme['color-styles'].brand.purple}
              size={22}
            />
            Pagamento
          </span>
          <p>
            O pagamento é feito na entrega. Escolha a forma que deseja pagar
          </p>
          <PaymentButtons>
            <PaymentButton
              type="credit-card"
              isActive={activeButtons[0]}
              setOnlyOneButtonActive={setOnlyOneButtonActive}
            />
            <PaymentButton
              type="debit-card"
              isActive={activeButtons[1]}
              setOnlyOneButtonActive={setOnlyOneButtonActive}
            />
            <PaymentButton
              type="money"
              isActive={activeButtons[2]}
              setOnlyOneButtonActive={setOnlyOneButtonActive}
            />
          </PaymentButtons>
        </PaymentContainer>
      </UserInformationContainer>
      <div>
        <h3>Cafés selecionados</h3>
        <FinishPurchaseContainer>
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />

          <CheckoutContainer>
            <CheckoutValues>
              <span>Total de itens</span>
              <span>R$ 29,70</span>
            </CheckoutValues>
            <CheckoutValues>
              <span>Entrega</span>
              <span>R$ 3,50</span>
            </CheckoutValues>
            <CheckoutTotal>
              <span>Total</span>
              <span>R$ 33,20</span>
            </CheckoutTotal>
          </CheckoutContainer>
          <CheckoutButton>CONFIRMAR PEDIDO</CheckoutButton>
        </FinishPurchaseContainer>
      </div>
    </ShoppingCartContainer>
  )
}
