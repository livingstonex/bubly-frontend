import z from 'zod';

import { API } from './_api';
import { parseWith } from './utils/validateApiResponse';

const statusEnum = z.enum(['success', 'error']);

const BusinessInfoSchema = z.object({
  current_step: z.number(),
  onboarding_complete: z.boolean(),
  total_steps: z.number(),
});

interface Payload {
  business_id: number;
  website_url: string;
}

const processWebsiteUrlResponseSchemaSchema = z.object({
  status: statusEnum,
  message: z.string(),
  data: BusinessInfoSchema,
});

export async function processWebsiteUrl({ business_id, website_url }: Payload) {
  return API.patch(processWebsiteUrl.endpoint(business_id), {
    website_url,
  }).then(parseWith(processWebsiteUrl.responseSchema));
}

processWebsiteUrl.endpoint = (business_id: number) => {
  return `/onboarding/businesses/${business_id}/website-processing`;
};

processWebsiteUrl.responseSchema = processWebsiteUrlResponseSchemaSchema;
