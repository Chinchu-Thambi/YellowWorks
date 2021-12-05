import icons from './icons';

export const newMenuItems = [
  {
    title: 'Our Solutions',
    link: '/our-solutions',
    children: [
      {
        title: 'Get Online',
        link: '/get-online',
        children: [
          {
            title: 'Website',
          },
          {
            title: 'Sell Online',
          },
          {
            title: 'Yellow Profile',
          },
        ],
      },
      {
        title: 'Promote your Business',
        children: [
          {
            title: 'Google Search Ads',
          },
          {
            title: 'Google Display Ads',
          },
          {
            title: 'Facebook Ads',
          },
          {
            title: 'Yellow Books',
          },
        ],
      },
      {
        title: 'Amplify your Business',
        children: [
          {
            title: 'Facebook Setup',
          },
          {
            title: 'SEO',
          },
          {
            title: 'Marketing Automation & CRM',
          },
        ],
      },
      {
        title: 'Speak to an Expert',
      },
    ],
  },
  {
    title: 'Why Yellow?',
    children: [
      {
        title: 'Customer Stories',
      },
    ],
  },
  {
    title: 'Knowledge Base',
    children: [
      {
        title: 'Starting your Business',
      },
      {
        title: 'Understanding Digital Marketing',
      },
      {
        title: 'Advice and Support',
      },
      {
        title: 'Helpful Tools',
      },
      {
        title: 'How-to Guides',
      },
    ],
  },
];

const menuItems = [
  {
    title: 'Products',
    link: '/our-products/',
    children: [
      {
        title: 'Get Online',
        children: [
          {
            title: 'Yellow Profile',
            link: '/our-products/yellow-profile',
            trackingLabel: 'Products_Yellow_Profile',
            iconSrc: icons.yol,
          },
          {
            title: 'Search Engine Optimisation',
            link: '/our-products/seo',
            trackingLabel: 'Products_SEO',
            iconSrc: icons.seo,
          },
        ],
      },
      {
        title: 'Get More Customers',
        children: [
          {
            title: 'Google Search Ads',
            link: '/our-products/google-search-ads',
            trackingLabel: 'Products_Adwords',
            iconSrc: icons.adWords,
          },
          {
            title: 'Google Display Ads',
            link: '/our-products/google-display-ads',
            trackingLabel: 'Products_Display_Advertising',
            iconSrc: icons.gDisplayAds,
          },
          {
            title: 'Facebook Ads',
            link: '/our-products/facebook-ads',
            trackingLabel: 'Products_Facebook_Adwords',
            iconSrc: icons.fAds,
          },
        ],
      },
      {
        title: 'Do Business Better',
        children: [
          {
            title: 'Marketing Automation & CRM',
            link: '/our-products/marketing-automation',
            trackingLabel: 'Products_Marketing_Automation',
            iconSrc: icons.hsCrm,
          },
          {
            title: 'Speak to a Digital Expert',
            link: '/our-solutions/speak-to-expert',
            trackingLabel: 'Digital_Expert',
            iconSrc: icons.yol,
          },
        ],
      },
      {
        title: 'Print Directories',
        children: [
          {
            title: 'Yellow Pages',
            link: '/our-products/yellow-pages',
            trackingLabel: 'Products_Yellow_Pages',
            iconSrc: icons.yBooks,
          },
          {
            title: 'White Pages',
            link: '/our-products/white-pages',
            trackingLabel: 'Products_White_Pages',
            iconSrc: icons.yBooks,
          },
        ],
      },
    ],
  },
  {
    title: 'Resources',
    link: '/resources/',
    children: [
      {
        title: 'Customer Stories',
        link: '/resources/customer-stories/',
        trackingLabel: 'Resources_Customer_Stories',
      },
      {
        title: 'Tips and Tools',
        link: '/resources/tips-and-tools/',
        trackingLabel: 'Resources_Tips_and_Tools',
      },
      {
        title: 'Yellow eBook',
        link: '/resources/yellow-ebook/',
        trackingLabel: 'Resources_ebook',
      },
      {
        title: 'FAQ',
        link: 'https://hub.yellow.co.nz/knowledge/faq',
        trackingLabel: 'Resources_Knowledge_Base',
        target: '_blank',
      },
      {
        title: 'Flybuys',
        link: '/resources/flybuys/',
        trackingLabel: 'Resources_Flybuys',
      },
    ],
  },
  {
    title: 'About Yellow',
    link: '/company/about-us/',
    children: [
      {
        title: 'Our Team',
        link: '/company/about-us/',
        trackingLabel: 'About_Our_team',
      },
      {
        title: 'Careers',
        link: '/company/careers/',
        trackingLabel: 'About_Careers',
      },
      {
        title: 'Contact Us',
        link: '/company/contact-us/',
        trackingLabel: 'About_Contact_Us',
      },
    ],
  },
];

export default menuItems;
