export interface Coffee {
  id: string
  name: string
  description: string
  tags: ['Tradicional' | 'Gelado' | 'Com leite' | 'Especial' | 'Alcoólico']
  price: number
  imgUrl: string
  quantityOfCoffes?: number
}
