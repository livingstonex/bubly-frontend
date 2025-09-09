import { logError } from '../../logging';
import { z } from 'zod';

/**
 * Validates and returns the response based on the provided schema.
 * If the response does not match the schema, it logs the error and returns the original response.
 *
 * @template T - The type of the schema.
 * @param {T} schema - The schema to validate the response against.
 * @param {unknown} response - The response to be validated.
 * @returns {z.infer<T>} - The validated response or the original response if validation fails.
 */
function validateAndReturnResponse<T extends z.ZodSchema>(
  schema: T,
  response: unknown
): z.infer<T> | unknown {
  try {
    return schema.parse(response);
  } catch (error) {
    logError(error as Error, { message: 'Failed to parse response' });
    return response;
  }
}

/**
 * Returns a function that validates a response using the provided schema.
 * The returned function will attempt to parse the response using the schema.
 * If validation fails, it logs the error and returns the original response.
 *
 * @param schema - The zod schema to validate the response against.
 * @returns  A function that takes a response and returns the parsed response or the original response if validation fails.
 */
export function parseWith<T extends z.ZodSchema>(schema: T) {
  return (response: unknown): z.infer<T> | unknown => {
    return validateAndReturnResponse(schema, response);
  };
}
