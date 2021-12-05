import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import * as R from 'ramda';

import Location from '../../../MyYellowV2/components/Location';
import { OneColumnContainer } from '../../../MyYellowV2/components/Containers';
import { EditIconButton } from '../../../MyYellowV2/components/IconButtons';
import { ThemeSwatch } from '../../../../components/YellowWebsitesThemePicker/YellowWebsitesThemePicker';
import Product from '../../../MyYellowV2/components/Product';

const defaultThemes = [
  {
    label: 'Tradie',
    value: 'tradie',
    colors: ['#FFFFFF', '#F2F2F2', '#D9DDE3', '#718096', '#041430', '#DE2828'],
  },
  {
    label: 'Spring',
    value: 'spring',
    colors: ['#F8F3E8', '#F8F3E8', '#F8F3E8', '#F8F3E8', '#3F0060', '#FFB54F'],
  },
  {
    label: 'Rose',
    value: 'rose',
    colors: ['#FFFFFF', '#F5F1EF', '#D0C4BE', '#7D6C62', '#4D423C', '#261E19'],
  },
  {
    label: 'Fresh',
    value: 'fresh',
    colors: ['#FFFFFF', '#EFF5F0', '#BED0C1', '#627D67', '#3C4D3F', '#19261B'],
  },
  {
    label: 'Pro',
    value: 'pro',
    colors: ['#FFFFFF', '#EFF1F5', '#BEC5D0', '#626D7D', '#384457', '#081D3C'],
  },
];

