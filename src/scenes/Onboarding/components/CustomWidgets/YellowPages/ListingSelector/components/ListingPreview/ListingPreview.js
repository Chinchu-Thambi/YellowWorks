/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Text } from 'rebass/styled-components';
import * as R from 'ramda';
import { Book, Preview } from './ListingPreview.styled';
import formatAddress from '../../../../../../../../services/formatAddress';

const ListingPreview = (props) => {
  const {
    listingType,
    address, name, primaryNumber, secondaryNumber, email, url,
  } = props;
  const siteAddress = url ? R.split('//', url)?.[1] : '---';

  const getSecondaryNumberType = (areaCode) => {
    const isMobile = [
      '20',
      '21',
      '22',
      '23',
      '24',
      '26',
      '27',
      '28',
      '29',
    ].includes(areaCode);
    if (isMobile) {
      return 'Mobile';
    }
    const isCallFree = [
      '508',
      '800',
      '900',
    ].includes(areaCode);
    if (isCallFree) {
      return 'Call Free';
    }
    return 'Or';
  };

  // Displays on all BUT Free
  const displaySecondaryNumber = secondaryNumber?.areaCode && listingType?.includes('LINE');
  // Displays on:
  // 2 Line where no alternative number
  // 3 Line and 4 Line all the time
  const displayEmail = (!secondaryNumber?.areaCode && listingType?.includes('LINE'))
    || (!secondaryNumber && email && R.includes(listingType, ['2LINE']))
    || (email && R.includes(listingType, ['3LINE', '4LINE']))
    || (email && listingType === ('5LINE'));

  // Displays on:
  // 3 Line where no alternative number
  // 4 Line all the time
  const displayWebsite = (!email && url && R.includes(listingType, ['3LINE', '4LINE']))
    || (!email && url && R.includes(listingType, ['3LINE']))
    || (url && R.includes(listingType, ['4LINE']))
    || (!secondaryNumber?.areaCode && R.includes(listingType, ['3LINE']))
    || (!secondaryNumber?.areaCode && !email && R.includes(listingType, ['2LINE']));

  return (
    <Flex>
      <Book listingType={listingType}>
        <Preview listingType={listingType} maxWidth="370px">
          {/* All Listings include name, address and primary phone nunmber */}
          <Box>
            <Text as="h3">{name}</Text>
          </Box>
          <Box>
            <Text as="p">{formatAddress(address, true)}</Text>
            <span>..............................................................................................................................................................</span>
            <Text as="p">0{primaryNumber.areaCode}{primaryNumber.number}</Text>
          </Box>
          {displaySecondaryNumber && (
            <Box>
              <Text as="p">{getSecondaryNumberType(secondaryNumber?.areaCode)}</Text>
              <span>..............................................................................................................................................................</span>
              <Text as="p">0{secondaryNumber.areaCode}{secondaryNumber.number}</Text>
            </Box>
          )}
          {displayEmail && (
            <Box>
              <Text as="p">Email</Text>
              <span>..............................................................................................................................................................</span>
              <Text as="p">{email || '---'}</Text>
            </Box>
          )}
          {displayWebsite && (
            <Box>
              <Text as="p">Website</Text>
              <span>..............................................................................................................................................................</span>
              <Text as="p">{siteAddress}</Text>
            </Box>
          )}
        </Preview>
      </Book>
    </Flex>
  );
};

ListingPreview.defaultProps = {
  email: '',
  secondaryNumber: undefined,
  url: '',
};

ListingPreview.propTypes = {
  listingType: PropTypes.string.isRequired,
  address: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  primaryNumber: PropTypes.shape({
    areaCode: PropTypes.number,
    number: PropTypes.number,
  }).isRequired,
  secondaryNumber: PropTypes.shape({
    areaCode: PropTypes.number,
    number: PropTypes.number,
  }),
  email: PropTypes.string,
  url: PropTypes.string,
};

export default ListingPreview;
