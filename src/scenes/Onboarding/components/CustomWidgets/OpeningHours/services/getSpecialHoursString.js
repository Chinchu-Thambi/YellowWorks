const getSpecialHoursString = (hourFormData) => {
  if (
    hourFormData.opens === hourFormData.closes
    && hourFormData.opens === '00:00'
  ) {
    return 'Closed';
  }

  if (
    hourFormData.opens === '00:00'
    && hourFormData.closes === '23:59') {
    return '24 Hours';
  }

  if (hourFormData.conditionsOfAccess) {
    return 'By appointment';
  }

  return null;
};

export default getSpecialHoursString;
