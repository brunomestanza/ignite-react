import Image from 'next/image'
import { useShoppingCart } from 'use-shopping-cart'
import { CartItemContainer } from './styles'

interface CartItemProps {
  image: string
  name: string
  formattedPrice: string
  id: string
}

export function CartItem({ image, name, formattedPrice, id }: CartItemProps) {
  const { removeItem } = useShoppingCart()

  return (
    <CartItemContainer>
      <Image src={image} alt="" width={100} height={95} />
      <div>
        <p>{name}</p>
        <strong>{formattedPrice}</strong>
        <button onClick={() => removeItem(id)}>Remover</button>
      </div>
    </CartItemContainer>
  )
}
