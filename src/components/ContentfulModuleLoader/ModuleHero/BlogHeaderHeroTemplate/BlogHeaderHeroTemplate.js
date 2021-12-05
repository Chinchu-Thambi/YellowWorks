import { withTheme } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';

import { parseMd, getProportionalHeight } from '../../../../util';

import { Container } from '../../ContenfulModules.styled';

import {
  Background, Content,
} from './Styled';

const BlogHeaderHeroTemplate = ({
  reference,
  title: rawTitle,
  backgroundColor,
  titleSub: rawTitleSub,
  image,
}) => {
  const title = parseMd(rawTitle);
  const subtitle = parseMd(rawTitleSub);

  return (
    <Background color={backgroundColor}>
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
          {image && image.file && (
            <img
              src={`${image.file.url}?w=640`}
              alt={image.description}
              title={image.description}
              width={640}
              height={(getProportionalHeight({
                targetWidth: 640,
                initialWidth: image.file.details.image.width,
                initialHeight: image.file.details.image.height,
              }))}
            />
          )}
        </Content>
      </Container>
    </Background>
  );
};
BlogHeaderHeroTemplate.defaultProps = {
  reference: '',
  title: {
    title: '',
  },
  backgroundColor: '#FFFFFF',
  titleSub: {
    titleSub: '',
  },
  image: null,
};

BlogHeaderHeroTemplate.propTypes = {
  reference: PropTypes.string,
  title: PropTypes.shape({
    title: PropTypes.string,
  }),
  backgroundColor: PropTypes.string,
  titleSub: PropTypes.shape({
    titleSub: PropTypes.string,
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
};

export default withTheme(BlogHeaderHeroTemplate);
