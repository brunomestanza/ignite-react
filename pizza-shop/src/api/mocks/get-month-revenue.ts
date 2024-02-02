import { http, HttpResponse } from 'msw'

import { GetMonthRevenueResponse } from '../metrics/get-month-revenue'

export const getMonthRevenueAmountMock = http.get<
  never,
  never,
  GetMonthRevenueResponse
>('/metrics/month-receipt', () => {
  return HttpResponse.json({ receipt: 20000, diffFromLastMonth: -9 })
})
