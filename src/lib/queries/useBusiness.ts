import { queryOptions, useQuery } from '@tanstack/react-query';

import { userQueryOptions } from './useGetUser';

const businessQueryOptions = () =>
  queryOptions({
    ...userQueryOptions(),
    select: ({ businesses }) => {
      return businesses[0];
    },
  });

export function useBusiness() {
  return useQuery(businessQueryOptions());
}
