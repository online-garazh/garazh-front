import { authToken } from '@/utils/authToken';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

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
  const authorizationHeader = customConfig?.token
    ? { Authorization: `Bearer ${customConfig.token}` }
    : {};

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
    console.log('Error request', error);
    return Promise.reject(error);
  }
};

export const useApiQuery = <TData>(
  key: string[],
  url: string,
  { ctx }: { ctx?: any } = {}
): UseQueryResult<AxiosResponse<TData>, AxiosError> => {
  const { token, getAuthToken } = authToken(ctx);

  const test = getAuthToken();

  console.log('test', test);

  return useQuery<TData, AxiosError, AxiosResponse<TData>>(key, (data) => {
    return apiRequest<TData>({ url, method: 'get' }, { token });
  });
};

export const usePostMutation = <TData, TVariables>(
  url: string,
  options?: UseMutationOptions<TData, Error, TVariables>
) => {
  return useMutation<TData, AxiosError<ApiError>, TVariables>(
    (data) => {
      return apiRequest<TData>({ url, method: 'post', data });
    },
    {
      ...options,
      onSuccess: (data, variables, context) => {
        return options?.onSuccess?.(data, variables, context);
      },
    }
  );
};
