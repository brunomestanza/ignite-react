import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { api } from "../api";
import { User } from "../../types/user";

type GetUsersResponse = {
  totalCount: number;
  users: User[];
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
    const { data, headers } = await api.get('users', {
      params: {
        page,
      }
    });
    const totalCount = Number(headers['x-total-count']);
    const users = data.users.map((user: User) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-Br', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }),
      }
    });

    return { users, totalCount };
}

export function useUsers(page: number, options?: UseQueryOptions) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes of stale time
    ...options,
  })as UseQueryResult<GetUsersResponse, unknown>;
}