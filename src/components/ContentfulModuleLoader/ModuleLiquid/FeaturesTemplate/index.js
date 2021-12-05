import { withTheme } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import slugify from 'slugify';

import Button from '../../../Button';
import { parseMd, theme } from '../../../../util';

import {
  Background, Container, Content, Description, ImageStack,
  HeaderWrapper, BaseLayer, ImageLayer,
} from './AquaLeftLiquidTemplateStyled';

const AquaLeftLiquidTemplate = ({
  reference,
  title: rawTitle,
  description: rawDescription,
  image,
  callToActionButton,
  callToActionButtonUrl,
  backgroundColor,
}) => {
  const title = parseMd(rawTitle);
  const description = parseMd(rawDescription);

  return (
    <Background color={backgroundColor}>
      <Container
        as="section"
        id={slugify(reference, { lower: true })}
      >
        <ImageStack>
          <BaseLayer />
          <ImageLayer image={image} />
        </ImageStack>
        <Content>
          <HeaderWrapper>
            {title && (
              <h1>{title}</h1>
            )}
          </HeaderWrapper>

          <Description>{description}</Description>
          {(callToActionButton) && (
            <Flex justifyContent={['space-evenly', null, null, 'left']}>
              {callToActionButton && (
                <Button href={callToActionButtonUrl} variant="secondary">
                  {callToActionButton}
                </Button>
              )}
            </Flex>
          )}
        </Content>
      </Container>
    </Background>
  );
};
AquaLeftLiquidTemplate.defaultProps = {
  reference: '',
  title: {
    title: '',
  },
  description: {
    description: '',
  },
  image: null,
  callToActionButton: '',
  callToActionButtonUrl: '',
  backgroundColor: theme.palette.base[0],
};

AquaLeftLiquidTemplate.propTypes = {
  reference: PropTypes.string,
  title: PropTypes.shape({
    title: PropTypes.string,
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
  backgroundColor: PropTypes.string,
};

export default withTheme(AquaLeftLiquidTemplate);
