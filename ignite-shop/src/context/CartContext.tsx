import { createContext, ReactNode } from 'react'
import { useShoppingCart } from 'use-shopping-cart'

interface CartProviderProps {
  children: ReactNode
}

interface CartContextType {
  addItem: (
    name: string,
    description: string,
    id: string,
    price: number,
    image: string,
    price_id: string,
    currency?: string,
  ) => void
}

export const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: CartProviderProps) {
  const { addItem } = useShoppingCart()

  return (
    <CartContext.Provider value={{ addItem }}>{children}</CartContext.Provider>
  )
}
