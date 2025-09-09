import { useMutation } from '@tanstack/react-query';
import { updateBusinessInfo } from '../api-client/updateBusinessInfo';

export function useUpdateBusinessInfo() {
  return useMutation({
    mutationFn: updateBusinessInfo,
  });
}
