import { Minus, Plus, Trash } from 'phosphor-react'
import { useContext } from 'react'
import { PurchaseCartContext } from '../../../../contexts/PurchaseCartContext'
import {
  ProductContainer,
  ProductCounter,
  ProductInfoContainer,
  ProductButtonsContainer,
  ProductPrice,
  ProductRemove,
} from './styles'

interface ProductProps {
  name: string
  price: number
  imgUrl: string
  quantityOfCoffes: number
}

export function Product({
  name,
  price,
  imgUrl,
  quantityOfCoffes,
}: ProductProps) {
  const { addOrRemoveCoffee, removeItem } = useContext(PurchaseCartContext)

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  const formattedPrice = formatter.format(price * quantityOfCoffes)

  function handleDecreaseCounter() {
    if (quantityOfCoffes !== 1) {
      quantityOfCoffes = quantityOfCoffes - 1
      addOrRemoveCoffee(name, quantityOfCoffes)
    }
  }

  function handleIncreaseCounter() {
    quantityOfCoffes = quantityOfCoffes + 1
    addOrRemoveCoffee(name, quantityOfCoffes)
  }

  return (
    <ProductContainer>
      <img src={imgUrl} alt={name} />
      <ProductInfoContainer>
        <span>{name}</span>
        <ProductButtonsContainer>
          <ProductCounter>
            <button type="button" onClick={handleDecreaseCounter}>
              <Minus size={14} weight="bold" />
            </button>
            <span>{quantityOfCoffes}</span>
            <button type="button" onClick={handleIncreaseCounter}>
              <Plus size={14} weight="bold" />
            </button>
          </ProductCounter>
          <ProductRemove
            onClick={() => {
              removeItem(name)
            }}
          >
            <Trash size={16} weight="bold" />
            REMOVER
          </ProductRemove>
        </ProductButtonsContainer>
      </ProductInfoContainer>
      <ProductPrice>{formattedPrice}</ProductPrice>
    </ProductContainer>
  )
}
