import Image from 'next/image'
import Link from 'next/link'
import { useShoppingCart } from 'use-shopping-cart'
import * as Dialog from '@radix-ui/react-dialog'
import { Handbag, X } from 'phosphor-react'
import {
  CartContainer,
  HeaderContainer,
  ModalOverlay,
  ModalContent,
  ItemsContainer,
  ModalCloseButton,
  PurchaseContainer,
  PurchaseInfo,
} from './styles'
import logoImg from '../../assets/logo.svg'
import { CartItem } from '../CartItem'

interface FormattedData {
  id: string
  name: string
  image: string
  formattedPrice: string
  quantity: number
}

export function Header() {
  const { cartCount, cartDetails, formattedTotalPrice, redirectToCheckout } =
    useShoppingCart()
  let formattedData: FormattedData[] = []

  async function handleCheckout() {
    const lineItems = formattedData.map((item) => {
      return {
        price: item.id,
        quantity: item.quantity,
      }
    })

    redirectToCheckout(lineItems)
  }

  if (cartDetails !== undefined) {
    formattedData = Object.entries(cartDetails).map(([key, value]) => {
      return {
        id: key,
        name: value.name,
        image: value.image as string,
        formattedPrice: value.formattedPrice,
        quantity: value.quantity,
      }
    })
  }

  return (
    <Dialog.Root>
      <HeaderContainer>
        <Link href="/">
          <Image src={logoImg} alt="" />
        </Link>
        <CartContainer>
          {cartCount! > 0 && <span>{cartCount}</span>}
          <Handbag size={48} weight="bold" />
        </CartContainer>
      </HeaderContainer>

      <Dialog.Portal>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton>
            <X weight="bold" size={24} />
          </ModalCloseButton>
          <Dialog.Title>Sacola de compras</Dialog.Title>
          <PurchaseContainer>
            <ItemsContainer>
              {formattedData.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    formattedPrice={item.formattedPrice}
                  />
                )
              })}
            </ItemsContainer>
          </PurchaseContainer>
          <PurchaseInfo>
            <div>
              <p>Quantidade</p>
              <p>{cartCount} itens</p>
            </div>
            <div>
              <p>Valor total</p>
              <strong>{formattedTotalPrice}</strong>
            </div>
            <button onClick={handleCheckout}>Finalizar compra</button>
          </PurchaseInfo>
        </ModalContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
