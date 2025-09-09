import { useMutation } from '@tanstack/react-query';
import { resendOtp } from '../api-client/resendOtp';

export function useResendOtp() {
  return useMutation({
    mutationFn: resendOtp,
  });
}
