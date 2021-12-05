import axios from 'axios';

const updateDefaultPaymentMethod = async ({
  customerId,
  paymentMethodId,
  jwtToken,
}) => {
  const query = `
    mutation {
      updateDefaultPaymentMethod(
        input: {
          customerId: ${customerId}
          paymentMethodId: "${paymentMethodId}"
        }
      ) {
        id
      }
    }
  `;

  const response = await axios.post(
    process.env.GATSBY_BILLING_PLATFORM_ENDPOINT,
    { query },
    { headers: { Authorization: jwtToken } },
  );

  return response;
};

export default updateDefaultPaymentMethod;
