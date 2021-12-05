import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Text } from 'rebass/styled-components';

import Avatar from '../../../../../../components/Avatar';
import theme from '../../../../../../util/theme';
import { formatDateWithMonthName } from '../../../../../../util/formatting';

import Badge from '../../../../components/Badge';
import StarRating from '../StarRating';

import { UserType } from '../ReviewRatings.proptypes';

const Reviewer = ({
  user, rating, date, label,
}) => (
  <Flex alignItems="center">
    {user?.avatar !== null && (
      <Avatar src={user?.avatar} size={theme.space[6]} mr={2} />
    )}
    <Flex flexDirection="column" alignItems="flex-start" sx={{ gridGap: 1 }}>
      <Text fontSize={2} fontWeight="bold">
        {user?.displayName}
      </Text>
      {rating && <StarRating stars={rating} size="xs" />}
      {date && (
        <Text fontSize={1} color={theme.palette.contrast[2]}>
          {formatDateWithMonthName(new Date(date * 1000))}
        </Text>
      )}
      {label && <Badge text={label} />}
    </Flex>
  </Flex>
);

Reviewer.propTypes = {
  user: UserType,
  date: PropTypes.number, // timestamp in seconds, not ms.
  rating: PropTypes.number,
  label: PropTypes.string,
};

Reviewer.defaultProps = {
  user: undefined,
  rating: undefined,
  label: undefined,
  date: undefined,
};

export default Reviewer;
