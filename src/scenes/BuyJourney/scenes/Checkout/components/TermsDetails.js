/* eslint-disable max-len */
import React from 'react';
import { Flex } from 'rebass/styled-components';
import PropTypes from 'prop-types';

import { TermsContainer } from './Styled';
import checkAfter from './check-after.svg';
import checkBefore from './check-before.svg';

const TermsDetails = ({ details, setDetails, needPayment }) => {
  const handleChange = (e) => {
    const { id, checked } = e.target;

    setDetails({
      ...details,
      [id]: checked,
    });
  };

  return (
    <TermsContainer>
      <Flex justifyContent="space-between">
        <label htmlFor="terms">
          <img src={details.terms ? checkAfter : checkBefore} alt="check-box-terms" />
          <input
            type="checkbox"
            name="terms"
            id="terms"
            data-testid="terms"
            onChange={handleChange}
            checked={details.terms}
          />
          <span>I have read and accept the <a href="/terms/terms-business/" target="_blank">Terms of Business</a> and <a href="/terms/product-terms/" target="_blank">Additional Terms</a> for each product.</span>
        </label>
      </Flex>
      { needPayment ? (
        <Flex>
          <label htmlFor="authorize">
            <img src={details.authorize ? checkAfter : checkBefore} alt="check-box-authorize" />
            <input
              type="checkbox"
              name="authorize"
              id="authorize"
              data-testid="authorize"
              onChange={handleChange}
              checked={details.authorize}
            />
            <span>
              I authorise Yellow NZ to take payments from my card account in accordance with <a href="/terms/credit-debit-card-authorisation/" target="_blank">Credit/Debit Card Registration Terms</a>.
            </span>
          </label>
        </Flex>
      )
        : null}
    </TermsContainer>
  );
};

TermsDetails.defaultProps = {
  details: {
    terms: true,
    authorize: true,
    needPayment: true,
  },
};

TermsDetails.propTypes = {
  details: PropTypes.shape({
    terms: PropTypes.bool,
    authorize: PropTypes.bool,
  }),
  setDetails: PropTypes.func.isRequired,
  needPayment: PropTypes.bool.isRequired,
};

export default TermsDetails;
