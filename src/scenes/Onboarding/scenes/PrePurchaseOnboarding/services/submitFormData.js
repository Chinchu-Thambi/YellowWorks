import axios from 'axios';
import * as R from 'ramda';

import formatAddress from '../../../../../services/formatAddress';

const submitFormData = async (formData) => {
  const {
    email, fullName, budget, categories,
    targetLocation, targetLandingPage, location,
    phone, startBudget, timeslot, days, timeframe,
  } = formData;

  const apiKey = process.env.GATSBY_PLATFORM_API_KEY || null;

  const submissionUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.GATSBY_HUBSPOT_ACCOUNT}/${process.env.GATSBY_HUBSPOT_SEARCHADS_FORMID}`;
  const phoneNumber = `0${phone.areaCode}${phone.number}`;
  const callbackRequest = timeframe === 'NOW' ? timeframe : `${timeslot?.value} - ${days.map((day) => day).join(', ')}`;
  const lastname = fullName?.split(' ').slice(-1).join(' ');
  const getBudgetAsString = (b) => (
    (b.cost ? `$${b.cost}` : '')
      + (b.clicks ? ` - Clicks: ${b.clicks} - ` : '')
      + (b.leads ? `Leads: ${b.leads} - ` : '')
      + (b.impressions ? `Impressions: ${b.impressions} - ` : ''));
  const data = {
    skipValidation: true,
    fields: [
      {
        name: 'lastname',
        value: lastname || '',
      },
      {
        name: 'email',
        value: email,
      },
      {
        name: 'phone',
        value: phoneNumber,
      },
      {
        name: 'ynz_sem_budget',
        value: R.is(Number, budget) ? getBudgetAsString(startBudget) : getBudgetAsString(budget || startBudget),
      },
      {
        name: 'ynz_sem_recommended_budget',
        value: getBudgetAsString(startBudget),
      },
      {
        name: 'ynz_sem_category',
        value: categories?.map((category) => category.name).join(', '),
      },
      {
        name: 'ynz_sem_regions',
        value: targetLocation?.regions?.map((region) => region.name).join(', ') || 'No Region Selected',
      },
      {
        name: 'ynz_sem_radius',
        value: targetLocation?.radius ? `${targetLocation.radius} km` : '',
      },
      {
        name: 'ynz_sem_target_location_type',
        value: targetLocation?.targetLocationType || 'regions',
      },
      {
        name: 'address',
        value: formatAddress(location?.address) || '',
      },
      {
        name: 'ynz_sem_callback_time_request',
        value: callbackRequest,
      },
      {
        name: 'website',
        value: targetLandingPage?.url || targetLandingPage?.type || '',
      },
    ],
  };
  const response = await axios.post(
    submissionUrl,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
    },
  );
  return response;
};

export default submitFormData;
