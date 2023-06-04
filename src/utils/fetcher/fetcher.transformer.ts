import { type AxiosError } from 'axios';

import { type ApiErrorResponse, type BaseError } from './fetcher.types';

const defaultMessage = 'Something went wrong. Please try again later';
const defaultStatus = 0;
const transformError = (error: AxiosError): BaseError => {
  if (!error.response || !error.response.data)
    return {
      message: defaultMessage,
      status: defaultStatus,
    };

  const { data } = error.response as ApiErrorResponse;

  return {
    message: data.message,
    status: data.statusCode,
  };
};

export const fetcherClientTransformer = {
  transformError,
};
