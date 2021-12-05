const getSpecialHoursObject = (hourString) => {
  if (hourString === '24 Hours') {
    return {
      opens: '00:00',
      closes: '23:59',
    };
  }
  if (hourString === 'Closed') {
    return {
      opens: '00:00',
      closes: '00:00',
    };
  }
  if (hourString?.toLowerCase() === 'by appointment') {
    return {
      conditionsOfAccess: 'By appointment',
    };
  }

  return null;
};

export default getSpecialHoursObject;
