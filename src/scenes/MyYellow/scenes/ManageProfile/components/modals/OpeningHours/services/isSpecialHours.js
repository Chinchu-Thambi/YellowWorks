import specialHoursOptions from './specialHoursOptions';

const isSpecialHours = (selected) => specialHoursOptions.some((hours) => hours.value === selected);

export default isSpecialHours;
