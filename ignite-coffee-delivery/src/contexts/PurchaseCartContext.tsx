import { createContext, useState, ReactNode } from 'react'
import { Coffee } from '../@types/coffee'

interface PurchaseCartContextProviderProps {
  children: ReactNode
}

interface PurchaseCartData {
  cartItems: Coffee[]
  addItemOnCart: (newItem: Coffee) => void
  addOrRemoveCoffee: (name: string, quantityOfCoffees: number) => void
  removeItem: (name: string) => void
}

export const PurchaseCartContext = createContext({} as PurchaseCartData)

export function PurchaseCartContextProvider({
  children,
}: PurchaseCartContextProviderProps) {
  const [cartItems, setCartItems] = useState<Coffee[]>([])

  function addItemOnCart(newItems: Coffee) {
    const itemsWithoutNewOnes = cartItems.filter(
      (item) => item.name !== newItems.name,
    )
    const itemOldState = cartItems.filter((item) => item.name === newItems.name)

    let newItemsWithNewQuantityOfCoffes = newItems

    if (itemOldState.length > 0) {
      newItemsWithNewQuantityOfCoffes = {
        ...newItems,
        quantityOfCoffes:
          (newItems.quantityOfCoffes as number) +
          (itemOldState[0].quantityOfCoffes as number),
      }
    }

    setCartItems([...itemsWithoutNewOnes, newItemsWithNewQuantityOfCoffes])
  }

  function addOrRemoveCoffee(name: string, quantityOfCoffees: number) {
    const itemsWithoutNewOnes = cartItems.filter((item) => item.name !== name)
    const itemOldState = cartItems.filter((item) => item.name === name)
    itemOldState[0].quantityOfCoffes = quantityOfCoffees

    setCartItems([...itemsWithoutNewOnes, itemOldState[0]])
  }

  function removeItem(name: string) {
    const itemsWithoutNewOnes = cartItems.filter((item) => item.name !== name)

    setCartItems(itemsWithoutNewOnes)
  }

  return (
    <PurchaseCartContext.Provider
      value={{ cartItems, addItemOnCart, addOrRemoveCoffee, removeItem }}
    >
      {children}
    </PurchaseCartContext.Provider>
  )
}
