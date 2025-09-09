import { queryOptions, useQuery } from '@tanstack/react-query';
import { getUser } from '../api-client/getUser';

export const userQueryOptions = () =>
  queryOptions({
    retry: 1,
    queryKey: [getUser.endpoint],
    queryFn: getUser,
  });

export function useGetUser() {
  return useQuery(userQueryOptions());
}
