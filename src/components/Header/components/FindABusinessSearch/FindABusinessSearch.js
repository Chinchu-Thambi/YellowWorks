import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Text } from 'rebass';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';


import { HeaderButton } from '../LgHeader/LgHeaderStyled';

const FindABusinessSearch = ({ className }) => (
  <HeaderButton
    href="/find-a-business/"
    highlighted="true"
    className={className}
  ><FontAwesomeIcon icon={faSearch} size="sm" /><Text pl={2}>Find a business</Text>
  </HeaderButton>
);

FindABusinessSearch.defaultProps = {
  className: '',
};

FindABusinessSearch.propTypes = {
  className: PropTypes.string,
};

export default FindABusinessSearch;
