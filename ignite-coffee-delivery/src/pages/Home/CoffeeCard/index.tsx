import { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Minus, Plus, ShoppingCartSimple } from 'phosphor-react'
import { useTheme } from 'styled-components'
import { PurchaseCartContext } from '../../../contexts/PurchaseCartContext'
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
  const [counter, setCounter] = useState(1)
  const { addItemOnCart } = useContext(PurchaseCartContext)

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  const formattedPrice = formatter.format(price).slice(2)
  const theme = useTheme()

  function handleDecreaseCounter() {
    if (counter !== 1) {
      setCounter((state) => {
        return state - 1
      })
    }
  }

  function handleIncreaseCounter() {
    setCounter((state) => {
      return state + 1
    })
  }

  function handleAddItemsOnCart() {
    const id = uuidv4()
    const item = {
      id,
      tags,
      name,
      description,
      price,
      imgUrl,
      quantityOfCoffes: counter,
    } as Coffee
    addItemOnCart(item)
  }

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
          R$ <strong>{formattedPrice}</strong>
        </Price>
        <CounterContainer>
          <button onClick={handleDecreaseCounter}>
            <Minus size={14} weight="bold" />
          </button>
          <span>{counter}</span>
          <button onClick={handleIncreaseCounter}>
            <Plus size={14} weight="bold" />
          </button>
        </CounterContainer>
        <AddToCartButton onClick={handleAddItemsOnCart}>
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
