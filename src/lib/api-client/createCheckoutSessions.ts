import z from 'zod';

import { API } from './_api';
import { parseWith } from './utils/validateApiResponse';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CheckoutSessionPayloadSchema = z.object({
  priceId: z.string(),
});

const statusEnum = z.enum(['success', 'error']);

const checkoutSessionResponseSchema = z.object({
  status: statusEnum,
  message: z.string(),
  data: z.string(),
});

export async function createCheckoutSession(
  payload: z.infer<typeof CheckoutSessionPayloadSchema>
) {
  return API.post(createCheckoutSession.endpoint, payload).then(
    parseWith(createCheckoutSession.responseSchema)
  );
}

createCheckoutSession.endpoint = '/stripe/subscription/create-checkout-session';
createCheckoutSession.responseSchema = checkoutSessionResponseSchema;
