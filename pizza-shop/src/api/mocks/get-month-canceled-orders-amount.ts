import { http, HttpResponse } from 'msw'

import { GetMonthCanceledOrdersAmountResponse } from '../metrics/get-month-canceled-orders-amount'

export const getMonthCanceledOrdersAmountMock = http.get<
  never,
  never,
  GetMonthCanceledOrdersAmountResponse
>('/metrics/month-canceled-orders-amount', () => {
  return HttpResponse.json({ amount: 200, diffFromLastMonth: -2 })
})
