/* eslint-disable sonarjs/cognitive-complexity */
import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

import { authService } from '~/services/auth.service';
import { isClient } from '~/utils/context/is-client.util';
import { fetcherClientLogger } from '~/utils/fetcher/fetcher.logger';
import { fetcherClientTransformer } from '~/utils/fetcher/fetcher.transformer';

import { type BaseArgs, type ExtraOptions } from './fetcher.types';

export const fetcherClient = async <T>(args: BaseArgs, extraOptions: ExtraOptions): Promise<T> => {
  const { customBaseUrl, enableLogs = false, withBaseUrl = true, token } = extraOptions;
  const accessToken = isClient() ? authService().getAuthToken() : token;
  const headers: AxiosRequestConfig['headers'] = {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...(args.headers ?? {}),
  };
  const instanceConfig: AxiosRequestConfig = { ...args, headers };
  const { url, method = 'GET', params, data } = instanceConfig;

  if (process.env.NODE_ENV !== 'production' && enableLogs) fetcherClientLogger.reqLogger({ params, method, data, url });

  console.info('process.env.NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL);

  const axiosInstance: AxiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    ...(withBaseUrl && {
      baseURL: customBaseUrl || process.env.NEXT_PUBLIC_API_URL,
    }),
  });

  try {
    const response = await axiosInstance
      .request({
        ...instanceConfig,
      })
      .then((response: AxiosResponse<T>) => {
        if (process.env.NODE_ENV !== 'production' && enableLogs) {
          if (response.status >= 400) {
            fetcherClientLogger.resErrorLogger({ response, method, url });

            return response;
          }

          fetcherClientLogger.resSuccessLogger({ response, method, url });
        }

        return response;
      })
      .catch((e: AxiosError) => {
        if (process.env.NODE_ENV !== 'production') console.error('Error!', e);

        return Promise.reject(e);
      });

    return response.data;
  } catch (e) {
    throw fetcherClientTransformer.transformError(e as AxiosError);
  }
};
