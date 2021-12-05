import React from 'react';
import {
  faClipboardList, faBuilding, faCog, faMapMarkerAlt,
  faDesktop, faBullseye, faComment,
  faChartLine, faImage, faTag, faBook, faFileInvoiceDollar,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Menu, MenuGroup, MenuItem, BusinessMenuHeroItem, HorizontalSeparator,
} from '../menu/Menu/Menu';
import BusinessContext from '../../../MyYellow/services/BusinessContext';


const MyYellowV2Sidebar = () => {
  const {
    currentBusiness, businessId,
  } = React.useContext(BusinessContext) || {};
  return (
    <Menu>
      <BusinessMenuHeroItem businessName={currentBusiness?.details?.name || 'Welcome!'} />
      <MenuGroup>
        <MenuItem
          icon={<FontAwesomeIcon icon={faBuilding} />}
          label="Dashboard"
          to="/myyellowv2/home"
        />
        {businessId && (
          <MenuItem
            icon={<FontAwesomeIcon icon={faClipboardList} />}
            label="Business Details"
            to="/myyellowv2/business-details"
          />
        )}
        {businessId && (
          <MenuItem
            icon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
            label="Locations"
            to="/myyellowv2/locations"
          />
        )}
        {businessId && (
          <MenuItem
            icon={<FontAwesomeIcon icon={faImage} />}
            label="Photos"
            to="/myyellowv2/content"
          />
        )}
        {businessId && (
          <MenuItem
            icon={<FontAwesomeIcon icon={faTag} />}
            label="Products &amp; Services"
            to="/myyellowv2/products-and-services"
          />
        )}
        <MenuItem
          icon={<FontAwesomeIcon icon={faComment} />}
          label="Ratings &amp; Reviews"
          to="/myyellowv2/manage-reviews"
        />
        <MenuItem
          icon={<FontAwesomeIcon icon={faChartLine} />}
          label="Digital Performance"
          to="/myyellowv2/digital-performance"
        />
        <div className="ml-2 py-2 submenu">
          <MenuItem
            label="Yellow Profile"
            to="/myyellowv2/digital-performance/yellow-profile"
          />
          {businessId && (
            <MenuItem
              label="Website"
              // TODO needs to be reverted b efore merge
              to="/myyellowv2/insights/website-u2r982tu34872t98y34t9p4y2ri234urh"
              // to="/myyellowv2/digital-performance/website"
            />
          )}
          {businessId && (
            <MenuItem
              label="Search Ads"
              to="/myyellowv2/digital-performance/search-ads"
            />
          )}
        </div>
      </MenuGroup>
      <HorizontalSeparator />
      <MenuGroup name="Products">
        {businessId && (
          <MenuItem
            icon={<FontAwesomeIcon icon={faDesktop} />}
            label="Website"
            to="/myyellowv2/my-products/website"
          />
        )}
        <MenuItem
          icon={<FontAwesomeIcon icon={faGoogle} />}
          label="Google Search Ads"
          to="/myyellowv2/my-products/google-search-ads"
        />
        {/* <MenuItem
          icon={<FontAwesomeIcon icon={faGoogle} />}
          label="Google My Business"
          to="/myyellowv2/my-products/google-my-business"
        /> */}
        <MenuItem
          icon={<FontAwesomeIcon icon={faBullseye} />}
          label="Yellow Profile"
          to="/myyellowv2/my-products/yellow-profile"
        />
        <MenuItem
          icon={<FontAwesomeIcon icon={faBook} />}
          label="Yellow Pages"
          to="/myyellowv2/my-products/yellow-pages"
        />
      </MenuGroup>
      <HorizontalSeparator />
      <MenuGroup name="Administration">
        <MenuItem
          icon={<FontAwesomeIcon icon={faCog} />}
          label="Account Settings"
          to="/myyellowv2/account-settings"
        />
        <MenuItem
          icon={<FontAwesomeIcon icon={faFileInvoiceDollar} />}
          label="Billing &amp; Statements"
          to="/myyellowv2/billing"
        />
      </MenuGroup>
    </Menu>
  );
};

export default MyYellowV2Sidebar;
