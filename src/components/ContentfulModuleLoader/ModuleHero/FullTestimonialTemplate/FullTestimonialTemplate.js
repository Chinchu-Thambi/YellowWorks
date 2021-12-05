import { withTheme } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import slugify from 'slugify';

import { parseMd } from '../../../../util';

import quoteIcon from '../../../../assets/icons/quoteIcon.svg';

import {
  Background, Container, Content, Description, Card, Quote, RightColumn,
} from './Styled';

const FullTestimonialTemplate = ({
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
      <Container
        as="section"
        id={slugify(reference, { lower: true })}
      >
        <RightColumn>
          <Card>
            {title && (
              <h1>{title}</h1>
            )}
            {image && image.file && (
              <img
                src={`${image.file.url}`}
                alt={image.description}
              />
            )}
          </Card>
          {subtitle && (
            <Quote>
              <div>
                <img src={quoteIcon} alt="Quote Icon" />
                {subtitle}
              </div>
            </Quote>
          )}
        </RightColumn>
        <Content>
          <Description>{description}</Description>
          {(callToActionButton || callToActionSecondary) && (
            <Flex justifyContent={['space-evenly', null, null, 'left']}>
              {callToActionButton && (
                <a href={callToActionButtonUrl}>
                  {callToActionButton}
                </a>
              )}
              {callToActionSecondary && (
                <a href={callToActionSecondaryUrl}>
                  {callToActionSecondary}
                </a>
              )}
            </Flex>
          )}
        </Content>
      </Container>
    </Background>
  );
};
FullTestimonialTemplate.defaultProps = {
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

FullTestimonialTemplate.propTypes = {
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

export default withTheme(FullTestimonialTemplate);
