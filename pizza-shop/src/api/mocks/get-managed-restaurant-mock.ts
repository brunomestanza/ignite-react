import { http, HttpResponse } from 'msw'

import { GetManagedRestaurantResponse } from '../restaurant/get-managed-restaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/managed-restaurant', () => {
  return HttpResponse.json({
    id: 'example-restaurant-id',
    description: 'Example description.',
    managerId: 'example-manager-id',
    name: 'Pizza shop',
    createdAt: new Date(),
    updatedAt: null,
  })
})
