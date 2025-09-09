/* eslint-disable @typescript-eslint/no-explicit-any */
import { logError } from '../logging';
import axiosInstance from '.';

export const formatApiErrorMessage = (
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | string,
  url: string
) => `API Request Failure: ${method} on ${url}`;

export function getAdditionalApiErrorAttributes({
  url,
  method,
  params,
}: {
  method: string;
  url: string;
  params?: Record<string, any>;
}) {
  return {
    message: formatApiErrorMessage(method, url),
    description: `An error occurred while attempting to ${method} data to the endpoint ${url}.`,
    url,
    params,
  };
}

const logAndThrowApiError = (
  error: any,
  url: string,
  method: string,
  params?: Record<string, any>
) => {
  logError(error, getAdditionalApiErrorAttributes({ url, method, params }));
  throw error;
};

export const API = {
  get: async <Resp = unknown>(
    url: string,
    params: Record<string, any> = {}
  ) => {
    return axiosInstance
      .get(url, { params })
      .then(response => response.data as Resp)
      .catch(error => {
        logAndThrowApiError(error, url, 'GET', params);
      });
  },

  post: async <Resp = unknown>(
    url: string,
    data: Record<string, unknown> = {}
  ) => {
    return axiosInstance
      .post(url, data)
      .then(response => response.data as Resp)
      .catch(error => {
        logAndThrowApiError(error, url, 'POST', data);
      });
  },

  put: async <Resp = unknown>(
    url: string,
    data: Record<string, unknown> = {}
  ) => {
    return axiosInstance
      .put(url, data)
      .then(response => response.data as Resp)
      .catch(error => {
        logAndThrowApiError(error, url, 'PUT', data);
      });
  },

  patch: async <Resp = unknown>(
    url: string,
    data: Record<string, unknown> = {}
  ) => {
    return axiosInstance
      .patch(url, data)
      .then(response => response.data as Resp)
      .catch(error => {
        logAndThrowApiError(error, url, 'PATCH', data);
      });
  },

  del: async <Resp = unknown>(
    url: string,
    data: Record<string, unknown> = {}
  ) => {
    return axiosInstance
      .delete(url, data)
      .then(response => response.data as Resp)
      .catch(error => {
        logAndThrowApiError(error, url, 'DELETE', data);
      });
  },

  patchForm: async <Resp = unknown>(url: string, formData: FormData) => {
    return axiosInstance
      .patch(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data as Resp)
      .catch(error => {
        logAndThrowApiError(error, url, 'PATCH', { formData });
      });
  },
};
