import z from 'zod';

import { API } from './_api';
import { parseWith } from './utils/validateApiResponse';

const statusEnum = z.enum(['success', 'error']);

const resendOtpResponseSchema = z.object({
  status: statusEnum,
  message: z.string(),
});

export async function resendOtp(payload: { email: string }) {
  return API.post(resendOtp.endpoint, payload)
    .then(parseWith(resendOtp.responseSchema))
    .then(response => response as z.infer<typeof resendOtp.responseSchema>);
}

resendOtp.endpoint = '/auth/resend-otp';
resendOtp.responseSchema = resendOtpResponseSchema;
