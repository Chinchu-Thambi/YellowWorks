import { withTheme } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';

import { parseMd } from '../../../../util';
import { Container, Content } from '../../ContenfulModules.styled';

import {
  Background, Mask, Wrapper,
} from './Styled';

const SeparatorWaveBottomGreyTemplate = ({
  reference,
  title: rawTitle,
  text: rawText,
}) => {
  const title = parseMd(rawTitle);
  const description = parseMd(rawText);

  return (
    <Wrapper>
      <Background>
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
      <Mask />
    </Wrapper>
  );
};
SeparatorWaveBottomGreyTemplate.defaultProps = {
  reference: '',
  title: {
    title: '',
  },
  subtitle: {
    subtitle: '',
  },
  text: {
    text: '',
  },
  image: null,
};

SeparatorWaveBottomGreyTemplate.propTypes = {
  reference: PropTypes.string,
  title: PropTypes.shape({
    title: PropTypes.string,
  }),
  subtitle: PropTypes.shape({
    subtitle: PropTypes.string,
  }),
  text: PropTypes.shape({
    text: PropTypes.string,
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

export default withTheme(SeparatorWaveBottomGreyTemplate);
