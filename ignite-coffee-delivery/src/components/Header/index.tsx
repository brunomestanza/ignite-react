import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { MapPin, ShoppingCart } from 'phosphor-react'
import { PurchaseCartContext } from '../../contexts/PurchaseCartContext'
import { HeaderActionsContainer, HeaderContainer } from './styles'

export function Header() {
  const { cartItems } = useContext(PurchaseCartContext)
  const theme = useTheme()

  return (
    <HeaderContainer>
      <Link to="/">
        <img src="./logo.png" alt="Copo de café" />
      </Link>
      <HeaderActionsContainer>
        <span>
          <MapPin
            color={theme['color-styles'].brand.purple}
            weight="fill"
            size={22}
          />
          Porto Alegre, RS
        </span>
        {cartItems.length > 0 && (
          <Link to="/shopping-cart">
            <button>
              <ShoppingCart
                weight="fill"
                size={22}
                color={theme['color-styles'].brand['yellow-dark']}
              />
            </button>
          </Link>
        )}
      </HeaderActionsContainer>
    </HeaderContainer>
  )
}
