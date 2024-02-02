import { api } from '@/lib/axios'

export interface GetDailyRevenueInPeriodProps {
  from?: Date
  to?: Date
}

interface Product {
  date: string
  receipt: number
}

export type GetDailyRevenueInPeriodResponse = Product[]

export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriodProps) {
  const response = await api.get<GetDailyRevenueInPeriodResponse>(
    '/metrics/daily-receipt-in-period',
    {
      params: {
        from,
        to,
      },
    },
  )

  return response.data
}
