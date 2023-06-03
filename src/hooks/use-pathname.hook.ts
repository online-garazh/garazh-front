import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export const usePathname = (): string => {
  const router = useRouter();
  const getPathname = useCallback(() => {
    if (typeof window !== 'undefined')
      // From: '/cars/bmw?a=1'
      // To  : '/cars/bmw'
      return router.asPath.split('?')[0];

    return '';
  }, [router.asPath]);
  const [pathname, setPathname] = useState(() => getPathname());

  useEffect(() => {
    const newPathname = getPathname();

    setPathname(newPathname);
  }, [getPathname, router.asPath]);

  return pathname;
};
