const zeroBasedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const monthIndexToString = (monthIndex) => zeroBasedMonths[monthIndex];

/**
 * Returns date of format `MMM 'yy` e.g. `Jun '19`
 * @param date
 */
export const formatDateToMonthYear = (date) => `${monthIndexToString(date.getMonth())} '${date.getFullYear().toString().substr(-2)}`;

/**
 * Returns date of format 'dd MMM yyyy' e.g. '2 Jun 2019'
 * @param date
 */
export const formatDateWithMonthName = (date) => `${date.getDate()} ${monthIndexToString(date.getMonth())} ${date.getFullYear().toString()}`;

const padNumber = (number) => (number < 10 ? `0${number}` : `${number}`);

/**
 * Returns `YYYYMM` e.g. August 2020 would be `2020-08`
 */
export const formatYYYYdashMM = (date) => `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}`;

/**
 * Returns `YYYYMM` e.g. August 2020 would be `202008`
 */
export const formatYYYYMM = (date) => `${date.getFullYear()}${padNumber(date.getMonth() + 1)}`;

export const toSentenceCase = (str) => {
  if (!str) return str;

  const newStr = str.toLowerCase();
  const firstLetterCapitalized = newStr.substring(0, 1).toUpperCase();

  if (newStr.length > 1) {
    return firstLetterCapitalized + newStr.substring(1);
  }
  return firstLetterCapitalized;
};

export const utcDate = (year, month0based, day1based) => new Date(Date.UTC(year, month0based, day1based));
