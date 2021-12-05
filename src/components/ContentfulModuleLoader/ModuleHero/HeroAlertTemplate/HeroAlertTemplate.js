import { withTheme } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';

import Button from '../../../Button';
import { parseMd, getProportionalHeight } from '../../../../util';

import {
  Background, Container, Content, Description, ButtonWrapper, Alert,
} from './Styled';

const HeroAlertTemplate = ({
  reference,
  title: rawTitle,
  backgroundColor,
  titleSub: rawTitleSub,
  description: rawDescription,
  image,
  callToActionButton,
  callToActionButtonUrl,
  callToActionSecondary,
  callToActionSecondaryUrl,
}) => {
  const title = parseMd(rawTitle);
  const subtitle = parseMd(rawTitleSub);
  const description = parseMd(rawDescription);

  return (
    <Background color={backgroundColor}>
      <Alert>
        <span>COVID-19 Update</span>
        <p>We’re working hard to find the best ways to help you and your customers through these uncertain times. If you need urgent assistance contact our team on <a href="tel:0800 803 803">0800 803 803</a>.</p>
      </Alert>
      <Container
        as="section"
        id={slugify(reference, { lower: true })}
        backgroundImage={image}
        minHeightOnBrowser={image && image.file && (getProportionalHeight({
          targetWidth: 640,
          initialWidth: image.file.details.image.width,
          initialHeight: image.file.details.image.height,
        }))}
      >
        <Content>

          {title && (
            <h1>{title}</h1>
          )}
          {subtitle && (
            <h2>{subtitle}</h2>
          )}
          {description && (
            <Description>{description}</Description>
          )}
          <ButtonWrapper>
            {callToActionButton && (
              <Button href={callToActionButtonUrl}>
                {callToActionButton}
              </Button>
            )}
            {callToActionSecondary && (
              <Button variant="secondary" href={callToActionSecondaryUrl}>
                {callToActionSecondary}
              </Button>
            )}
          </ButtonWrapper>
        </Content>
      </Container>
    </Background>
  );
};
HeroAlertTemplate.defaultProps = {
  reference: '',
  title: {
    title: '',
  },
  backgroundColor: '#FFFFFF',
  titleSub: {
    titleSub: '',
  },
  description: {
    description: '',
  },
  image: null,
  callToActionButton: '',
  callToActionButtonUrl: '',
  callToActionSecondary: '',
  callToActionSecondaryUrl: '',
};

HeroAlertTemplate.propTypes = {
  reference: PropTypes.string,
  title: PropTypes.shape({
    title: PropTypes.string,
  }),
  backgroundColor: PropTypes.string,
  titleSub: PropTypes.shape({
    titleSub: PropTypes.string,
  }),
  description: PropTypes.shape({
    description: PropTypes.string,
  }),
  image: PropTypes.shape({
    file: PropTypes.shape({
      url: PropTypes.string,
      details: PropTypes.shape({
        image: PropTypes.shape({
          width: PropTypes.number,
          height: PropTypes.number,
        }),
      }),
    }),
    description: PropTypes.string,
  }),
  callToActionButton: PropTypes.string,
  callToActionButtonUrl: PropTypes.string,
  callToActionSecondary: PropTypes.string,
  callToActionSecondaryUrl: PropTypes.string,
};

export default withTheme(HeroAlertTemplate);
