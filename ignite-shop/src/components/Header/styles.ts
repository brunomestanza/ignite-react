import * as Dialog from '@radix-ui/react-dialog'
import { styled } from '../../styles'

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  maxWidth: 1180,
  width: '100%',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const CartContainer = styled(Dialog.Trigger, {
  position: 'relative',
  background: 'transparent',
  border: 'none',

  span: {
    position: 'absolute',
    right: -15,
    top: -20,
    backgroundColor: '$green500',
    borderRadius: 1000,
    padding: 14,
    height: 20,
    width: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '5px solid black',
  },

  svg: {
    padding: 12,
    backgroundColor: '$gray800',
    borderRadius: 6,
    color: '$gray300',
  },
})

export const ModalOverlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw', // Estilização para que o modal se posicione de forma relativa a viewport, e ocupe a tela inteira
  height: '100vh',
  inset: 0, // Mesma coisa que escrever top: 0, left: 0, bottom: 0, right: 0
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
})

export const ModalContent = styled(Dialog.Content, {
  backgroundColor: '$gray800',
  color: '$white',
  position: 'fixed',
  top: 0,
  right: 0,
})

export const ItemsContainer = styled('div', {})
