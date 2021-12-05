import { withTheme } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import slugify from 'slugify';

import Button from '../../../Button';
import { parseMd } from '../../../../util';

import {
  Background, Container, Content, Description, MobileFade,
} from './Styled';

const FullImageLeftTemplate = ({
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
    <Background image={image} color={backgroundColor}>
      <MobileFade>
        <Container
          as="section"
          id={slugify(reference, { lower: true })}
        >
          <Content>
            {title && (
              <h1>{title}</h1>
            )}
            {subtitle && (
              <h2>{subtitle}</h2>
            )}
            <Description>{description}</Description>
            {(callToActionButton || callToActionSecondary) && (
              <Flex justifyContent={['space-evenly', null, null, 'left']}>
                {callToActionButton && (
                  <Button href={callToActionButtonUrl} variant="tertiary" outline="true">
                    {callToActionButton}
                  </Button>
                )}
                {callToActionSecondary && (
                  <Button variant="tertiary" outline="true" href={callToActionSecondaryUrl}>
                    {callToActionSecondary}
                  </Button>
                )}
              </Flex>
            )}
          </Content>
        </Container>
      </MobileFade>
    </Background>
  );
};
FullImageLeftTemplate.defaultProps = {
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

FullImageLeftTemplate.propTypes = {
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

export default withTheme(FullImageLeftTemplate);
