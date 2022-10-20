import { HeaderActionsContainer, HeaderContainer } from './styles'
import { MapPin, ShoppingCart } from 'phosphor-react'
import { useTheme } from 'styled-components'

export function Header() {
  const theme = useTheme()
  return (
    <HeaderContainer>
      <img src="./logo.png" alt="Copo de café" />
      <HeaderActionsContainer>
        <span>
          <MapPin
            color={theme['color-styles'].brand.purple}
            weight="fill"
            size={22}
          />
          Porto Alegre, RS
        </span>
        <button>
          <ShoppingCart
            weight="fill"
            size={22}
            color={theme['color-styles'].brand['yellow-dark']}
          />
        </button>
      </HeaderActionsContainer>
    </HeaderContainer>
  )
}
