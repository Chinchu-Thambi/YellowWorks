/* globals localStorage */

import { storageAvailable } from '.';

const clearSubscriptionFormData = () => {
  if (storageAvailable()) {
    Object.keys(localStorage).forEach((key) => {
      if (
        key === 'storageOrderDetails'
        || key.startsWith('storageFormData')
        || key.startsWith('formData-') // still needed because onboarding uses it, yet.
      ) {
        localStorage.removeItem(key);
      }
    });
  }
};

export default clearSubscriptionFormData;
