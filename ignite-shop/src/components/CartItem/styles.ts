import { styled } from '../../styles'

export const CartItemContainer = styled('div', {
  display: 'flex',
  gap: 20,

  div: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,

    p: {
      fontSize: 18,
      color: '$gray300',
    },

    strong: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '$gray100',
    },

    button: {
      marginTop: 6,
      border: 'none',
      width: 'fit-content',
      backgroundColor: 'transparent',
      color: '$green500',
      fontWeight: 'bold',
      fontSize: 16,
    },
  },
})
