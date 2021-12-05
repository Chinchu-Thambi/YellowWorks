/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';

import theme from '../../../../../../util/theme';
import ThumbnailGridWithModalView from '../thumbnails/ThumbnailGridWithModalView';
import ReadMoreText from './components/ReadMoreText';
import { UserType, ImageType } from '../ReviewRatings.proptypes';
import Reviewer from '../Reviewer';

const READMORE_WIDTH_TO_SNIPPET_CHARACTER_COUNT_RATIO = 0.6;

const SingleReview = ({
  user, date, text, images, rating, status,
}) => {
  const truncatedCharLength = READMORE_WIDTH_TO_SNIPPET_CHARACTER_COUNT_RATIO * Math.min(window.innerWidth, 767); // TODO don't like this, will likely improve it

  const imagesArray = images?.map((i) => i.image);

  return (
    <Flex flexDirection="column">
      <Flex mb={2}>
        <Reviewer user={user} rating={rating} date={date} label={status} />
      </Flex>
      <Flex flexDirection={['column', 'row']}>
        <Flex flex={1} fontSize={2} color={theme.palette.contrast[2]} lineHeight="1.5" mr={[0, 2]}>
          <ReadMoreText text={text} truncatedCharLength={truncatedCharLength} />
        </Flex>
        {images?.length > 0 && (
          <Flex mt={[2, 0]} ml={[0, 2]} justifyContent={['center', 'right']}>
            <ThumbnailGridWithModalView images={imagesArray} thumbnailSize={75} />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

SingleReview.propTypes = {
  user: UserType,
  date: PropTypes.number,
  text: PropTypes.string,
  images: PropTypes.arrayOf(ImageType),
  rating: PropTypes.number,
  status: PropTypes.string,
};

SingleReview.defaultProps = {
  user: undefined,
  rating: undefined,
  images: undefined,
  status: undefined,
  date: undefined,
  text: '',
};

export default SingleReview;
