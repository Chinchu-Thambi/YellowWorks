import { withTheme } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';
import { Box, Flex } from 'rebass/styled-components';

import { Container } from '../../ContenfulModules.styled';
import Button from '../../../Button';
import { parseMd, getProportionalHeight } from '../../../../util';

import {
  Background, Content, Description, ImageWrapper,
} from './Styled';

const HeroLiquidLeftTemplate = ({
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
    <Background
      color={backgroundColor}
      minHeightOnBrowser={image && image.file && ((getProportionalHeight({
        targetWidth: 640,
        initialWidth: image.file.details.image.width,
        initialHeight: image.file.details.image.height,
      })) + 60)}
    >
      <Container
        as="section"
        id={slugify(reference, { lower: true })}
      >
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
          {title && (
            <h1>{title}</h1>
          )}
          {subtitle && (
            <h2>{subtitle}</h2>
          )}
          {description && (
            <Description>{description}</Description>
          )}
          <div>
            {image && image.file
              ? (
                <img
                  src={image.file.url}
                  alt={image.description}
                />
              )
              : null}
            <Flex flexDirection={['column', null, null, 'row']}>
              {callToActionButton && (
                <Button href={callToActionButtonUrl}>
                  {callToActionButton}
                </Button>
              )}
              {callToActionSecondary && (
                <Box as="div" mt={[2, 2, 2, 0]}>
                  <Button variant="secondary" outline="true" href={callToActionSecondaryUrl}>
                    {callToActionSecondary}
                  </Button>
                </Box>
              )}
            </Flex>
          </div>
        </Content>
      </Container>
    </Background>
  );
};
HeroLiquidLeftTemplate.defaultProps = {
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

HeroLiquidLeftTemplate.propTypes = {
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

export default withTheme(HeroLiquidLeftTemplate);
