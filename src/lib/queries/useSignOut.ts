import { useMutation } from '@tanstack/react-query';
import { signOut } from '../api-client/signOut';

export function useSignOut() {
  return useMutation({
    mutationFn: signOut,
  });
}
