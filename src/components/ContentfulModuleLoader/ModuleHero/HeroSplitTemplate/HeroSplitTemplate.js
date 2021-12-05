import { withTheme } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';

import Button from '../../../Button';
import { parseMd, getProportionalHeight } from '../../../../util';

import { Container } from '../../ContenfulModules.styled';

import {
  Background, Content, ImageWrapper, HeaderWrapper,
} from './Styled';

const HeroSplitTemplate = ({
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
  customFields,
}) => {
  const backgroundWhite = backgroundColor === '#FFFFFF' ? 'secondary' : undefined;

  const title = parseMd(rawTitle);
  const subtitle = parseMd(rawTitleSub);
  const description = parseMd(rawDescription);

  const jsonPropsRaw = customFields?.internal?.content || '{}';
  const jsonProps = JSON.parse(jsonPropsRaw);

  return (
    <Background
      color={backgroundColor}
      minHeightOnBrowser={image && image.file && ((getProportionalHeight({
        targetWidth: 640,
        initialWidth: image.file.details.image.width,
        initialHeight: image.file.details.image.height,
      })) + 60)}
    >
      {title && (
        <HeaderWrapper>
          <h1>{title}</h1>
        </HeaderWrapper>
      )}
      <Container
        as="section"
        id={slugify(reference, { lower: true })}
      >
        <Content>
          {jsonProps?.titleLeft && (
            <h1>{jsonProps.titleLeft}</h1>
          )}
          {subtitle && (
            <p>{subtitle}</p>
          )}
          <div>
            {callToActionButton && (
              <Button variant={backgroundWhite} href={callToActionButtonUrl}>
                {callToActionButton}
              </Button>
            )}
          </div>
        </Content>
        <ImageWrapper>
          {image?.file
            ? (
              <img
                src={image.file.url}
                alt={image.description}
              />
            )
            : null}
        </ImageWrapper>
        <Content>
          {jsonProps?.titleRight && (
            <h1>{jsonProps.titleRight}</h1>
          )}
          {description && (
            <p>{description}</p>
          )}
          <div>
            {callToActionSecondary && (
              <Button variant={backgroundWhite} href={callToActionSecondaryUrl}>
                {callToActionSecondary}
              </Button>
            )}
            {image && image.file
              ? (
                <img
                  src={image.file.url}
                  alt={image.description}
                />
              )
              : null}
          </div>
        </Content>
      </Container>
    </Background>
  );
};
HeroSplitTemplate.defaultProps = {
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
  customFields: {},
};

HeroSplitTemplate.propTypes = {
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
  customFields: PropTypes.shape({
    internal: PropTypes.shape({
      content: PropTypes.string,
    }),
  }),
};

export default withTheme(HeroSplitTemplate);
