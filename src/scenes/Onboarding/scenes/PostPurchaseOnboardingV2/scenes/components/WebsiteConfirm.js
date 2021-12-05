import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import * as R from 'ramda';

import Button from '../../../../../../components/Button';
// TODO - Discuss with team on shifting this out.
// eslint-disable-next-line max-len
import OpeningHoursView from '../../../../../MyYellow/scenes/ManageProfile/components/MainInfoTab/components/OpeningHoursView';

import formatAddress from '../../../../../../services/formatAddress';

import BucketImage from '../../../../../../components/BucketImage';

const WebsiteConfirm = ({ formData, location }) => {
  const aboutMyBusiness = R.path(['businessProfile', 'description'])(formData);

  return (
    <>
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
            <tr height="200px">
              <th>Banner Image</th>
              <td colSpan="2">
                {formData?.bannerImage?.image?.contentUrl && (
                <Flex alignItems="center" justifyContent="space-between">
                  <BucketImage
                    contentUrl={formData?.bannerImage?.image?.contentUrl}
                    style={{ maxWidth: 200, maxHeight: 200 }}
                  />
                  <Button
                    to={location.pathname.replace('confirm', 4)}
                    size="sm"
                    variant="link"
                  >edit
                  </Button>
                </Flex>
                )}
              </td>
            </tr>
            <tr>
              <th>Banner Headline</th>
              <td colSpan="2">
                <address>{R.path(['bannerImage', 'headline'])(formData)}</address>
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
              <th>Banner Subtitle</th>
              <td colSpan="2">
                <address>{R.path(['bannerImage', 'subtitle'])(formData)}</address>
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
                  to={location.pathname.replace('confirm', 1)}
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
                  to={location.pathname.replace('confirm', 1)}
                  size="sm"
                  variant="link"
                >edit
                </Button>
              </td>
            </tr>
            <tr>
              <th>Social Links</th>
              <td>
                {R.path(['social', 'facebook'])(formData)}
              </td>
              <td>
                {R.path(['social', 'instagram'])(formData)}
              </td>
              <td>
                {R.path(['social', 'linkedin'])(formData)}
              </td>
              <td>
                {R.path(['social', 'twitter'])(formData)}
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
            <tr>
              <th>Opening Hours</th>
              <td>
                {formData.openingHours
                  && <OpeningHoursView providedHours={formData.openingHours} />}
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
            <tr>
              <th>Business Description</th>
              <td>
                {aboutMyBusiness}
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
          </tbody>
        </table>
      </div>
    </>
  );
};

WebsiteConfirm.defaultProps = {
  formData: {},
  location: {},
};

WebsiteConfirm.propTypes = {
  formData: PropTypes.shape({
    bannerImage: PropTypes.shape({
      headline: PropTypes.string,
      subtitle: PropTypes.string,
      image: PropTypes.shape({}),
    }),
    businessProfile: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),
    productAttributes: PropTypes.shape({
    }),
    location: PropTypes.shape({
    }),
    openingHours: PropTypes.shape({
    }),
    social: PropTypes.shape({
      facebook: PropTypes.string,
      instagram: PropTypes.string,
      linkedin: PropTypes.string,
      twitter: PropTypes.string,
    }),
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default WebsiteConfirm;
