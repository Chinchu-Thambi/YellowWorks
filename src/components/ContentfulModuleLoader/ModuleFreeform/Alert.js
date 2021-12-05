import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

import { Container } from '../../Grid';
import { mediaBreakpointUp, theme, parseMd } from '../../../util';

const Background = styled.div`
  background: ${theme.palette.brand[0]};
  padding: 1px;
`;

const AlertWrapper = styled.div`
  color: ${theme.palette.contrast[0]};
  text-align: center;
  padding: ${theme.space[3]};

  ${mediaBreakpointUp('lg')} {
    padding: 0;
  }

  > span { 
    font-weight: ${theme.fontWeights.bold};
    font-size: ${theme.fontSizes[4]};
    text-align: center;
    padding: ${theme.space[3]} 0;

    ${mediaBreakpointUp('lg')} {
      font-size: ${theme.fontSizes[5]};
    }
  }

  a {
    color: ${theme.palette.contrast[0]};
  }
`;
const Alert = ({
  title,
  html: rawHtml,
}) => {
  const html = parseMd(rawHtml);
  return (
    <Background>
      <Container as="section" width={theme.containerWidth}>
        <AlertWrapper>
          <span>{title}</span>
          <p>{html}</p>
        </AlertWrapper>
      </Container>
    </Background>
  );
};

Alert.defaultProps = {};

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
};

export default Alert;
