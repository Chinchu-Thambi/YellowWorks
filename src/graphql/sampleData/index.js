const featuresText = `- Business name, description & logo
- Address or servicing areas
- Contact details & opening hours
- Keywords
- Monthly reporting
- Ratings & Reviews
- Yellow Profile self service`;

export const childProducts = {
  nodes: [
    {
      sku: 'CBGOLD',
      name: 'Gold Category',
      price: 100,
      shortName: 'Gold',
      shortText: 'Category search results are visible above Free, Bronze and Silver listings',
    },
    {
      sku: 'CBSILVER',
      shortName: 'Silver',
      price: 70,
      shortText: 'Category search results are visible above Free and Bronze listings',
      name: 'Silver Category',
    },
    {
      sku: 'CBBRONZE',
      name: 'Bronze Category',
      price: 50,
      shortName: 'Bronze',
      shortText: 'Category search results are visible above Free listings',
    },
  ],
};

export const productOptions = {
  YOL: [{
    sku: 'YPBASIC',
    name: 'Basic Profile',
    options: childProducts,
    requiresPayment: false,
    features: {
      features: featuresText,
    },
  },
  {
    sku: 'YPPREMIUM',
    name: 'Premium Profile',
    options: childProducts,
    requiresPayment: true,
    features: {
      features: featuresText,
    },
  },
  ],
  SEARCHADS: [{
    sku: 'SEARCHADS',
    name: 'Search Ads Profile',
    price: null,
    requiresPayment: true,
    features: {
      features: featuresText,
    },
    pricingPlan: [
      'MONTHLY',
    ],
    options: {
      nodes: [
        {
          sku: 'SEARCHADS_100',
          name: 'SEARCHADS_100',
          price: 100,
        },
        {
          sku: 'SEARCHADS_1000',
          name: 'SEARCHADS_1000',
          price: 1000,
        },
        {
          sku: 'SEARCHADS_10000',
          name: 'SEARCHADS_10000',
          price: 10000,
        },
        {
          sku: 'SEARCHADS_10100',
          name: 'SEARCHADS_10100',
          price: 10100,
        },
        {
          sku: 'SEARCHADS_10200',
          name: 'SEARCHADS_10200',
          price: 10200,
        },
        {
          sku: 'SEARCHADS_10300',
          name: 'SEARCHADS_10300',
          price: 10300,
        },
        {
          sku: 'SEARCHADS_10400',
          name: 'SEARCHADS_10400',
          price: 10400,
        },
        {
          sku: 'SEARCHADS_10500',
          name: 'SEARCHADS_10500',
          price: 10500,
        },
        {
          sku: 'SEARCHADS_10600',
          name: 'SEARCHADS_10600',
          price: 10600,
        },
        {
          sku: 'SEARCHADS_10700',
          name: 'SEARCHADS_10700',
          price: 10700,
        },
        {
          sku: 'SEARCHADS_10800',
          name: 'SEARCHADS_10800',
          price: 10800,
        },
        {
          sku: 'SEARCHADS_10900',
          name: 'SEARCHADS_10900',
          price: 10900,
        },
        {
          sku: 'SEARCHADS_1100',
          name: 'SEARCHADS_1100',
          price: 1100,
        },
        {
          sku: 'SEARCHADS_11000',
          name: 'SEARCHADS_11000',
          price: 11000,
        },
        {
          sku: 'SEARCHADS_1200',
          name: 'SEARCHADS_1200',
          price: 1200,
        },
        {
          sku: 'SEARCHADS_1300',
          name: 'SEARCHADS_1300',
          price: 1300,
        },
        {
          sku: 'SEARCHADS_13800',
          name: 'SEARCHADS_13800',
          price: 13800,
        },
        {
          sku: 'SEARCHADS_13900',
          name: 'SEARCHADS_13900',
          price: 13900,
        },
        {
          sku: 'SEARCHADS_1400',
          name: 'SEARCHADS_1400',
          price: 1400,
        },
        {
          sku: 'SEARCHADS_14500',
          name: 'SEARCHADS_14500',
          price: 14500,
        },
        {
          sku: 'SEARCHADS_150',
          name: 'SEARCHADS_150',
          price: 150,
        },
      ],
    },
  }],
};
