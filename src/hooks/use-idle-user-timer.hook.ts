import { useIdleTimer } from 'react-idle-timer';

import { logger } from '~/utils/logger.util';

export const useIdleUserTimer = (): void => {
  const onIdle = (): void => {
    logger('User is idle');
  };
  const onAction = (): void => {
    logger('User did something');
  };
  const onActive = (): void => {
    logger('User is active');
  };

  useIdleTimer({
    onActive,
    onAction,
    debounce: 500,
    timeout: 1000 * 60 * 60, // TODO: Add timeout to ENV file
    onIdle,
  });
};
