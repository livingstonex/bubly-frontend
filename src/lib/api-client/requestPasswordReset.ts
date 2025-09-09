import z from 'zod';

import { API } from './_api';
import { parseWith } from './utils/validateApiResponse';

const statusEnum = z.enum(['success', 'error']);

const requestPasswordResetResponseSchema = z.object({
  status: statusEnum,
  message: z.string(),
});

export async function requestPasswordReset(payload: { email: string }) {
  return API.post(requestPasswordReset.endpoint, payload)
    .then(parseWith(requestPasswordReset.responseSchema))
    .then(
      response =>
        response as z.infer<typeof requestPasswordReset.responseSchema>
    );
}

requestPasswordReset.endpoint = '/auth/request-password-reset';
requestPasswordReset.responseSchema = requestPasswordResetResponseSchema;
