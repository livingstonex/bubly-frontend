import { useMutation } from '@tanstack/react-query';
import { createCheckoutSession } from '../api-client/createCheckoutSessions';

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: createCheckoutSession,
  });
}
