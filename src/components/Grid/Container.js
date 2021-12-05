import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass/styled-components';
import styled, { withTheme } from 'styled-components';
import { mediaBreakpointUp } from '../../util';

export const BaseContainer = styled(Box)`
  color: ${({ theme }) => theme.palette.contrast[0]};
  padding-left: ${({ theme }) => theme.space[2]};
  padding-right: ${({ theme }) => theme.space[2]};
  margin-bottom: 0;

  img {
    max-width: 90vw;
  }

  ${mediaBreakpointUp('sm')} {
    margin-left: auto;
    margin-right: auto;
    padding: ${({ theme }) => theme.space[3]} 0;
  }

    
  ${mediaBreakpointUp('md')} {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const RestrictedContainer = styled(BaseContainer)`
  ${mediaBreakpointUp('xl')} {
    width: ${({ theme }) => theme.containerWidth[4]};
    margin: auto;
  }
`;


const ConstrainedContainer = ({
  ExtendedContainer, theme, children, ...props
}) => {
  const Container = ExtendedContainer || BaseContainer;
  return (
    <Container
      as="section"
      width={theme.containerWidth}
      mx="auto"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Container>
  );
};

ConstrainedContainer.defaultProps = {
  ExtendedContainer: BaseContainer,
  children: [],
};
ConstrainedContainer.propTypes = {
  ExtendedContainer: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]),
  theme: PropTypes.shape({
    containerWidth: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ),
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const Container = withTheme(ConstrainedContainer);

export default Container;
