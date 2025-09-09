import z from 'zod';

import { API } from './_api';
import { parseWith } from './utils/validateApiResponse';

const statusEnum = z.enum(['success', 'error']);

const UserSchema = z.object({
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  avatar: z.string(),
  emailVerified: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const verifyEmailResponseSchemaSchema = z.object({
  status: statusEnum,
  message: z.string(),
  data: UserSchema,
});

export async function verifyEmail(payload: { email: string; code: string }) {
  return API.post(verifyEmail.endpoint, payload).then(
    parseWith(verifyEmail.responseSchema)
  );
}

verifyEmail.endpoint = '/auth/verifyemail';
verifyEmail.responseSchema = verifyEmailResponseSchemaSchema;
