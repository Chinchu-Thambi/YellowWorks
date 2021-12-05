const errors = {
  cardHolderMissing: 'Please enter name on card.',
  requiredFieldMissing: 'Please enter all required fields.',
  termsNotAccepted: 'Please accept our Terms of Business and Additional Terms.',
  cardAuthorizationNotGiven: 'Please accept our Credit/Debit Card Registration Terms.',
  defaultError: 'Oops. We didn\'t anticipate this taking so long.',
};

export const infos = {
  submit: 'Order Submitting...',
};

export const getErrorString = (error) => {
  let msg;
  if (error instanceof Array && error.length > 0) {
    const { message } = error[0];
    msg = message;
  } else if (error instanceof Object) {
    const { message } = error;
    msg = message;
  } else {
    msg = error;
  }

  const errorMapping = {
  };
  const friendlyError = errorMapping[msg] ? errorMapping[msg] : errors.defaultError;
  return friendlyError;
};

export default errors;
