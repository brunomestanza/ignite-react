import { useTheme } from 'styled-components'
import { ShoppingCart, Package, Timer, Coffee } from 'phosphor-react'
import { BenefitsContainer, IconContainer, Label } from './styles'

interface BenefitsProps {
  variant: 'cart' | 'package' | 'timer' | 'coffee'
  color: string
  title: string
}

export function Benefits({ variant, color, title }: BenefitsProps) {
  const theme = useTheme()
  const white = theme['color-styles'].base.white

  return (
    <BenefitsContainer>
      <IconContainer backgroundColor={color}>
        {variant === 'cart' ? (
          <ShoppingCart color={white} weight="fill" />
        ) : variant === 'package' ? (
          <Package color={white} weight="fill" />
        ) : variant === 'timer' ? (
          <Timer color={white} weight="fill" />
        ) : variant === 'coffee' ? (
          <Coffee color={white} weight="fill" />
        ) : (
          ''
        )}
      </IconContainer>
      <Label>{title}</Label>
    </BenefitsContainer>
  )
}
