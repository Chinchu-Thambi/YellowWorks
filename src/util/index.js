/* global window, DOMException, document */

import React from 'react';
import showdown from 'showdown';

import { importableModules } from '../services/useModule';

export {
  default as theme,
  mediaBreakpointUp,
} from './theme';
export {
  default as errorText,
  infos as infoText,
  getErrorString,
} from './texts';

const isSingleLine = (string) => (string !== undefined ? !string.includes('\n') : '');

const mdConverter = new showdown.Converter();

mdConverter.setOption('tables', true);

export const parseMd = (md) => {
  if (!md) {
    return '';
  }

  let mdString = md;

  if (typeof md === 'object') {
    [mdString] = Object.values(md);
  }

  let parsedString = mdConverter.makeHtml(mdString);

  if (isSingleLine(mdString)) {
    // remove outer p tag from single line md
    parsedString = parsedString.replace(/<\/?p>/g, '');
  }

  // eslint-disable-next-line react/no-danger
  return <span dangerouslySetInnerHTML={{ __html: parsedString }} />;
};

export const getProportionalHeight = ({
  initialWidth, initialHeight, targetWidth,
}) => (initialHeight * targetWidth) / initialWidth;

export const storageAvailable = () => {
  let storage;

  if (typeof window !== 'undefined') {
    storage = window.localStorage;
  }

  try {
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    if (typeof DOMException === 'undefined') {
      return false;
    }

    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22
      // Firefox
      || e.code === 1014
      // test name field too, because code might not be present
      // everything except Firefox
      || e.name === 'QuotaExceededError'
      // Firefox
      || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      // acknowledge QuotaExceededError only if there's something already stored
      && storage && storage.length !== 0;
  }
};

export const formatPrice = (price = 0) => (typeof price === 'number' ? `$${price.toFixed(2)}` : `$${price}`);

export const formatRecurringPrice = (price, recurring, withGst, annual) => {
  const priceFormatted = formatPrice(price);
  if (priceFormatted === '$0.00') {
    return 'Free';
  }

  if (recurring) {
    if (withGst) {
      return `${priceFormatted} / month + GST`;
    }
    if (annual) {
      return `${priceFormatted} / year`;
    }
    return `${priceFormatted} / month`;
  }
  if (withGst) {
    return `${priceFormatted} + GST`;
  }
  return priceFormatted;
};

// ex input date object
// ex out: "13/08/2019"
export const reformatDate = (dateObj) => (
  dateObj ? dateObj.toLocaleDateString('en-NZ') : ''
);

export const useLocalStorage = (key, initialValue) => {
  // from https://usehooks.com/useLocalStorage/
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      // Get from local storage by key
      if (storageAvailable()) {
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (storageAvailable()) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

// TODO: remove this and user version inside of auth/services
export const isStaff = async () => {
  try {
    const { Auth } = await importableModules['@aws-amplify/auth']();
    const user = await Auth.currentSession();
    return user.idToken.payload.email.endsWith('@yellow.co.nz');
  } catch (err) {
    // console.log('isStaff', err);
    return false;
  }
};


export const isTesting = () => document.location.search.includes('utm_isTesting=yes');

export const getNextWeekday = () => {
  const dt = new Date();
  dt.setDate(dt.getDate() + 1);

  if (dt.getDay() === 6) { // if Saturday
    dt.setDate(dt.getDate() + 2);
  }

  if (dt.getDay() === 0) { // if Sunday
    dt.setDate(dt.getDate() + 1);
  }

  return dt;
};

export const getNextMonth = ({
  baseNextWeekday = false,
} = {}) => {
  let dt = new Date();

  if (baseNextWeekday) {
    dt = getNextWeekday();
  }

  dt.setFullYear(
    dt.getFullYear(),
    dt.getMonth() + 1,
    1,
  );

  return dt;
};

export const getEndOfMonth = ({
  baseNextWeekday = false,
} = {}) => {
  let dt = new Date();

  if (baseNextWeekday) {
    dt = getNextWeekday();
  }

  dt.setFullYear(
    dt.getFullYear(),
    dt.getMonth() + 1,
    0,
  );

  return dt;
};

export const capitalize = (string = '') => `${string.charAt(0).toUpperCase()}${string.substr(1).toLowerCase()}`;

export const shuffle = (array) => {
  let counter = array.length;
  const shuffled = [...array];

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    const index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter -= 1;

    // And swap the last element with it
    const temp = shuffled[counter];
    shuffled[counter] = shuffled[index];
    shuffled[index] = temp;
  }

  return shuffled;
};
