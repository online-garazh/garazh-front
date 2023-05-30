import { compile } from 'path-to-regexp';
import URL from 'url-parse';

export const pathToUrl = (path: string, params?: object): string => {
  if (path.startsWith('http://')) throw new Error('Please use https!');

  if (path.startsWith('https://')) {
    const { origin, pathname }: { origin: string; pathname: string } = new URL(path);
    const buildURL = compile(pathname, { encode: encodeURIComponent });

    return `${origin}${buildURL(params)}`;
  }

  const buildURL = compile(path, { encode: encodeURIComponent });

  return buildURL(params);
};