const WebsiteConfirm = ({
  formData, navigate, locationHistory, skuList,
}) => {
  const isEcommerce = R.includes('WEBSITE_ONLINE_STORE')(skuList);
  const isCustom = R.includes('WEBSITE_DOMAIN')(skuList);
  const yellowWebsiteDetails = formData?.providerConfiguration?.yellowWebsite;
  const basePath = locationHistory.pathname.substring(0, locationHistory.pathname.lastIndexOf('/') + 1);
  return (
    <div className="space-y-3">
      <OneColumnContainer
        title="Business Name"
        actionButton={<EditIconButton onClick={() => navigate(`${basePath}1`)} />}
      >
        <div className="flex flex-col">
          <p className="w-full">{formData?.details?.name}</p>
        </div>
      </OneColumnContainer>
      <OneColumnContainer
        title="Locations"
        actionButton={<EditIconButton onClick={() => navigate(`${basePath}2`)} />}
      >
        {formData?.locations && (
          <Flex flexDirection="column" alignItems="center" justifyContent="space-between" className="w-full">
            {formData?.locations?.map((loc) => {
              const {
                name, address, email, telephone, openingHours, specialOpeningHours, default: isMain,
              } = loc;
              return (
                <div className="mb-2 lg:mx-2 flex-grow w-full">
                  <Location
                    name={name}
                    address={address}
                    email={email}
                    phone={telephone}
                    openingHours={openingHours}
                    specialOpeningHours={specialOpeningHours}
                    isMain={isMain}
                  />
                </div>
              );
            })}
          </Flex>
        )}
      </OneColumnContainer>
      <OneColumnContainer
        title="Business Details"
        actionButton={<EditIconButton onClick={() => navigate(`${basePath}1`)} />}
      >
        <div
          className="flex flex-col space-y-2 p-3 sm:p-4 text-contrast-600 sm:flex-row w-full sm:space-y-0 sm:space-x-2"
        >
          <p className="w-1/3 font-bold">Business Description</p>
          <p className="w-2/3 self-center">{formData?.details?.description}</p>
        </div>
        <div
          className="flex flex-col space-y-2 p-3 sm:p-4 text-contrast-600 sm:flex-row w-full sm:space-y-0 sm:space-x-2"
        >
          <p className="w-1/3 font-bold">Business Logo</p>
          <p className="w-2/3 self-center">
            {formData?.details?.logo ? (
              <img
                className="w-full h-full object-cover rounded-md max-h-10"
                src={formData?.details?.logo}
                alt="logo"
              />
            ) : <p>No logo provided</p>}
          </p>
        </div>
      </OneColumnContainer>
      <OneColumnContainer
        title="Social Media"
        actionButton={<EditIconButton onClick={() => navigate(`${basePath}3`)} />}
      >
        <div
          className="flex flex-col space-y-2 p-3 sm:p-4 text-contrast-600 sm:flex-row w-full sm:space-y-0 sm:space-x-2"
        >
          <p className="w-1/3 font-bold">Social Media</p>
          <div>
            {R.map((social) => (
              <p className="w-full self-start"><strong>{social.name}:</strong> {social.url}</p>
            ))(formData?.details?.sameAs || [])}
          </div>
        </div>
      </OneColumnContainer>
      <OneColumnContainer
        title="Website Details"
        actionButton={<EditIconButton onClick={() => navigate(`${basePath}4`)} />}
      >
        {yellowWebsiteDetails?.bannerImage?.image?.contentUrl && (
          <Flex alignItems="center" justifyContent="space-between">
            <h2>Banner Image</h2>
            <img src={yellowWebsiteDetails?.bannerImage?.image?.contentUrl} alt="logo" width={400} height={200} />
          </Flex>
        )}
        <div
          className="flex flex-col space-y-2 p-3 sm:p-4 text-contrast-600 sm:flex-row w-full sm:space-y-0 sm:space-x-2"
        >
          <p className="w-1/3 font-bold">Banner Headline</p>
          <p className="w-2/3 self-center">{R.path(['headline'])(yellowWebsiteDetails)}</p>
        </div>
        <div
          className="flex flex-col space-y-2 p-3 sm:p-4 text-contrast-600 sm:flex-row w-full sm:space-y-0 sm:space-x-2"
        >
          <p className="w-1/3 font-bold">Banner Sub Heading</p>
          <p className="w-2/3 self-center">{R.path(['alternativeHeadline'])(yellowWebsiteDetails)}</p>
        </div>
        <div
          className="flex flex-col space-y-2 p-3 sm:p-4 text-contrast-600 sm:flex-row w-full sm:space-y-0 sm:space-x-2"
        >
          <p className="w-1/3 font-bold">Website Theme</p>
          <div className="w-2/3 self-center">
            {yellowWebsiteDetails?.theme && (
              <ThemeSwatch
                swatchTheme={defaultThemes[R.findIndex(R.propEq('value', yellowWebsiteDetails?.theme))(defaultThemes)]}
                key="themeSwatch"
              />
            )}
          </div>
        </div>
        <div
          className="flex flex-col space-y-2 p-3 sm:p-4 text-contrast-600 sm:flex-row w-full sm:space-y-0 sm:space-x-2"
        >
          <p className="w-1/3 font-bold">Website URL</p>
          <p className="w-2/3 self-center">{(!isCustom && R.path(['customDomain'])(yellowWebsiteDetails)) || `https://${R.path(['slug'])(yellowWebsiteDetails)}.yellow.co.nz`}</p>
        </div>
        {isCustom && (
          <div
            className="flex flex-col space-y-2 p-3 sm:p-4 text-contrast-600 sm:flex-row w-full sm:space-y-0 sm:space-x-2"
          >
            <p className="w-1/3 font-bold">Custom Domain</p>
            <p className="w-2/3 self-center">{isCustom && R.path(['customDomain'])(yellowWebsiteDetails)}</p>
          </div>
        )}
      </OneColumnContainer>
      {!isEcommerce && (
        <OneColumnContainer
          title="Products"
          actionButton={<EditIconButton onClick={() => navigate(`${basePath}5`)} />}
        >
          <div className="grid grid-cols-1 gap-3 w-full">
            {formData?.products?.map((prod, i) => (
              <Product
                key={i}
                name={prod.name}
                description={prod.description}
                image={prod.image}
              />
            ))}
          </div>
        </OneColumnContainer>
      )}
    </div>
  );
};

WebsiteConfirm.defaultProps = {
  formData: {},
  locationHistory: {},
  navigate: () => { },
  skuList: [],
};

WebsiteConfirm.propTypes = {
  navigate: PropTypes.func,
  formData: PropTypes.shape({
    products: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    }),
    providerConfiguration: PropTypes.shape({
      yellowWebsite: PropTypes.shape({
        headline: PropTypes.string,
        subtitle: PropTypes.string,
        bannerImage: PropTypes.shape({
          image: PropTypes.shape({}),
        }),
      }),
    }),
    details: PropTypes.shape({
      logo: PropTypes.shape({
        contentUrl: PropTypes.string,
      }),
      sameAs: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          url: PropTypes.string,
        }),
      ),
      description: PropTypes.string,
    }),
    locations: PropTypes.arrayOf(
      PropTypes.shape({
        openingHours: PropTypes.shape({
        }),
      }),
    ),
  }),
  locationHistory: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  skuList: PropTypes.arrayOf(
    PropTypes.string,
  ),
};

export default WebsiteConfirm;
