import { type QueryObserverResult, type RefetchOptions } from '@tanstack/react-query';

import { type BaseError } from '~/utils/fetcher/fetcher.types';

export interface GetInfinitePagesInterface<T> {
  previousId?: number;
  nextId?: number;
  count: number;
  data: T;
}

type QueryProps<T, D> = {
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: BaseError) => void;
} & D;

export type QueryFn<T, D = {}> = (props?: QueryProps<T, D>) => {
  isFetching?: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  refetch?: (options?: RefetchOptions) => Promise<QueryObserverResult<T, BaseError>>;
  status?: 'error' | 'success' | 'loading';
  error: BaseError | null;
  data: T;
};
