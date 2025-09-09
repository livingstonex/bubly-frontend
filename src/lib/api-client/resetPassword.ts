import z from 'zod';

import { API } from './_api';
import { parseWith } from './utils/validateApiResponse';

const statusEnum = z.enum(['success', 'error']);

const resetPasswordResponseSchema = z.object({
  status: statusEnum,
  message: z.string(),
});

export async function resetPassword(payload: {
  email: string;
  newPassword: string;
  token: string;
}) {
  return API.patch(resetPassword.endpoint, payload)
    .then(parseWith(resetPassword.responseSchema))
    .then(response => response as z.infer<typeof resetPassword.responseSchema>);
}

resetPassword.endpoint = '/auth/reset-password';
resetPassword.responseSchema = resetPasswordResponseSchema;
