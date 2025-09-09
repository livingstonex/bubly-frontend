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

const signInAuthResponseSchemaSchema = z.object({
  status: statusEnum,
  message: z.string(),
  data: UserSchema,
});

export async function signIn(payload: { email: string; password: string }) {
  return API.post(signIn.endpoint, payload).then(
    parseWith(signIn.responseSchema)
  );
}

signIn.endpoint = '/auth/signin';
signIn.responseSchema = signInAuthResponseSchemaSchema;
