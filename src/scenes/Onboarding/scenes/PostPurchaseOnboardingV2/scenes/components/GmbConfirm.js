import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import Button from '../../../../../../components/Button';

import formatAddress from '../../../../../../services/formatAddress';


const GmbConfirm = ({ formData, location }) => {
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
            <tr>
              <th>Address</th>
              <td colSpan="2">
                <address>{formatAddress(R.path(['location', 'address'])(formData))}</address>
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
              <th>Phone number</th>
              <td>
                0
                {R.path(['location', 'telephone', 'areaCode'])(formData)}
                {R.path(['location', 'telephone', 'number'])(formData)}
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
              <th>Website</th>
              <td>
                {R.path(['businessProfile', 'url'])(formData)}
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
              <th>Main Category</th>
              <td>
                {formData.categories.primaryCategory
                  && R.path(['categories', 'primaryCategory', 'name'])(formData)}
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


GmbConfirm.defaultProps = {
  formData: {},
  location: {},
};

GmbConfirm.propTypes = {
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
};

export default GmbConfirm;
