const getPublishingDate = (printDeliveryDate, printLastBookingDate) => {
  const currentDate = new Date();
  const currentYear = currentDate?.getFullYear();
  const fullLastBookingDate = Date.parse(`${printLastBookingDate} ${currentYear}`);
  const fullDeliveryDateCurrentYear = Date.parse(`${printDeliveryDate} ${currentYear}`);
  const getFullDeliveryDate = (mod = 0) => `${printDeliveryDate} ${currentYear + mod}`;
  const getNextDeliveryDate = (mod = 0) => (fullDeliveryDateCurrentYear > Date.parse(currentDate) ? fullDeliveryDateCurrentYear : getFullDeliveryDate(mod));

  const orderOfMonthsBackwards = fullDeliveryDateCurrentYear < fullLastBookingDate;

  if ((fullLastBookingDate < Date.parse(currentDate)) && orderOfMonthsBackwards) {
    return `${getNextDeliveryDate(2)}`;
  }
  if ((fullLastBookingDate < Date.parse(currentDate)) && !orderOfMonthsBackwards) {
    return `${getNextDeliveryDate(1)}`;
  }
  return `${getNextDeliveryDate()}`;
};

export default getPublishingDate;
