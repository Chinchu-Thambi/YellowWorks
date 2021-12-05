import * as CustomWidgets from '../../components/CustomWidgets';

const yellowProfileSteps = [
  {
    title: 'About your business',
    text: '',
    fields: [
      {
        name: 'businessProfile.name',
        path: ['businessProfile', 'name'],
        title: 'What’s your Business Trading Name?',
        description: '',
        placeholder: 'Your business trading name goes here',
        autofocus: true,
        Handler: CustomWidgets.InputText,
        required: true,
      },
      {
        name: 'businessProfile.description',
        path: ['businessProfile', 'description'],
        title: 'Tell your customers about your business',
        description: '',
        placeholder: 'eg. What do you do? or What makes you better than your competitors',
        Handler: CustomWidgets.Textarea,
        maxLength: 5000,
      },
    ],
  },
  {
    title: 'Do you want your physical address to show on your profile?',
    text: '',
    fields: [
      {
        title: 'Do you want your physical address to show on your profile?',
        name: 'location',
        path: ['location'],
        hasMapRadio: true,
        description: '',
        Handler: CustomWidgets.Address,
      },
    ],
  },
  {
    title: 'Where do you serve your customers?',
    text: '',
    fields: [
      {
        name: 'areaServed',
        path: ['location'],
        Handler: CustomWidgets.ServicingAreas,
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
        required: true,
      },
      {
        name: 'location.email',
        path: ['location', 'email'],
        title: 'Business email address',
        description: '',
        Handler: CustomWidgets.InputText,
        required: true,
      },
    ],
  },
  {
    title: 'Add categories to your profile',
    text: '',
    fields: [
      {
        name: 'categories',
        path: ['categories'],
        Handler: CustomWidgets.Category,
      },
    ],
  },
  {
    title: 'Category Boost',
    text: '',
    fields: [
      {
        name: 'productAttributes.boosts',
        path: [], // Empty array required here because this relies on the full formData being supplied.
        Handler: CustomWidgets.CategoryBoost,
      },
    ],
    conditions({ skuList = [] } = {}) {
      const boostProducts = ['CBBRONZE', 'CBSILVER', 'CBGOLD'];
      // checks if any of the boostProducts is included in the skuList
      return skuList.some(({ value }) => boostProducts.includes(value));
    },
  },
  {
    title: 'Your business logo',
    text: '',
    fields: [
      {
        name: 'businessProfile.logo',
        path: ['businessProfile', 'logo'],
        Handler: CustomWidgets.Logo,
      },
    ],
  },
];

export default yellowProfileSteps;
