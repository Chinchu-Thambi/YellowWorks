import axios from 'axios';

const getSubscriptionPrice = async ({
  customerId, subscriptionId, jwtToken,
}) => {
  const query = `
      query getpricingOptions($customerId: ID, $subscriptionId: ID) {
        pricing(
          customerId: $customerId
          subscriptionId: $subscriptionId
        ) {
          fullMonthPrice {
            discount {
              amount
              end
              name
              start
            }
            grandTotal
            subtotal
            tax
          }
          remainingDaysPrice {
            discount {
              amount
              end
              name
              start
            }
            grandTotal
            subtotal
            tax
          }
          discountValidity {
            name
            validity
            description
          }
      }
    }
    `;

  const variables = {
    customerId,
    subscriptionId,
  };
  const response = await axios.post(
    process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
    { query, variables },
    { headers: { Authorization: jwtToken } },
  );
  return response.data.data?.pricing;
};

export default getSubscriptionPrice;
