import { withTheme } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';

import linkedin from '../../../../assets/icons/linkedin.svg';
import { parseMd, theme, getProportionalHeight } from '../../../../util';

import { Container } from '../../ContenfulModules.styled';

import {
  Background, Content, Description,
} from './Styled';

const SectionProfileLeftTemplate = ({
  reference,
  title: rawTitle,
  description: rawDescription,
  image,
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
        {image && image.file && (
          <div>
            <img
              src={`${image.file.url}?w=440`}
              alt={image.description}
              title={image.description}
              width={440}
              height={getProportionalHeight({
                targetWidth: 440,
                initialWidth: image.file.details.image.width,
                initialHeight: image.file.details.image.height,
              })}
            />
          </div>
        )}
        <Content>
          {title && (
            <h1>{title}</h1>
          )}
          <Description>{description}</Description>
          {(callToActionButtonUrl) && (
            <a href={callToActionButtonUrl}>
              <img
                src={linkedin}
                alt="Linked In Profile"
                width="30px"
                height="30px"
              />
            </a>
          )}
        </Content>
      </Container>
    </Background>
  );
};
SectionProfileLeftTemplate.defaultProps = {
  reference: '',
  title: {
    title: '',
  },
  description: {
    description: '',
  },
  image: null,
  callToActionButtonUrl: '',
  backgroundColor: theme.palette.base[0],
};

SectionProfileLeftTemplate.propTypes = {
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
  callToActionButtonUrl: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default withTheme(SectionProfileLeftTemplate);
