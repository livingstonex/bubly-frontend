import { useMutation } from '@tanstack/react-query';
import { processWebsiteUrl } from '../api-client/processWebsiteUrl';

export function useProcessWebsiteUrl() {
  return useMutation({
    mutationFn: processWebsiteUrl,
  });
}
