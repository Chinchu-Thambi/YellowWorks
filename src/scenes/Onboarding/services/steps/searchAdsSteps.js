import * as CustomWidgets from '../../components/CustomWidgets';

const searchAdsSteps = [
  {
    title: 'What are your contact details?',
    text: '',
    fields: [
      {
        name: 'fullName',
        path: ['fullName'],
        title: 'My full name is',
        description: '',
        placeholder: 'Enter your full name here',
        autofocus: true,
        Handler: CustomWidgets.InputText,
        required: true,
      },
      {
        name: 'email',
        path: ['email'],
        title: 'My business email',
        description: '',
        placeholder: 'Enter your business email here',
        Handler: CustomWidgets.EmailInput,
        required: true,
      },
      {
        name: 'consent',
        path: ['consent'],
        Handler: CustomWidgets.ConsentInput,
        required: true,
      },
    ],
  },
  {
    title: 'What’s your business category?',
    text: '',
    fields: [
      {
        name: 'categories',
        path: ['categories'],
        Handler: CustomWidgets.CategorySearchAds,
        title: 'My business categories',
        description: 'Select all relevant categories for your business',
        required: true,
        maxItems: 4,
        minItems: 1,
      },
    ],
  },
  {
    title: 'Where is your business located?',
    text: '',
    fields: [
      {
        name: 'location',
        path: ['location'],
        description: '',
        placeholder: 'Enter your business address',
        hasMapRadio: false,
        title: 'My business location',
        Handler: CustomWidgets.Address,
        required: true,
      },
    ],
  },
  {
    title: 'What is your target location?',
    text: '',
    fields: [
      {
        name: 'targetLocation',
        path: ['targetLocation'],
        description: '',
        Handler: CustomWidgets.TargetLocation,
        required: true,
      },
    ],
  },
  {
    title: 'Where do you want us to direct your ads?',
    text: '',
    fields: [
      {
        name: 'targetLandingPage',
        path: ['targetLandingPage'],
        title: 'Choose where your ads go',
        description: "If you have a website our analysts will match the best pages to their most relevant searches. If you don't, you can point ads to your Yellow Profile or Facebook page.",
        Handler: CustomWidgets.UrlTypePicker,
        required: true,
      },
    ],
  },
  {
    title: 'Where do you want us to direct your ads?',
    text: '',
    fields: [
      {
        name: 'targetLandingPage',
        path: ['targetLandingPage'],
        placeholder: 'Enter url here',
        Handler: CustomWidgets.SearchAdsLandingPage,
        required: true,
      },
    ],
  },
];

export default searchAdsSteps;
