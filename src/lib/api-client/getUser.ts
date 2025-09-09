import z from 'zod';

import { API } from './_api';
import { parseWith } from './utils/validateApiResponse';

const statusEnum = z.enum(['success', 'error']);

const Business = z.object({
  id: z.number(),
  business_name: z.string().nullable(),
  current_step: z.number(),
  total_steps: z.number(),
  onboarding_complete: z.boolean(),
  user_id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const UserSchema = z.object({
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  avatar: z.string(),
  emailVerified: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  businesses: z.array(Business),
});

const getUserResponseSchemaSchema = z.object({
  status: statusEnum,
  message: z.string(),
  data: UserSchema,
});

export async function getUser(): Promise<z.infer<typeof UserSchema>> {
  return API.get(getUser.endpoint)
    .then(parseWith(getUser.responseSchema))
    .then(
      response => (response as z.infer<typeof getUser.responseSchema>).data
    );
}

getUser.endpoint = '/auth/me';
getUser.responseSchema = getUserResponseSchemaSchema;
