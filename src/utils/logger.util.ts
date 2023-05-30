export const logger = (label: string, data?: unknown): void => {
  if (process.env.NODE_ENV !== 'production') {
    console.debug(`%c Logger: ----- ${label} ----- `, 'background: #ff8a00; color: #000000; font-weight: bold;');

    if (data) {
      console.debug(data);

      console.debug('--------------------');
    }
  }
};
