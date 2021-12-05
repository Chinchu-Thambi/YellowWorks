import { withTheme } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';

import { parseMd } from '../../../../util';
import { Container, Content } from '../../ContenfulModules.styled';

import {
  Background,
} from './Styled';

const SeparatorStraightTemplate = ({
  reference,
  title: rawTitle,
  description: rawDescription,
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
SeparatorStraightTemplate.defaultProps = {
  reference: '',
  title: {
    title: '',
  },
  description: {
    description: '',
  },
  image: null,
  backgroundColor: '#FFFFFF',
};

SeparatorStraightTemplate.propTypes = {
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

export default withTheme(SeparatorStraightTemplate);
