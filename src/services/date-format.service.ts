import { DateTime } from 'luxon';

import { userLocale } from '~/utils/user-locale.util';

class DateFormatService {
  public timestampToDateTime = (timestamp: number): DateTime => DateTime.fromMillis(timestamp);

  public formatTimestampToString = ({
    timezone = '',
    format = 'DD/MM/YYYY',
    value,
  }: {
    timezone?: string;
    format: string;
    value: number;
  }): string => {
    const timezoneToSet = timezone ? timezone : userLocale();

    return this.timestampToDateTime(value).setZone(timezoneToSet).toFormat(format);
  };

  // https://moment.github.io/luxon/#/formatting?id=toformat
  public formatISODateToString = ({
    isoString,
    timezone = '',
    format = 'DD/MM/YYYY',
  }: {
    isoString: string;
    timezone?: string;
    format: string;
  }): string => {
    if (!isoString) return '';

    const timezoneToSet = timezone ? timezone : userLocale();

    return DateTime.fromISO(isoString).setZone(timezoneToSet).toFormat(format);
  };

  // https://moment.github.io/luxon/#/formatting?id=tolocalestring-strings-for-humans
  public formatISODateToLocaleString = ({
    isoString,
    timezone = '',
    format = DateTime.DATE_SHORT, // => '4/20/2017'
  }: {
    isoString: string;
    timezone?: string;
    format: Intl.DateTimeFormatOptions;
  }): string => {
    if (!isoString) return '';

    const timezoneToSet = timezone ? timezone : userLocale();

    return DateTime.fromISO(isoString).setZone(timezoneToSet).toLocaleString(format);
  };
}

export const dateFormatService = new DateFormatService();
