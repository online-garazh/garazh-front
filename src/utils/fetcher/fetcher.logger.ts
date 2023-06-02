import { type AxiosRequestConfig, type AxiosResponse } from 'axios';

type ReqLoggerType = {
  params: AxiosRequestConfig['params'];
  method: AxiosRequestConfig['method'];
  data: AxiosRequestConfig['data'];
  url?: string;
};

type ResLoggerType = {
  response: AxiosResponse;
  method: AxiosRequestConfig['method'];
  url?: string;
};

const reqLogger = ({ params, method, data, url }: ReqLoggerType): void => {
  method &&
    console.debug(`%cRequest to ${method.toUpperCase()}:`, 'background: #ff8a00; color: #000000; font-weight: bold;');

  url && console.debug(`%c${url}`, 'font-weight: bold; color: #000000;');

  data && console.debug('Request data', data);

  params && console.debug('Request params', params);

  console.debug('%cRequest end ----------', 'background: #ff8a00; color: #000000; font-weight: bold;');
};
const resSuccessLogger = ({ response, method, url }: ResLoggerType): void => {
  method &&
    console.debug(
      `%cResponse from ${method.toUpperCase()}:`,
      'background: #39a36a; color: #000000; font-weight: bold;'
    );

  url && console.debug(`%c${url}`, 'color: #000000; font-weight: bold;');

  console.debug('Response data', response.data);

  console.debug('%cResponse end ----------', 'background: #39a36a; color: #000000; font-weight: bold;');
};
const resErrorLogger = ({ response, method, url }: ResLoggerType): void => {
  method &&
    console.error(
      `%cResponse from ${method.toUpperCase()}:`,
      'background: #ff3e5f; color: #ffffff; font-weight: bold;'
    );

  url && console.error(`%c${url}`, 'font-weight: bold; color: #000000;');

  console.error(`%cError ${response.status} `, 'color: #000000; font-weight: bold;', response);

  console.error('%cResponse end ----------', 'background: #ff3e5f; color: #ffffff; font-weight: bold;');
};

export const fetcherClientLogger = {
  resSuccessLogger,
  resErrorLogger,
  reqLogger,
};
