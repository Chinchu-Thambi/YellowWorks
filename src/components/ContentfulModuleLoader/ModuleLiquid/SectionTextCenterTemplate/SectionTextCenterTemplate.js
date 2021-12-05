import { withTheme } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';

import Button from '../../../Button';
import { parseMd, theme } from '../../../../util';

import { Container } from '../../ContenfulModules.styled';

import {
  Background, Content, Description,
} from './Styled';

const SectionTextCenterTemplate = ({
  reference,
  title: rawTitle,
  description: rawDescription,
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
        <Content>
          {title && (
            <h1>{title}</h1>
          )}
          <Description>{description}</Description>
          {callToActionButton && (
            <Button href={callToActionButtonUrl}>
              {callToActionButton}
            </Button>
          )}
        </Content>
      </Container>
    </Background>
  );
};
SectionTextCenterTemplate.defaultProps = {
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

SectionTextCenterTemplate.propTypes = {
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

export default withTheme(SectionTextCenterTemplate);
