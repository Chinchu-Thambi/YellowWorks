import * as CustomWidgets from '../../components/CustomWidgets';

const gmbSteps = [
  {
    title: 'What is your business name?',
    text: '',
    fields: [
      {
        path: ['businessProfile', 'name'],
        title: 'Business Name',
        description: '',
        placeholder: 'Enter your business name here',
        autofocus: true,
        Handler: CustomWidgets.InputText,
        maxLength: 100,
        required: true,
      },
    ],
  },
  {
    title: 'What contact details do you want to show?',
    text: '',
    fields: [
      {
        name: 'location.telephone',
        path: ['location', 'telephone'],
        description: '',
        Handler: CustomWidgets.Phone,
      },
      // {
      //   name: 'location.email',
      //   path: ['location', 'email'],
      //   title: 'Business email address',
      //   description: '',
      //   Handler: CustomWidgets.InputText,
      // },
      {
        name: 'businessProfile.url',
        path: ['businessProfile', 'url'],
        title: 'Website',
        description: '',
        placeholder: 'https://example.com',
        Handler: CustomWidgets.WebsiteInput,
        type: 'url',
      },
    ],
  },
  {
    title: 'Describe your business',
    text: '',
    fields: [
      {
        name: 'businessProfile.description',
        path: ['businessProfile', 'description'],
        title: 'About your business',
        description: 'This is the description of your business that will feature on your Google Profile so talk yourself up!',
        placeholder: 'eg. What do you do? or What makes you better than your competitors',
        Handler: CustomWidgets.Textarea,
        maxLength: 4000,
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
        title: 'Business location',
        Handler: CustomWidgets.Address,
        required: true,
      },
    ],
  },
  {
    title: 'What’s your business category?',
    text: '',
    fields: [
      {
        title: 'Business Category',
        path: ['categories', 'primaryCategory'],
        placeholder: 'Select or search...',
        Handler: CustomWidgets.CategoryGoogle,
        required: true,
        maxItems: 1,
        minItems: 1,
      },
    ],
  },
];

export default gmbSteps;
