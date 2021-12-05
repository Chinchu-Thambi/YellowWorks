import React from 'react';
import { Separator } from '../OpeningHours.styled';

const specialHoursOptions = [
  { value: 'Closed', label: 'Closed' },
  { value: '24 Hours', label: '24 Hours' },
  { value: 'By appointment', label: 'By Appointment' },
  { value: '', label: <Separator />, isDisabled: true },
];

export default specialHoursOptions;
