import { api } from '@/lib/axios'

interface Product {
  product: string
  amount: number
}

export type GetPopularProductsResponse = Product[]

export async function getPopularProducts() {
  const response = await api.get<GetPopularProductsResponse>(
    '/metrics/popular-products',
  )

  return response.data
}
