import z from 'zod';

import { API } from './_api';
import { parseWith } from './utils/validateApiResponse';

const statusEnum = z.enum(['success', 'error']);

const signOutAuthResponseSchemaSchema = z.object({
  status: statusEnum,
  message: z.string(),
});

export async function signOut() {
  return API.post(signOut.endpoint).then(parseWith(signOut.responseSchema));
}

signOut.endpoint = '/auth/logout';
signOut.responseSchema = signOutAuthResponseSchemaSchema;
