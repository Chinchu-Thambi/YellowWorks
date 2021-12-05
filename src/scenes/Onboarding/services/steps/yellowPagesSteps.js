import * as CustomWidgets from '../../components/CustomWidgets';

const yellowPagesSteps = [
  {
    title: 'About your business',
    text: '',
    fields: [
      {
        path: ['name'],
        title: 'Business Name',
        description: '',
        placeholder: 'Enter your business name here',
        autofocus: true,
        Handler: CustomWidgets.InputText,
        required: true,
      },
      {
        path: ['location'],
        description: '',
        placeholder: 'Enter your business address',
        hasMapRadio: false,
        title: 'Address',
        Handler: CustomWidgets.Address,
        required: true,
      },
    ],
  },
  {
    title: 'Include additional business info',
    text: 'Please enter your primary phone number, as well as any additional information you want in your listing',
    fields: [
      {
        title: 'Primary Phone Number',
        path: ['primaryPhoneNumber'],
        Handler: CustomWidgets.Phone,
        required: true,
      },
      {
        title: 'Additional Phone Number',
        path: ['additionalPhoneNumber'],
        Handler: CustomWidgets.Phone,
      },
      {
        path: ['email'],
        title: 'Email',
        description: '',
        placeholder: 'Enter your business email here',
        Handler: CustomWidgets.EmailInput,
      },
      {
        path: ['url'],
        title: 'Website',
        description: '',
        placeholder: 'E.g. www.yellow.co.nz',
        Handler: CustomWidgets.WebsiteInput,
      },
    ],
  },
  {
    title: 'Yellow Book Details',
    text: '',
    fields: [
      {
        title: 'Select your Yellow Pages Book',
        name: 'Choose Yellow Pages book',
        path: ['book', 'product'],
        Handler: CustomWidgets.YellowBook,
        required: true,
      },
    ],
  },
  {
    title: 'Yellow Book Details',
    text: '',
    fields: [
      {
        title: 'Select your main business category',
        path: ['book'],
        name: 'Choose Yellow Pages book category',
        Handler: CustomWidgets.Classifications,
        required: true,
      },
    ],
  },
  {
    title: 'Your listing display',
    text: '',
    fields: [
      {
        title: 'Available listing designs',
        Handler: CustomWidgets.ListingSelector,
        required: true,
      },
    ],
  },
  {
    title: 'Listing Summary',
    text: '',
    fields: [
      {
        Handler: CustomWidgets.YellowPagesConfirmation,
      },
    ],
  },
];

export default yellowPagesSteps;
