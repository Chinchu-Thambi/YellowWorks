import axios from 'axios';
import Cookies from 'js-cookie';
import { v4 as uuid } from 'uuid';

const hubspotId = Cookies.get('hubspotutk') || null;

const getSubmissionUrl = (closeType) => {
  // TODO: Use case switch when more product types added.
  const formId = closeType === 'yol' ? process.env.GATSBY_HUBSPOT_CANCELYOL_FORMID : process.env.GATSBY_HUBSPOT_CANCELSA_FORMID;
  return `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.GATSBY_HUBSPOT_ACCOUNT}/${formId}`;
};

const submitCloseRequest = async (submissionData, closeType = 'yol') => {
  const {
    email, companyId, reason, subscriptionId, customReason,
  } = submissionData;
  const apiKey = process.env.GATSBY_PLATFORM_API_KEY || null;
  const submissionUrl = getSubmissionUrl(closeType);

  const data = {
    fields: [
      {
        name: 'email',
        value: email || '',
      },
      {
        name: 'ynz_cancel_company_id',
        value: companyId || '',
      },
      {
        name: 'ynz_yol_remove_reason',
        value: customReason || reason.value || '',
      },
      {
        name: 'ynz_cancel_subscription_id',
        value: subscriptionId || '',
      },
    ],
    context: {
      hutk: hubspotId || uuid(),
    },
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

export default submitCloseRequest;
