import { useEffect } from 'react';

import { type Colors } from '~/theme/colors';

export const useBodyBgColor = (bg: Colors | undefined): void => {
  useEffect(() => {
    if (bg) document.body.style.backgroundColor = bg;
  }, [bg]);
};
