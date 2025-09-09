import z from 'zod';

import { API } from './_api';
import { parseWith } from './utils/validateApiResponse';

interface BusinessDocument {
  file: File[];
}

const statusEnum = z.enum(['success', 'error']);

const BusinessDocumentSchema = z.object({
  current_step: z.number(),
  onboarding_complete: z.boolean(),
  total_steps: z.number(),
});

const uploadBusinessDocumentResponseSchema = z.object({
  status: statusEnum,
  message: z.string(),
  data: BusinessDocumentSchema,
});

export async function uploadBusinessDocument({
  business_id,
  business_documents,
}: {
  business_id: number;
  business_documents: BusinessDocument[];
}) {
  const formData = new FormData();

  business_documents.forEach(fileInfo => {
    fileInfo.file.forEach(file => {
      formData.append('file', file);
    });
  });

  return API.patchForm(
    uploadBusinessDocument.endpoint(business_id),
    formData
  ).then(parseWith(uploadBusinessDocument.responseSchema));
}

uploadBusinessDocument.endpoint = (business_id: number) => {
  return `/onboarding/businesses/${business_id}/pdf-upload`;
};

uploadBusinessDocument.responseSchema = uploadBusinessDocumentResponseSchema;
