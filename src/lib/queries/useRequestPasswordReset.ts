import { useMutation } from '@tanstack/react-query';
import { requestPasswordReset } from '../api-client/requestPasswordReset';

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: requestPasswordReset,
  });
}
