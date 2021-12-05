/* eslint-disable no-unused-expressions */
import * as R from 'ramda';

const getProfileProgress = (formData, isPremium) => {
  let progressPercentage = 25;
  const missingFields = [];

  const phoneNumber = { name: 'Phone number', path: ['location', 'telephone'], weight: 8.5 };
  const physicalAddresss = { name: 'Physical location', path: ['location'], weight: 8.5 };
  const servicing = { name: 'Area Served', path: ['location', 'areaServed'], weight: 8.5 };
  const category = { name: 'Categories', path: ['categories'], weight: 8.5 };
  const logo = { name: 'Business logo', path: ['businessProfile', 'logo'], weight: 8.5 };
  const hours = { name: 'Opening Hours', path: ['location', 'openingHoursSpecification'], weight: 8.5 };
  const year = { name: 'Year Established', path: ['businessProfile', 'foundingDate'], weight: 3.5 };
  const different = { name: 'What makes you different', path: ['businessProfile', 'slogan'], weight: 5 };
  const images = { name: 'Images', path: ['productAttributes', 'gallery'], weight: 5 };
  const payment = { name: 'Accepted Payment Methods', path: ['location', 'paymentAccepted'], weight: 5 };
  const teamMembers = { name: 'Team Members', path: ['productAttributes', 'employee'], weight: 5 };

  const requiredFields = [
    phoneNumber,
    category,
    physicalAddresss,
    logo,
    hours,
    servicing,
    year,
  ];

  const premiumFields = [
    payment,
    teamMembers,
    different,
    images,
  ];
  isPremium && requiredFields.push(...premiumFields);

  R.forEach((object) => {
    // eslint-disable-next-line no-unused-expressions
    if (
      R.hasPath(object.path, formData)
      && !R.isEmpty(R.path(object.path, formData))
    ) {
      (progressPercentage += object.weight || 7.5);
    } else {
      missingFields.push(object);
    }
  }, requiredFields);
  return { progress: Math.round(progressPercentage), missingFields };
};

export default getProfileProgress;
