/* eslint-disable react/prop-types */
import React from 'react';
import DashboardBlock from './DashboardBlock';

import searchLight from '../assets/images/search.svg';
import websiteLight from '../assets/images/website.svg';
import yellowProfileLight from '../assets/images/yellow-profile.svg';

/**
 * @type {(businessId?: string) => JSX.Element}
 */
const DigitalPerformanceModalContent = ({ businessId }) => (
  <div>
    <h2 className="text-contrast-600 text-center md:text-3xl">Digital Performance</h2>
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
      {businessId && (
        <DashboardBlock
          image={websiteLight}
          caption="Website"
          link="digital-performance/website"
          variant
        />
      )}
      <DashboardBlock
        image={yellowProfileLight}
        caption="Yellow Profile"
        link="digital-performance/yellow-profile"
        variant
      />
      {businessId && (
        <DashboardBlock
          image={searchLight}
          caption="Google Search Ads"
          link="digital-performance/google-search-ads"
          variant
        />
      )}
    </div>
  </div>
);

export default DigitalPerformanceModalContent;
