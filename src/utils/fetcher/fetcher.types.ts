import { type AxiosRequestConfig } from 'axios';

export type BaseArgs = {
  headers?: AxiosRequestConfig['headers'];
  params?: AxiosRequestConfig['params'];
  method?: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  url: string;
};

export type ExtraOptions = {
  onlyClientSideToken?: boolean;
  customBaseUrl?: string;
  withBaseUrl?: boolean;
  enableLogs?: boolean;
  token?: string;
};

export interface ApiErrorResponse {
  statusText: '';
  status: unknown;
  data: {
    statusCode: number;
    message: unknown;
  };
}

export interface BaseError {
  message: unknown;
  status: number;
}
