import { useMutation, type UseMutationOptions, useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';

import { authService } from '~/services/auth.service';

interface ApiError {
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiRequest = async <TData>(
  axiosRequestConfig: AxiosRequestConfig,
  customConfig?: { token?: string }
): Promise<TData> => {
  const authorizationHeader = customConfig?.token ? { Authorization: `Bearer ${customConfig.token}` } : {};
  const requestHeaders = {
    ...authorizationHeader,
    'Content-Type': 'application/json',
  };

  try {
    const response: AxiosResponse<TData> = await apiClient({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: requestHeaders,
      ...axiosRequestConfig,
    });

    return response.data;
  } catch (error) {
    console.debug('Error request', error);

    return Promise.reject(error);
  }
};

export const useApiQuery = <TData>(
  key: string[],
  url: string,
  { ctx }: { ctx?: any } = {}
): UseQueryResult<AxiosResponse<TData>, AxiosError> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { token } = authService(ctx);

  return useQuery<TData, AxiosError, AxiosResponse<TData>>({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: key,
    queryFn: (_data) => apiRequest<TData>({ url, method: 'get' }, { token }),
  });
};

export const usePostMutation = <TData, TVariables>(
  url: string,
  options?: UseMutationOptions<TData, Error, TVariables>
) =>
  useMutation<TData, AxiosError<ApiError>, TVariables>({
    mutationFn: (data) => apiRequest<TData>({ url, method: 'post', data }),
    ...options,
    onSuccess: (data, variables, context) => options?.onSuccess?.(data, variables, context),
  });
