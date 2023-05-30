import { isClient } from './is-client.util';

export const isServer = (): boolean => !isClient;
