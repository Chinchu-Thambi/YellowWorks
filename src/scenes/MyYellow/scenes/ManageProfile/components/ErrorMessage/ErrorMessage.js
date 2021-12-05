import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const ErrorMessage = ({ errors }) => {
  // eslint-disable-next-line no-console
  console.log(errors);
  return (
    <>
      <h2>Oops!</h2>
      <p>
        We couldn&#39;t quite find that profile.
        Please go back to <Link to="/my-yellow/my-products/">your products</Link> and try again.
      </p>
      <p>If you need support contact care@yellow.co.nz.</p>
    </>
  );
};

ErrorMessage.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.shape({ }),
  ).isRequired,
};

export default ErrorMessage;
