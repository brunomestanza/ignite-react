import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  padding: '2rem 0',
  maxWidth: 1180,
  width: '100%',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const CartContainer = styled('div', {
  position: 'relative',

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
