import { withTheme } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import slugify from 'slugify';

import Button from '../../../Button';
import { parseMd, theme } from '../../../../util';

import {
  Background, Content, Container,
} from '../../ContenfulModules.styled';

const SeparatorCentralImageTemplate = ({
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
    <Background backgroundColor={backgroundColor}>
      <Container
        as="section"
        id={slugify(reference, { lower: true })}
      >
        <Content>
          {title && (
            <h2>{title}</h2>
          )}
          {description && (
            <span>{description}</span>
          )}
          {image && image.file && (
            <img
              src={`${image.file.url}?w=440`}
              alt={image.description}
            />
          )}
          {(callToActionButton) && (
            <Flex justifyContent={['space-evenly', null, null, 'left']}>
              {callToActionButton && (
                <Button href={callToActionButtonUrl}>
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

SeparatorCentralImageTemplate.defaultProps = {
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

SeparatorCentralImageTemplate.propTypes = {
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

export default withTheme(SeparatorCentralImageTemplate);
