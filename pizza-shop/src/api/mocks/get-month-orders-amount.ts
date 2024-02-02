import { http, HttpResponse } from 'msw'

import { GetMonthOrdersAmountResponse } from '../metrics/get-month-orders-amount'

export const getMonthOrdersAmountMock = http.get<
  never,
  never,
  GetMonthOrdersAmountResponse
>('/metrics/month-orders-amount', () => {
  return HttpResponse.json({ amount: 40, diffFromLastMonth: -7 })
})
