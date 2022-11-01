import { useState, useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
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

const confirmAddressFormValidationSchema = zod.object({
  cep: zod.string().regex(/^[0-9]{5}-[0-9]{3}$/, 'CEP inválido'),
  street: zod.string().min(5, 'Endereço muito curto'),
  houseNumber: zod.string().regex(/\d+/, 'Insira apenas números'),
  complement: zod.string().optional(),
  district: zod.string().min(5, 'Insira um bairro'),
  city: zod.string().min(4, 'Insira uma cidade'),
  uf: zod.string().min(2, 'Insira uma UF'),
})

type ConfirmAddressFormData = zod.infer<
  typeof confirmAddressFormValidationSchema
>

export function ShoppingCart() {
  const [activeButtons, setActiveButtons] = useState([false, false, false])
  const { cartItems } = useContext(PurchaseCartContext)
  const navigate = useNavigate()
  const theme = useTheme()
  const confirmAddressForm = useForm<ConfirmAddressFormData>({
    resolver: zodResolver(confirmAddressFormValidationSchema),
    defaultValues: {
      cep: '',
      street: '',
      houseNumber: '',
      complement: '',
      district: '',
      city: '',
      uf: '',
    },
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = confirmAddressForm

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

  function handleConfirmCoffee() {
    navigate('/finished-purchase')
  }

  return (
    <ShoppingCartContainer onSubmit={handleSubmit(handleConfirmCoffee)}>
      <UserInformationContainer>
        <h3>Complete seu pedido</h3>
        {errors?.cep && <p>{errors.cep.message}</p>}
        {errors?.street && <p>{errors.street.message}</p>}
        {errors?.houseNumber && <p>{errors.houseNumber.message}</p>}
        {errors?.complement && <p>{errors.complement.message}</p>}
        {errors?.district && <p>{errors.district.message}</p>}
        {errors?.city && <p>{errors.city.message}</p>}
        {errors?.uf && <p>{errors.uf.message}</p>}
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
            <Input variant="cep" placeholder="CEP" {...register('cep')} />
            <Input variant="street" placeholder="Rua" {...register('street')} />
            <Input
              type="number"
              variant="houseNumber"
              placeholder="Número"
              {...register('houseNumber')}
            />
            <Input
              variant="complement"
              placeholder="Complemento"
              {...register('complement')}
            />
            <Input
              variant="district"
              placeholder="Bairro"
              {...register('district')}
            />
            <Input variant="city" placeholder="Cidade" {...register('city')} />
            <Input variant="uf" placeholder="UF" {...register('uf')} />
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
