import { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { MapPinLine, CurrencyDollar } from 'phosphor-react'
import { PaymentButton } from './components/PaymentButton'
import { Product } from './components/Product'
import { PurchaseCartContext } from '../../contexts/PurchaseCartContext'
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
  const { cartItems } = useContext(PurchaseCartContext)
  const theme = useTheme()

  if (cartItems.length === 0) {
    return <Navigate replace to="/" />
  }

  const deliveryPrice = 3.5
  const allItemsPrice = cartItems.reduce((previousValue, currentValue) => {
    if (currentValue.quantityOfCoffes !== undefined) {
      return previousValue + currentValue.price * currentValue.quantityOfCoffes
    }
    return 0 // Dont return 0 NEVER, typescript error
  }, 0)
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  const itemsTotalFormattedPrice = formatter.format(allItemsPrice)
  const deliveryFormattedPrice = formatter.format(deliveryPrice)
  const totalFormatPrice = formatter.format(allItemsPrice + deliveryPrice)

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
      {cartItems.length > 0 && (
        <div>
          <h3>Cafés selecionados</h3>
          <FinishPurchaseContainer>
            {cartItems.map((cart) => {
              return (
                <Product
                  key={cart.id}
                  name={cart.name}
                  price={cart.price}
                  imgUrl={cart.imgUrl}
                  quantityOfCoffes={cart.quantityOfCoffes!}
                />
              )
            })}

            <CheckoutContainer>
              <CheckoutValues>
                <span>Total de itens</span>
                <span>{itemsTotalFormattedPrice}</span>
              </CheckoutValues>
              <CheckoutValues>
                <span>Entrega</span>
                <span>{deliveryFormattedPrice}</span>
              </CheckoutValues>
              <CheckoutTotal>
                <span>Total</span>
                <span>{totalFormatPrice}</span>
              </CheckoutTotal>
            </CheckoutContainer>
            <CheckoutButton>CONFIRMAR PEDIDO</CheckoutButton>
          </FinishPurchaseContainer>
        </div>
      )}
    </ShoppingCartContainer>
  )
}
