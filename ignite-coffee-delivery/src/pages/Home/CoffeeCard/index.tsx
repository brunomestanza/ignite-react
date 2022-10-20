import { Minus, Plus, ShoppingCartSimple } from 'phosphor-react'
import { useTheme } from 'styled-components'
import { Coffee } from '../../../@types/coffee'
import {
  CoffeeCardContainer,
  TagsContainer,
  CoffeeName,
  CoffeeDescription,
  PriceContainer,
  Price,
  CounterContainer,
  AddToCartButton,
} from './styles'

export function CoffeeCard({ tags, name, description, price, imgUrl }: Coffee) {
  const theme = useTheme()

  return (
    <CoffeeCardContainer>
      <img src={imgUrl} alt={name} />
      <TagsContainer>
        {tags.map((tag) => {
          return <span key={tag}>{tag}</span>
        })}
      </TagsContainer>
      <CoffeeName>{name}</CoffeeName>
      <CoffeeDescription>{description}</CoffeeDescription>
      <PriceContainer>
        <Price>
          R$ <strong>{price}</strong>
        </Price>
        <CounterContainer>
          <button>
            <Minus size={14} weight="bold" />
          </button>
          <span>1</span>
          <button>
            <Plus size={14} weight="bold" />
          </button>
        </CounterContainer>
        <AddToCartButton>
          <ShoppingCartSimple
            color={theme['color-styles'].base.white}
            size={22}
            weight="fill"
          />
        </AddToCartButton>
      </PriceContainer>
    </CoffeeCardContainer>
  )
}
