import { type AxiosError } from 'axios';

import { type ApiError, type BaseError } from './fetcher.types';

const defaultMessage = 'Something went wrong. Please try again later';
const defaultStatus = 0;
const transformError = (error: AxiosError<ApiError | undefined>): BaseError => {
  if (!error.response || !error.response.data)
    return {
      message: defaultMessage,
      status: defaultStatus,
    };

  const { data } = error.response;
  const message = typeof data.message === 'string' ? data.message : defaultMessage;

  return {
    message,
    status: data.statusCode,
  };
};

export const fetcherClientTransformer = {
  transformError,
};
