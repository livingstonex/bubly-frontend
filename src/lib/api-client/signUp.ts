import z from 'zod';

import { API } from './_api';
import { parseWith } from './utils/validateApiResponse';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserPayloadSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  password: z.string(),
});

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

const signUpAuthResponseSchemaSchema = z.object({
  status: statusEnum,
  message: z.string(),
  data: UserSchema,
});

export async function signUp(payload: z.infer<typeof UserPayloadSchema>) {
  return API.post(signUp.endpoint, payload).then(
    parseWith(signUp.responseSchema)
  );
}

signUp.endpoint = '/auth/signup';
signUp.responseSchema = signUpAuthResponseSchemaSchema;
