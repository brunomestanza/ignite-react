import { api } from '@/lib/axios'

export interface GetOrderDetailsParams {
  orderId: string
}

interface OrderItem {
  id: string
  priceInCents: number
  quantity: number
  product: {
    name: string
  }
}

interface Customer {
  name: string
  email: string
  phone: string | null
}

export interface GetOrderDetailsResponse {
  id: string
  totalInCents: number
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  customer: Customer
  orderItems: OrderItem[]
  createdAt: string
}

export async function getOrderDetails({ orderId }: GetOrderDetailsParams) {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return response.data
}
