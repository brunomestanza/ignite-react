import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../profile/get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      id: 'custom-user-id',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(13) 912345678',
      role: 'manager',
      createdAt: new Date(),
      updatedAt: null,
    })
  },
)
