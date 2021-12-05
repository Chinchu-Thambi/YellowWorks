/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Text, Link } from 'rebass/styled-components';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MoreLessToggle = ({ isTruncated, onToggle }) => (
  <>
    {isTruncated && <Text as="span">... </Text>}
    <Link onClick={onToggle} fontWeight="bold" sx={{ cursor: 'pointer' }}>
      {isTruncated && 'read more '}
      {isTruncated && <FontAwesomeIcon icon={faAngleDown} />}
      {!isTruncated && ' less '}
      {!isTruncated && <FontAwesomeIcon icon={faAngleUp} />}
    </Link>
  </>
);

const ReadMoreText = ({ text, truncatedCharLength }) => {
  const [isTruncated, setIsTruncated] = React.useState(true);
  const onToggle = () => setIsTruncated(!isTruncated);

  return (
    <Text>
      {text?.substring(0, isTruncated ? truncatedCharLength : text.length)}
      {text?.length > truncatedCharLength && <MoreLessToggle onToggle={onToggle} isTruncated={isTruncated} />}
    </Text>
  );
};

ReadMoreText.defaultProps = {
  text: '',
};

ReadMoreText.propTypes = {
  text: PropTypes.string,
  truncatedCharLength: PropTypes.number.isRequired,
};

MoreLessToggle.propTypes = {
  isTruncated: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ReadMoreText;
