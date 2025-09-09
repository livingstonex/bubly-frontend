import { useMutation } from '@tanstack/react-query';
import { uploadBusinessDocument } from '../api-client/uploadBusinessDocument';

export function useUploadBusinessDocument() {
  return useMutation({
    mutationFn: uploadBusinessDocument,
  });
}
