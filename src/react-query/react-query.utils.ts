/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  type QueryFunctionContext,
  useInfiniteQuery,
  type UseQueryOptions,
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
  QueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { fetcherClient } from '~/utils/fetcher';
import { type ExtraOptions, type BaseError } from '~/utils/fetcher/fetcher.types';

import { type GetInfinitePagesInterface } from './react-query.types';

export type QueryKeyT = [string, object | null];

export type PrefetchReturnType = () => Promise<void>;

export const fetcher = <TData>(
  { queryKey, pageParam }: Pick<QueryFunctionContext<QueryKeyT>, 'queryKey' | 'pageParam'>,
  extraOptions?: ExtraOptions
): Promise<TData> => {
  const [url, params] = queryKey;

  return fetcherClient<TData>(
    {
      params: { ...params, pageParam },
      url,
    },
    extraOptions || {}
  );
};

export const useFetch = <TData>({
  params = null,
  config,
  url,
}: {
  params?: object | null;
  config?: UseQueryOptions<TData, BaseError, TData, QueryKeyT>;
  url: string | null;
}): UseQueryResult<TData, BaseError> =>
  useQuery<TData, BaseError, TData, QueryKeyT>({
    queryKey: [url!, params],
    queryFn: ({ queryKey }) => fetcher<TData>({ queryKey }),
    enabled: !!url,
    ...config,
  });

export const ssrFetch = async <TData>({
  extraOptions,
  params = null,
  config,
  url,
}: {
  extraOptions?: ExtraOptions;
  params?: object | null;
  config?: UseQueryOptions<TData, BaseError, TData, QueryKeyT>;
  url: string | null;
}) => {
  const ssrQueryClient = new QueryClient();

  return await ssrQueryClient.fetchQuery<TData, BaseError, TData, QueryKeyT>(
    [url!, params!],
    ({ queryKey }) => fetcher({ queryKey }, extraOptions),
    { ...config }
  );
};

export const useLazyQuery = <TData>({
  params = null,
  config,
  url,
}: {
  params?: object | null;
  config?: UseQueryOptions<TData, BaseError, TData, QueryKeyT>;
  url: string | null;
}): [() => void, UseQueryResult<TData, BaseError>] => {
  const [enabled, setEnabled] = useState(false);
  const query = useQuery<TData, BaseError, TData, QueryKeyT>({
    queryKey: [url!, params],
    queryFn: ({ queryKey }) => fetcher<TData>({ queryKey }),
    enabled,
    ...config,
  });
  const trigger = useCallback(() => {
    if (!enabled) setEnabled(true);
  }, [enabled]);

  return [trigger, query];
};

export const useClientPrefetch = <T>({
  params = null,
  url,
}: {
  params?: object | null;
  url: string | null;
}): PrefetchReturnType => {
  const queryClient = useQueryClient();

  return async () => {
    if (!url) return;

    await queryClient.prefetchQuery<T, BaseError, T, QueryKeyT>([url, params!], ({ queryKey }) =>
      fetcher({ queryKey })
    );
  };
};

export const ssrPrefetch = async <T>({
  extraOptions,
  params = null,
  url,
}: {
  extraOptions?: ExtraOptions;
  params?: object | null;
  url: string;
}): Promise<QueryClient> => {
  const ssrQueryClient = new QueryClient();

  await ssrQueryClient.prefetchQuery<T, BaseError, T, QueryKeyT>([url, params!], ({ queryKey }) =>
    fetcher({ queryKey }, extraOptions)
  );

  return ssrQueryClient;
};

export const useLoadMore = <T>({ params, url }: { params?: object; url: string | null }): UseQueryResult =>
  useInfiniteQuery<GetInfinitePagesInterface<T>, Error, GetInfinitePagesInterface<T>, QueryKeyT>(
    [url!, params!],
    ({ queryKey, pageParam = 1 }) => fetcher({ queryKey, pageParam }),
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? false,
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
      enabled: !!url,
    }
  );

const useGenericMutation = <TData, TVariables>({
  options,
  updater,
  params,
  func,
  url,
}: {
  options?: UseMutationOptions<TData, BaseError, TVariables>;
  updater?: ((oldData: TVariables | undefined, newData: TVariables) => TVariables) | undefined;
  params?: object;
  func: (data: TVariables) => Promise<TData>;
  url: string;
}): UseMutationResult<TData, BaseError, TVariables> => {
  const queryClient = useQueryClient();

  return useMutation<TData, BaseError, TVariables>({
    mutationFn: func,
    ...options,
    onMutate: async (data) => {
      await queryClient.cancelQueries([url, params]);

      const previousData = queryClient.getQueryData([url, params]);

      queryClient.setQueryData<TVariables>([url, params], (oldData) => (updater ? updater(oldData, data) : data));

      return previousData;
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData([url, params], context);

      options?.onError?.(error, variables, context);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries([url, params]);
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const usePost = <TVariables, TData>({
  extraOptions,
  options,
  updater,
  params,
  url,
}: {
  extraOptions?: ExtraOptions;
  options?: UseMutationOptions<TData, BaseError, TVariables>;
  updater?: (oldData: TVariables | undefined, newData: TVariables) => TVariables;
  params?: object;
  url: string;
}): UseMutationResult<TData, BaseError, TVariables> =>
  useGenericMutation<TData, TVariables>({
    options,
    updater,
    params,
    func: async (data) =>
      await fetcherClient<TData>(
        {
          method: 'POST',
          data,
          url,
        },
        extraOptions || {}
      ),
    url,
  });

export const useUpdate = <TVariables, TData>(
  url: string,
  params?: object,
  updater?: (oldData: TVariables | undefined, newData: TVariables) => TVariables,
  extraOptions?: ExtraOptions
): UseMutationResult<TData, BaseError, TVariables> =>
  useGenericMutation<TData, TVariables>({
    updater,
    params,
    func: async (data) =>
      await fetcherClient<TData>(
        {
          method: 'PATCH',
          data,
          url,
        },
        extraOptions || {}
      ),
    url,
  });

export const useDelete = <TVariables>(
  url: string,
  params?: object,
  updater?: (oldData: TVariables | undefined, data: TVariables) => TVariables,
  extraOptions?: ExtraOptions
): UseMutationResult<string | number, BaseError, TVariables> =>
  useGenericMutation<string | number, TVariables>({
    updater,
    params,
    func: async () =>
      await fetcherClient(
        {
          method: 'DELETE',
          url,
        },
        extraOptions || {}
      ),
    url,
  });
