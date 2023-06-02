export const queryClientBaseConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1 * 60 * 60 * 1000,
      cacheTime: 5 * 60 * 60 * 1000,
    },
  },
};
