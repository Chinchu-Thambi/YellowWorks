/* eslint-disable react/prop-types */
import React from 'react';
import DashboardBlock from './DashboardBlock';


import searchLight from '../assets/images/search.svg';
import websiteLight from '../assets/images/website.svg';
import yellowProfileLight from '../assets/images/yellow-profile.svg';
import yellowPages from '../assets/images/yellow-pages.svg';

/**
 * @type {(businessId?: string) => JSX.Element}
 */
const ProductsModalContent = ({ businessId }) => (
  <div>
    <h2 className="text-contrast-600 text-center md:text-3xl">Manage Products</h2>
    <div className={`w-full grid grid-cols-1 ${businessId ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'} gap-4 py-4`}>
      {businessId && (
        <DashboardBlock
          image={websiteLight}
          caption="Website"
          link="my-products/website"
          variant
        />
      )}
      <DashboardBlock
        image={searchLight}
        caption="Google Search Ads"
        link="my-products/google-search-ads"
        variant
      />
      <DashboardBlock
        image={yellowProfileLight}
        caption="Yellow Profile"
        link="my-products/yellow-profile"
        variant
      />
      <DashboardBlock
        image={yellowPages}
        caption="Yellow Pages"
        link="my-products/yellow-pages"
        variant
      />
    </div>
  </div>
);

export default ProductsModalContent;
