import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';

import Modal from '../../../../../../components/Modal';
import theme from '../../../../../../util/theme';

import { ReviewType } from '../ReviewRatings.proptypes';

import ReviewReplyCard from './components/ReviewReplyCard';

const ReviewReplyModal = ({ review, onDismiss }) => {
  const [showDialog, setShowDialog] = React.useState(true);
  const close = () => {
    setShowDialog(false);
  };

  return (
    <Modal
      // scrollable // TODO remove once entire modal implementation properly fixed
      isVisible={showDialog}
      onDismiss={() => {
        close();
        onDismiss();
      }}
      style={{
        borderRadius: theme.radii[3],
      }}
    >
      <Flex m="auto" px={0} pt={3}>
        <ReviewReplyCard
          review={review}
          onDismiss={() => {
            onDismiss();
            close();
          }}
        />
      </Flex>
    </Modal>
  );
};

ReviewReplyModal.propTypes = {
  review: ReviewType.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default ReviewReplyModal;
