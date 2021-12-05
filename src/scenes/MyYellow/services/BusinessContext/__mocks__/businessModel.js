import yellowWebsiteModel from './yellowWebsiteModel';

const providerConfiguration = {
  yellowWebsite: yellowWebsiteModel,
};

const businessModel = {
  details: {
    legalName: 'Legal Name',
    name: 'Business Name',
    url: 'http://example.com',
    logo: 'http://example.com/logoUrl',
    slogan: 'the business slogan!',
  },
  locations: [
    {
      default: false,
    },
    {
      default: true,
      telephone: {
        areaCode: '9',
        number: '3004000',
      },
    },
  ],
  providerConfiguration,
  subscriptions: [
    { provider: 'WEBSITE', status: 'ACTIVE' },
  ],
};

export default businessModel;
