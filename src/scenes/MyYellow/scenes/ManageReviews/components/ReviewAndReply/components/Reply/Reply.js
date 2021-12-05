import React from 'react';
import { Flex } from 'rebass/styled-components';

import theme from '../../../../../../../../util/theme';

import SingleReview from '../../../SingleReview';
import { ResponseType } from '../../../ReviewRatings.proptypes';

const Reply = ({ reply }) => {
  const businessUser = {
    displayName: 'Response from the owner',
    avatar: null,
  };

  return (
    <Flex
      backgroundColor={theme.palette.contrast[5]}
      pl={[3, 7]}
      pr={[3, 4, 4]}
      py={[3, 4, 4]}
      flexDirection="column"
    >
      <SingleReview
        user={businessUser}
        text={reply.text}
        date={reply.created}
        status={reply.status === 'MOD' ? 'Pending Approval' : ''}
      />
      {/* // TODO enable once editing and deletion of replies is supported */}
      {/* <Flex mt={3} flexDirection={['column', 'row']} sx={{ gridGap: 2 }}>
      <Button size="sm" variant="secondary" style={{ border: `1px solid ${theme.palette.contrast[3]}` }}>
        Edit
      </Button>
      <Button size="sm" variant="secondary" style={{ border: `1px solid ${theme.palette.contrast[3]}` }}>
        Delete
      </Button>
    </Flex> */}
    </Flex>
  );
};

Reply.propTypes = {
  reply: ResponseType.isRequired,
};

export default Reply;
