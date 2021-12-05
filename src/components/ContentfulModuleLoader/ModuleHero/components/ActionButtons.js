import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import Button from '../../../Button';

const ActionButtons = ({
  colorSet,
  callToActionButton,
  callToActionButtonUrl,
  callToActionSecondary,
  callToActionSecondaryUrl,
}) => (
  <Flex flexDirection={['column', null, null, 'row']}>
    {callToActionButton && (
    <Button
      className={`bg-${colorSet.inverse?.background} text-${colorSet.inverse?.text}`}
      href={callToActionButtonUrl}
    >
      {callToActionButton}
    </Button>
    )}
    {callToActionSecondary && (
    <Box as="div" mt={[2, 2, 2, 0]}>
      <Button
        className={`bg-${colorSet.main} text-${colorSet.text} border-${colorSet.text}`}
        href={callToActionSecondaryUrl}
        outline="true"
      >
        {callToActionSecondary}
      </Button>
    </Box>
    )}
  </Flex>
);

ActionButtons.defaultProps = {
  callToActionButton: '',
  callToActionButtonUrl: '',
  callToActionSecondary: '',
  callToActionSecondaryUrl: '',
  colorSet: {},
};

ActionButtons.propTypes = {
  callToActionButton: PropTypes.string,
  callToActionButtonUrl: PropTypes.string,
  callToActionSecondary: PropTypes.string,
  callToActionSecondaryUrl: PropTypes.string,
  colorSet: PropTypes.shape({
    main: PropTypes.string,
    text: PropTypes.string,
    inverse: PropTypes.shape({
      main: PropTypes.string,
      text: PropTypes.string,
    }),
  }),
};

export default ActionButtons;
