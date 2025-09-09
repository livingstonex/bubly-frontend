import { useMutation } from '@tanstack/react-query';
import { signIn } from '../api-client/signIn';

export function useSignIn() {
  return useMutation({
    mutationFn: signIn,
  });
}
