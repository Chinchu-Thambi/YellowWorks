import React from 'react';
import { Text, Flex } from 'rebass/styled-components';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import theme from '../../util/theme';

import Tag from '../Tag';
import Button from '../Button';

const Discount = ({ onChange, pricingOptions }) => {
  const [input, setInput] = React.useState('');
  const [selectedDiscount, setSelectedDiscount] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const submittedDiscount = pricingOptions?.discountValidity;
  const isValid = submittedDiscount?.validity;

  const handleChange = (e) => {
    const {
      value,
    } = e.target;
    setInput(value);
  };

  const removeOption = () => {
    setInput('');
    onChange({ code: '' });
  };

  const submitCode = (e) => {
    e.preventDefault();
    onChange({ code: input });
  };

  React.useEffect(() => {
    if (!submittedDiscount?.name) {
      return;
    }
    if (submittedDiscount?.name !== selectedDiscount) {
      setSelectedDiscount(submittedDiscount);
      if (!isValid && R.toLower(submittedDiscount?.name) === 'get50') {
        setErrorMessage(submittedDiscount?.description);
      } else if (!isValid && R.toLower(submittedDiscount?.name) !== 'get50') {
        setErrorMessage(<p>Sorry you’ve entered an invalid promo code. Please check the details of the promo code you’re entering and if you continue to have issues, contact us <a href="/company/contact-us">here</a>.</p>);
      }
    }
  }, [submittedDiscount, selectedDiscount, isValid]);

  return (
    <>
      <Flex justifyContent="space-between" alignItems="start">
        <label htmlFor="discount">
          <input
            type="text"
            name="discount"
            id="discount"
            value={selectedDiscount?.code || input}
            disable={isValid}
            placeholder="Discount Code"
            onChange={handleChange}
            autoComplete="off"
            autoCorrect="off"
            onSubmit={(e) => e.preventDefault()}
            className="form-input"
          />
        </label>
        <Button
          tabIndex="0"
          size="sm"
          variant="secondary"
          disabled={!input}
          onClick={submitCode}
        >
          Add discount
        </Button>
      </Flex>
      {!isValid && submittedDiscount?.name && (
        <Text as="p" textAlign="left" marginBottom={2} color={theme.palette.accent[2][0]}>
          {errorMessage}
        </Text>
      )}
      {isValid && (
        <Flex justifyContent="space-between" alignItems="baseline" my={2}>
          <Text as="p" textAlign="left" marginBottom={2}>
            {submittedDiscount && (
              <Tag
                key={submittedDiscount.code}
                onRemove={removeOption}
              >
                {submittedDiscount?.name} - {submittedDiscount?.description}
              </Tag>
            )}
          </Text>

        </Flex>
      )}
    </>
  );
};

Discount.defaultProps = {
  pricingOptions: {},
};

Discount.propTypes = {
  onChange: PropTypes.func.isRequired,
  pricingOptions: PropTypes.shape({
    discountValidity: {
      code: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      validity: PropTypes.bool,
    },
  }),
};

export default Discount;
