import Image from 'next/image'
import Link from 'next/link'
import { useShoppingCart } from 'use-shopping-cart'
import * as Dialog from '@radix-ui/react-dialog'
import { Handbag } from 'phosphor-react'
import {
  CartContainer,
  HeaderContainer,
  ModalOverlay,
  ModalContent,
  ItemsContainer,
} from './styles'
import logoImg from '../../assets/logo.svg'

export function Header() {
  const { cartCount, cartDetails } = useShoppingCart()

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
          <Dialog.Close>X</Dialog.Close>
          <Dialog.Title>Sacola de compras</Dialog.Title>
          <ItemsContainer></ItemsContainer>
        </ModalContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
