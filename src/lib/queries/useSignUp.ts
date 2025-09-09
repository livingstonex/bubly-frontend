import { useMutation } from '@tanstack/react-query';
import { signUp } from '../api-client/signUp';

export function useSignUp() {
  return useMutation({
    mutationFn: signUp,
  });
}
