import { withTheme } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';

import { parseMd, theme } from '../../../../util';
import { Container, Content } from '../../ContenfulModules.styled';

import {
  Background,
} from './Styled';

const SeparatorTestimonialTemplate = ({
  reference,
  title: rawTitle,
  description: rawDescription,
  image,
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
        <Content>
          {image && image.file && (
            <img
              src={`${image.file.url}?h=180`}
              alt={image.description}
            />
          )}
          {title && (
            <h1>{title}</h1>
          )}
          {description && (
            <span>{description}</span>
          )}
        </Content>
      </Container>
    </Background>
  );
};

SeparatorTestimonialTemplate.defaultProps = {
  reference: '',
  title: {
    title: '',
  },
  description: {
    description: '',
  },
  image: null,
  backgroundColor: theme.palette.base[0],
};

SeparatorTestimonialTemplate.propTypes = {
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
  backgroundColor: PropTypes.string,
};

export default withTheme(SeparatorTestimonialTemplate);
