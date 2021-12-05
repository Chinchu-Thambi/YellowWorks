/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import { Box } from 'rebass';
import Select from 'react-select';
import * as R from 'ramda';
import Spinner from '../../../../../../components/Spinner';
import getPublishingDate from '../../../../../../services/getPublishingDate';
import ValidationController from '../../../../../../components/ValidationController';

const QUERY_PRODUCTS = graphql`
  {
      productPlatform {
        products(family: "PRINT") {
          family
          name
          pricingPlan {
            amount
            id
            interval
          }
          printDeliveryDate
          printLastBookingDate
          printProductCode
          printProductName
          requiresPayment
          sku
        }
      }
    }
`;


const transformToOption = (value) => {
  // Todo - no longer need split when backend parsing only month
  const publishDate = R.split(' ', getPublishingDate(value?.printDeliveryDate, value?.printLastBookingDate));
  return {
    value,
    label: `${value.printProductName} - ${publishDate[1]} ${publishDate[2]}`,
  };
};

const YellowBookSelector = (props) => {
  const {
    formData, onChange, title, description, required, name,
  } = props;
  const selectRef = React.useRef(null);
  const isBlocked = !formData.sku;
  const rawProducts = useStaticQuery(QUERY_PRODUCTS) || {};
  const books = R.path(['productPlatform', 'products'])(rawProducts);

  const handleChange = ({ value }) => {
    onChange(value);
  };

  if (!books) return <Spinner />;
  return (
    <div>
      {title && <h2>{title}</h2>}
      {description && (
        <Box marginBottom={4}>
          <p>{description}</p>
        </Box>
      )}
      <Box marginY={3}>
        <Select
          id={name}
          aria-label="Yellow Pages book select"
          value={formData.sku && transformToOption(formData)}
          options={books?.map(transformToOption)}
          placeholder="Select..."
          onChange={handleChange}
          isDisabled={!books}
          isMulti={false}
          ref={selectRef}
          required={required}
        />
        <ValidationController requiredRef={selectRef} isBlocked={isBlocked} />
      </Box>
    </div>
  );
};

YellowBookSelector.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    sku: PropTypes.string,
    publishDate: PropTypes.number,
  }),
  name: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

YellowBookSelector.defaultProps = {
  formData: {},
  title: '',
  name: '',
  description: '',
  required: false,
};

export default YellowBookSelector;
