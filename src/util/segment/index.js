/* globals window document */

import PropTypes from 'prop-types';
import { getTrackingProducts } from './trackingFormats';

export const segmentIdentify = ({ id, payload: { email, firstname, lastname } }) => {
  if (typeof window !== 'undefined') {
    const { analytics } = window;
    if (analytics) {
      analytics.identify(id, { email, firstname, lastname });
    }
  }
};

export const segmentTrack = ({
  event,
  payload,
}) => {
  if (typeof window !== 'undefined') {
    const { analytics } = window;
    if (analytics) {
      switch (event) {
        case 'Product Added': {
          analytics.track(event, {
            nonInteraction: 1,
            cartId: payload.cartId,
            cartedProducts: payload.cartedProducts.map(getTrackingProducts),
            addedProducts: payload.addedProducts.map(getTrackingProducts),
            clientId: payload.clientId,
            hubspotId: payload.hubspotId,
            isStaff: payload.isStaff,
          });
          break;
        }
        case 'Order Completed': {
          analytics.track(event, {
            nonInteraction: 1,
            jwtToken: payload.jwtToken,
            orderId: payload.orderId,
            checkoutId: payload.checkoutId,
            total: payload.total,
            revenue: payload.revenue,
            tax: payload.tax,
            currency: payload.currency,
            clientId: payload.clientId,
            hubspotId: payload.hubspotId,
            isStaff: payload.isStaff,
            label: payload.label,
            products: payload.products.map(getTrackingProducts),
            category: payload.category,
            action: payload.action,
            dimension: payload.dimension,
            cartId: payload.cartId,
          });
          break;
        }
        case 'cart.created': {
          analytics.track(event, {
            nonInteraction: 1,
            cartedProducts: payload.cartedProducts.map(getTrackingProducts),
            cartId: payload.cartId,
            jwtToken: payload.jwtToken,
            category: payload.category,
            clientId: payload.clientId,
            hubspotId: payload.hubspotId,
            isStaff: payload.isStaff,
            label: payload.label,
          });
          break;
        }
        case 'cart.updated': {
          analytics.track(event, {
            nonInteraction: 1,
            cartedProducts: payload.cartedProducts.map(getTrackingProducts),
            cartId: payload.cartId,
            jwtToken: payload.jwtToken,
            category: payload.category,
            clientId: payload.clientId,
            hubspotId: payload.hubspotId,
            isStaff: payload.isStaff,
            label: payload.label,
          });
          break;
        }
        case 'Product Removed': {
          analytics.track(event, {
            cartId: payload.cartId,
            cartedProducts: payload.cartedProducts.map(getTrackingProducts),
            nonInteraction: 1,
            clientId: payload.clientId,
            hubspotId: payload.hubspotId,
            isStaff: payload.isStaff,
            productsRemoved: payload.productsRemoved.map(getTrackingProducts),
          });
          break;
        }
        case `Search Ads Step ${payload.step} Reached`: {
          const dataObject = {
            nonInteraction: 1,
            isStaff: payload.isStaff,
            properties: {
              email: payload.email,
              firstname: payload.firstname,
              lastname: payload.lastname,
              ynz_sem_step: payload.ynz_sem_step,
              ...payload.data,
            },
          };
          analytics.track(event, dataObject);
          break;
        }
        default:
        {
          analytics.track(event);
        }
      }
    }
  }
};

export const segmentIdentifyAndTrack = ({
  event, id, payload,
}) => {
  if (typeof window !== 'undefined') {
    const { analytics } = window;
    if (analytics) {
      analytics.identify(id, { ...payload });
      analytics.track(event);
    }
  }
};

let eventListenerAdded = false;

export const trackGlobalClickEvents = () => {
  if (eventListenerAdded) {
    return;
  }

  document.addEventListener('click', (event) => {
    const {
      type: category, target: {
        innerHTML, className, nodeName, alt, href,
      },
    } = event;

    let label = innerHTML;
    if (nodeName === 'IMG' && label === '') {
      label = alt;
    }

    let action = '';

    if (nodeName === 'A' || nodeName === 'BUTTON') {
      if (className.includes('Button-')) action = 'Button Click';
      else action = 'Link Click';
      segmentTrack({
        event: action,
        payload: {
          category, label, action, dimension: href,
        },
      });
    }
  }, false);

  eventListenerAdded = true;
};

segmentIdentify.propTypes = {
  id: PropTypes.string.isRequired,
  payload: PropTypes.shape().isRequired,
};

segmentTrack.propTypes = {
  event: PropTypes.string.isRequired,
  payload: PropTypes.shape().isRequired,
};

segmentIdentifyAndTrack.propTypes = {
  event: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  payload: PropTypes.shape().isRequired,
};

export default segmentTrack;
