import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import * as R from 'ramda';

import Button from '../../../../../../components/Button';
import ScrollSection from '../../../../../../components/UI/ScrollSection';
import { capitalize } from '../../../../../../util';

import formatAddress from '../../../../../../services/formatAddress';

import BucketImage from '../../../../../../components/BucketImage';

const getAreaServedArray = (areaServed) => {
  if (!areaServed) {
    return null;
  }

  if (areaServed.suburb) {
    return areaServed.suburb;
  }

  if (areaServed.city) {
    return areaServed.city;
  }

  if (areaServed.region) {
    return areaServed.region;
  }

  return null;
};

const YolConfirm = ({ formData, location, steps }) => {
  const aboutMyBusiness = R.path(['businessProfile', 'description'])(formData);
  const boostedCategory = formData?.productAttributes?.boosts?.[0];
  const areaServedArray = getAreaServedArray(formData?.location?.areaServed);
  return (
    <>
      {formData?.businessProfile?.logo?.contentUrl && (
        <Flex alignItems="center" justifyContent="space-between">
          <BucketImage
            contentUrl={formData?.businessProfile?.logo?.contentUrl}
            style={{ maxWidth: 200, maxHeight: 200 }}
          />
          <Button
            to={location.pathname.replace('confirm', steps.length)}
            size="sm"
            variant="link"
          >edit
          </Button>
        </Flex>
      )}
      <div>
        <table>
          <thead>
            <tr>
              <td colSpan="2">
                <h2>{R.path(['businessProfile', 'name'])(formData)}</h2>
              </td>
              <td>
                <Button
                  to={location.pathname.replace('confirm', 1)}
                  size="sm"
                  variant="link"
                >edit
                </Button>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Address</th>
              <td colSpan="2">
                <address>{formatAddress(R.path(['location', 'address'])(formData))}</address>
              </td>
              <td>
                <Button
                  to={location.pathname.replace('confirm', 2)}
                  size="sm"
                  variant="link"
                >edit
                </Button>
              </td>
            </tr>
            <tr>
              <th>Phone number</th>
              <td>
                0
                {R.path(['location', 'telephone', 'areaCode'])(formData)}
                {R.path(['location', 'telephone', 'number'])(formData)}
              </td>
              <td>
                <Button
                  to={location.pathname.replace('confirm', 4)}
                  size="sm"
                  variant="link"
                >edit
                </Button>
              </td>
            </tr>
            <tr>
              <th>Email address</th>
              <td>
                {R.path(['location', 'email'])(formData)}
              </td>
              <td>
                <Button
                  to={location.pathname.replace('confirm', 4)}
                  size="sm"
                  variant="link"
                >edit
                </Button>
              </td>
            </tr>
            <tr>
              <th>Service Areas</th>
              <td>
                {areaServedArray ? (
                  areaServedArray
                    .map(({ name }) => name)
                    .join(', ')
                ) : 'Not set'}
              </td>
              <td>
                <Button
                  to={location.pathname.replace('confirm', 3)}
                  size="sm"
                  variant="link"
                >edit
                </Button>
              </td>
            </tr>
            <tr>
              <th>Categories</th>
              <td>
                {formData.categories
                  && formData.categories?.map((category, index) => (
                    <React.Fragment key={category.name}>
                      {category.name}
                      {index + 1 < formData.categories.length && ', '}
                    </React.Fragment>
                  ))}
              </td>
              <td>
                <Button
                  to={location.pathname.replace('confirm', 5)}
                  size="sm"
                  variant="link"
                >edit
                </Button>
              </td>
            </tr>
            {boostedCategory && (
              <tr>
                <th>Category Boost</th>
                <td>
                  {capitalize(boostedCategory.boost)}, {boostedCategory.category.name}, {boostedCategory.region.name}
                </td>
                <td>
                  <Button
                    to={location.pathname.replace('confirm', 6)}
                    size="sm"
                    variant="link"
                  >edit
                  </Button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <Flex justifyContent="space-between">
          <h2>About my business</h2>
          <Button
            to={location.pathname.replace('confirm', 1)}
            size="sm"
            variant="link"
          >edit
          </Button>
        </Flex>
        <ScrollSection>
          {aboutMyBusiness}
        </ScrollSection>
      </div>
    </>
  );
};


YolConfirm.defaultProps = {
  formData: {},
  location: {},
  steps: [],
};

YolConfirm.propTypes = {
  formData: PropTypes.shape({
    categories: PropTypes.arrayOf({}),
    businessProfile: PropTypes.shape({
    }),
    productAttributes: PropTypes.shape({
    }),
    location: PropTypes.shape({
    }),
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  steps: PropTypes.arrayOf({}),
};

export default YolConfirm;
