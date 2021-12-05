/* globals window, document */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import { mediaBreakpointUp } from '../../../util';

import { Container, BaseContainer } from '../../Grid';
import background from './images/picture.png';
import mask from './images/googlemask.svg';
import mobileMask from './images/googleMobileMask.svg';

const ExtendedContainer = styled(BaseContainer)`
  line-height: 2em;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  text-align: center;

  ${mediaBreakpointUp('md')} {
    text-align: left;
  }

  > h2 {
    color: ${({ theme }) => theme.palette.base[0]};
    font-size: ${({ theme }) => theme.fontSizes[4]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin-bottom: 0;
    text-align: center;
    padding-bottom: ${({ theme }) => theme.space[4]};

    ${mediaBreakpointUp('md')} {
      font-size: ${({ theme }) => theme.fontSizes[5]};
    }

    > strong {
      font-weight: ${({ theme }) => theme.fontWeight[1]};
    }
  }
`;

const Content = styled.div`
  color: ${({ theme }) => theme.palette.base[0]};
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space[4]};

  ${mediaBreakpointUp('md')} {
    flex-direction: row;

    > p {
      margin: 0 0 0 ${({ theme }) => theme.space[3]};
    }
  }
`;

const Background = styled.div`
  background-color: ${({ theme }) => theme.palette.base[1]};
`;

const ImageMask = styled.div`
  background-color: ${({ theme }) => theme.palette.base[0]};
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  min-height: 580px;
  display: flex;
  align-items: center;
  mask: url(${mobileMask}) top left / cover;

  ${mediaBreakpointUp('md')} {
    mask: url(${mask}) top left / cover;
  }
`;

const loadPartnerBadge = () => {
  if (window.gapi === undefined) {
    const script = document.createElement('script');
    script.async = false;
    script.src = 'https://apis.google.com/js/platform.js';

    document.getElementsByTagName('body')[0].appendChild(script);
  }
};

class GooglePartner extends React.Component {
  componentDidMount() {
    loadPartnerBadge();
  }

  render() {
    const {
      theme,
    } = this.props;

    return (
      <Background>
        <ImageMask>
          <Container ExtendedContainer={ExtendedContainer} as="section" width={theme.containerWidth}>
            <h2>
              We&apos;re pretty good at this
            </h2>
            <Content>
              <div className="g-partnersbadge" data-agency-id="2298579190" />
              <p>
                We are an award winning Google Premier Partner and our team of
                NZ-based analysts are the best at growing business online in
                Australasia. Let us take care of your search marketing and
                get the results you want!
              </p>
            </Content>
          </Container>
        </ImageMask>
      </Background>
    );
  }
}

GooglePartner.defaultProps = {};

GooglePartner.propTypes = {
  theme: PropTypes.shape({
    containerWidth: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ),
    space: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ),
  }).isRequired,
};

export default withTheme(GooglePartner);
