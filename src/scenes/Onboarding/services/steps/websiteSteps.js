import * as CustomWidgets from '../../components/CustomWidgets';

const websiteSteps = [
  {
    title: 'About your business',
    text: '',
    fields: [
      {
        name: 'businessProfile.name',
        path: ['businessProfile', 'name'],
        title: 'What’s your Business Name?',
        description: '',
        placeholder: 'Your business name goes here',
        autofocus: true,
        Handler: CustomWidgets.InputText,
        required: true,
      },
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
        title: 'Contact email address',
        description: 'To enable a contact form on your page please enter your preffered email',
        Handler: CustomWidgets.InputText,
        required: true,
      },
    ],
  },
  {
    title: 'Do you want your physical address to show on your website?',
    text: '',
    fields: [
      {
        title: 'Do you want your physical address to show on your website?',
        name: 'location',
        path: ['location'],
        hasMapRadio: true,
        description: '',
        Handler: CustomWidgets.Address,
      },
    ],
  },
  {
    title: 'Tell us about your business',
    text: '',
    fields: [
      {
        name: 'businessProfile.description',
        path: ['businessProfile', 'description'],
        title: 'About your business',
        description: 'This is the description of your business that will feature on your website so talk yourself up!',
        placeholder: 'eg. What do you do? or What makes you better than your competitors',
        Handler: CustomWidgets.Textarea,
        maxLength: 5000,
      },
    ],
  },
  {
    title: 'Banner',
    text: '',
    fields: [
      {
        name: 'bannerImage.headline',
        path: ['bannerImage', 'headline'],
        title: 'Banner Image headline',
        description: '',
        Handler: CustomWidgets.InputText,
        maxLength: 40,
        required: true,
      },
      {
        name: 'bannerImage.subtitle',
        path: ['bannerImage', 'subtitle'],
        title: 'Banner Image subtitle',
        description: '',
        Handler: CustomWidgets.InputText,
        maxLength: 60,
        required: true,
      },
      {
        name: 'bannerImage.image',
        path: ['bannerImage', 'image'],
        title: 'Banner Image',
        description: '',
        Handler: CustomWidgets.Logo,
        required: true,
      },
    ],
  },
  {
    title: 'Opening Hours',
    text: '',
    fields: [
      {
        name: 'openingHours',
        title: 'Let your customers know your opening hours',
        description: 'Enter split opening hours separately',
        path: ['openingHours'],
        Handler: CustomWidgets.OpeningHours,
      },
    ],
  },
  {
    title: 'Social Media',
    text: '',
    fields: [
      {
        name: 'social.facebook',
        path: ['social', 'facebook'],
        title: 'Facebook',
        description: '',
        Handler: CustomWidgets.InputText,
        maxLength: 40,
      },
      {
        name: 'social.facebook',
        path: ['social', 'twitter'],
        title: 'Twitter',
        description: '',
        Handler: CustomWidgets.InputText,
        maxLength: 40,
      },
      {
        name: 'social.facebook',
        path: ['social', 'instagram'],
        title: 'Instagram',
        description: '',
        Handler: CustomWidgets.InputText,
        maxLength: 40,
      },
      {
        name: 'social.facebook',
        path: ['social', 'linkedin'],
        title: 'LinkedIn',
        description: '',
        Handler: CustomWidgets.InputText,
        maxLength: 40,
      },
    ],
  },
  // {
  //   title: 'Products and Services',
  //   text: '',
  //   fields: [
  //     {
  //       name: 'products',
  //       path: ['products'],
  //       description: '',
  //       Handler: CustomWidgets.Products,
  //       maxLength: 20,
  //       required: true,
  //     },
  //   ],
  // },
  // {
  //   title: 'Choose your theme',
  //   text: 'Pick your preferred color palette for your website',
  //   fields: [
  //     {
  //       name: 'theme',
  //       path: ['theme'],
  //       description: '',
  //       Handler: CustomWidgets.Theme,
  //       required: true,
  //     },
  //   ],
  // },
];

export default websiteSteps;
