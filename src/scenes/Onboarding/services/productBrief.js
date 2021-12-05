import yellowPagesSteps from './steps/yellowPagesSteps';
import yellowProfileSteps from './steps/yellowProfileSteps';
import searchAdsSteps from './steps/searchAdsSteps';
import gmbSteps from './steps/gmbSteps';
import websiteSteps from './steps/websiteSteps';

const skuSteps = {
  YPBASIC: yellowProfileSteps,
  YPPREMIUM: yellowProfileSteps,
  YPPREMIUMLOYAL: yellowProfileSteps,
  SEARCHADS: searchAdsSteps,
  GMB: gmbSteps,
  PRINT: yellowPagesSteps,
  WEBSITE: websiteSteps,
};

const skuConfirmations = {
  SEARCHADS: true,
  PRINT: false,
};

const fallbackProductSku = {
  PRINT: 'PRTAK',
};

export const useFallbackSku = (sku) => (fallbackProductSku[sku] || sku);

export const getSteps = (props) => {
  if (!props?.skuList) {
    return [];
  }

  const matchingSteps = Object.entries(skuSteps)
    .find(
      ([stepSku]) => props.skuList.some(({ value }) => value === stepSku),
    );

  if (!matchingSteps) {
    return [];
  }

  const filteredSteps = matchingSteps[1].filter((step) => {
    if (step.conditions) {
      return step.conditions(props);
    }
    return true;
  });

  if (filteredSteps) {
    return filteredSteps;
  }

  console.log('Could not find onboarding steps', {
    skuSteps,
    props,
  });

  return [];
};

export const getConfirmation = (props) => {
  if (!props?.skuList) {
    return false;
  }

  const requiresCustomConfirmation = Object.entries(skuConfirmations)
    .find(
      ([sku]) => props.skuList.some(({ value }) => value === sku),
    )?.[1] || false;

  return requiresCustomConfirmation;
};

export const formData = {
  businessProfile: {
    name: 'business name!',
  },
  location: {
    address: {
      addressCountry: 'New Zealand',
      addressLocality: 'Auckland',
      postalCode: '0550',
      streetAddress: [
        '604 Great South Rd',
      ],
    },
  },
};
