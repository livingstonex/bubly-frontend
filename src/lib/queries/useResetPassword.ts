import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../api-client/resetPassword';

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}
