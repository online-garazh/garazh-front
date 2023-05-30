import BigNumber from 'bignumber.js';

import { Currency } from '~/constants/format.constant';

class NumberFormatService {
  constructor() {
    BigNumber.config({
      FORMAT: {
        decimalSeparator: '.',
        groupSeparator: "'",
        groupSize: 3,
      },
    });
  }

  public formatNumber = (num: number | string, decimalPlaces = 0): string => {
    if (!num) return new BigNumber(0).toFormat(decimalPlaces);

    return new BigNumber(num).toFormat(decimalPlaces);
  };

  // https://gist.github.com/g4rcez/e072eb9e1203679645985a9c89722117 - for locales/currency typing
  /*
    additional type safety to Intl.numberFormat; improves readability for some options
    string ('decimal' or 'currency'): 1000.00 vs CHF 1000.00
    symbolType: // "€1,236.78" | "€1,236.78" | "EUR 1,236.78" | "1,236.78 euros"
    forceLocale (defaults to en-US): en-US "€1,236.78" vs de-DE "1.236,78 €"
   */
  public formatPrice = (
    value: number | string,
    {
      minusSignDisplay = 'never',
      forceLocale = undefined,
      symbolType = 'code',
      currency = Currency.AMERICAN_DOLLAR,
      style = 'currency',
    }: {
      minusSignDisplay?: Intl.NumberFormatOptions['signDisplay']; // when to show minus sign
      forceLocale?: string;
      symbolType?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
      currency?: Currency;
      style?: 'decimal' | 'currency'; // unused options: noSymbol | shows symbol
    }
  ): string => {
    const valueLocale = forceLocale ?? 'en-US'; // TODO: Add userLocale()
    const valueNum = typeof value === 'string' ? Number(value) : value;

    return new Intl.NumberFormat(valueLocale, {
      maximumFractionDigits: 2,
      currencyDisplay: symbolType,
      signDisplay: minusSignDisplay,
      currency,
      style,
    }).format(valueNum);
  };
}

export const numberFormatService = new NumberFormatService();
