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
} from '@tanstack/react-query';

import { fetcherClient } from '~/utils/fetcher';
import { type ExtraOptions, type BaseError } from '~/utils/fetcher/fetcher.types';

import { type GetInfinitePagesInterface } from './react-query.types';

export type QueryKeyT = [string, object | null];

export type PrefetchReturnType = () => Promise<void>;

export const fetcher = <T>(
  { queryKey, pageParam }: Pick<QueryFunctionContext<QueryKeyT>, 'queryKey' | 'pageParam'>,
  extraOptions?: ExtraOptions
): Promise<T> => {
  const [url, params] = queryKey;

  return fetcherClient<T>(
    {
      params: { ...params, pageParam },
      url,
    },
    extraOptions || {}
  );
};

export const useFetch = <T>({
  params = null,
  config,
  url,
}: {
  params?: object | null;
  config?: UseQueryOptions<T, BaseError, T, QueryKeyT>;
  url: string | null;
}): UseQueryResult<T, BaseError> =>
  useQuery<T, BaseError, T, QueryKeyT>({
    queryKey: [url!, params!],
    queryFn: ({ queryKey }) => fetcher({ queryKey }),
    enabled: !!url,
    ...config,
  });

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
  params = null,
  url,
}: {
  params?: object | null;
  url: string;
}): Promise<QueryClient> => {
  const ssrQueryClient = new QueryClient();

  await ssrQueryClient.prefetchQuery<T, BaseError, T, QueryKeyT>([url, params!], ({ queryKey }) =>
    fetcher({ queryKey })
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

const useGenericMutation = <T, S>({
  updater,
  params,
  func,
  url,
}: {
  updater?: ((oldData: T, newData: S) => T) | undefined;
  params?: object;
  func: (data: T | S) => Promise<S>;
  url: string;
}): UseMutationResult<T | S, BaseError, T | S> => {
  const queryClient = useQueryClient();

  return useMutation<T | S, BaseError, T | S>({
    mutationFn: func,
    onMutate: async (data) => {
      await queryClient.cancelQueries([url, params]);

      const previousData = queryClient.getQueryData([url, params]);

      queryClient.setQueryData<T>([url, params], (oldData) => (updater ? updater(oldData!, data as S) : (data as T)));

      return previousData;
    },
    onError: (_error, _, context) => {
      queryClient.setQueryData([url, params], context);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries([url, params]);
    },
  });
};

export const usePost = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T,
  extraOptions?: ExtraOptions
): UseMutationResult<T | S, BaseError, T | S> =>
  useGenericMutation<T, S>({
    updater,
    params,
    func: async (data) =>
      await fetcherClient<S>(
        {
          method: 'POST',
          data,
          url,
        },
        extraOptions || {}
      ),
    url,
  });

export const useUpdate = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T,
  extraOptions?: ExtraOptions
): UseMutationResult<T | S, BaseError, T | S> =>
  useGenericMutation<T, S>({
    updater,
    params,
    func: async (data) =>
      await fetcherClient<S>(
        {
          method: 'PATCH',
          data,
          url,
        },
        extraOptions || {}
      ),
    url,
  });

export const useDelete = <T>(
  url: string,
  params?: object,
  updater?: (oldData: T, id: string | number) => T,
  extraOptions?: ExtraOptions
): UseMutationResult<T | string | number, BaseError, T | string | number> =>
  useGenericMutation<T, string | number>({
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
