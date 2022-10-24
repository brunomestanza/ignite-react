import { Minus, Plus, Trash } from 'phosphor-react'
import {
  ProductContainer,
  ProductCounter,
  ProductInfoContainer,
  ProductButtonsContainer,
  ProductPrice,
  ProductRemove,
} from './styles'

export function Product() {
  return (
    <ProductContainer>
      <img src="./coffees/expresso-tradicional.png" alt="Café" />
      <ProductInfoContainer>
        <span>Expresso Tradicional</span>
        <ProductButtonsContainer>
          <ProductCounter>
            <button>
              <Minus size={14} weight="bold" />
            </button>
            <span>1</span>
            <button>
              <Plus size={14} weight="bold" />
            </button>
          </ProductCounter>
          <ProductRemove>
            <Trash size={16} weight="bold" />
            REMOVER
          </ProductRemove>
        </ProductButtonsContainer>
      </ProductInfoContainer>
      <ProductPrice>R$ 9,90</ProductPrice>
    </ProductContainer>
  )
}
