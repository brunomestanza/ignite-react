import { api } from '@/lib/axios'

export interface GetordersQuery {
  pageIndex?: number | null
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}

export interface Order {
  orderId: string
  customerName: string
  total: number
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  // The backend cannot return an Date
  createdAt: string
}

export interface GetOrdersResponse {
  orders: Order[]
  meta: { pageIndex: number; perPage: number; totalCount: number }
}

export async function getOrders({
  pageIndex,
  orderId,
  customerName,
  status,
}: GetordersQuery) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
      orderId,
      customerName,
      status,
    },
  })

  return response.data
}
