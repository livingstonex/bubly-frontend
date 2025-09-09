import { useMutation } from '@tanstack/react-query';
import { verifyEmail } from '../api-client/verifyEmail';

export function useVerifyEmail() {
  return useMutation({
    mutationFn: verifyEmail,
  });
}
