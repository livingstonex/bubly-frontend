import z from 'zod';

import { API } from './_api';
import { parseWith } from './utils/validateApiResponse';

const statusEnum = z.enum(['success', 'error']);

const BusinessInfoSchema = z.object({
  current_step: z.number(),
  onboarding_complete: z.boolean(),
  total_steps: z.number(),
});

interface UpdateBusinessInfoPayload {
  business_id: number;
  business_name: string;
  business_industry: string;
  business_description: string;
  business_primary_market: string;
}

const updateBusinessInfoResponseSchemaSchema = z.object({
  status: statusEnum,
  message: z.string(),
  data: BusinessInfoSchema,
});

export async function updateBusinessInfo({
  business_id,
  ...data
}: UpdateBusinessInfoPayload) {
  return API.patch(updateBusinessInfo.endpoint(business_id), data).then(
    parseWith(updateBusinessInfo.responseSchema)
  );
}

updateBusinessInfo.endpoint = (business_id: number) => {
  return `/onboarding/businesses/${business_id}/business-info`;
};

updateBusinessInfo.responseSchema = updateBusinessInfoResponseSchemaSchema;
