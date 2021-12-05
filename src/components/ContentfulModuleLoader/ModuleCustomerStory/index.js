import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import slugify from 'slugify';
import { navigate } from '@reach/router';

import { Container } from '../../Grid';
import adaptContentfulColorToTheme from '../services/adaptContentfulColorToTheme';
import circularArrowButton from '../../../assets/icons/circularArrowButton.svg';
import { parseMd } from '../../../util';

const Background = styled.div`
  background: ${({ topColor, bottomColor }) => `linear-gradient(to bottom, ${topColor} 50%, ${bottomColor} 50%)`};
`;

const ModuleCustomerStory = (props) => {
  const {
    reference,
    description: rawDescription,
    title: rawTitle,
    image,
    targetUrl,
    topBackgroundColor,
    bottomBackgroundColor,
  } = props;

  const title = parseMd(rawTitle);
  const description = parseMd(rawDescription);

  return (
    <Background
      id={slugify(reference)}
      topColor={adaptContentfulColorToTheme(topBackgroundColor)}
      bottomColor={adaptContentfulColorToTheme(bottomBackgroundColor)}
      className="p-4"
    >
      <Container
        as="section"
        id={slugify(reference, { lower: true })}
      >
        <div
          className="flex flex-row lg:min-h-12 bg-brand-600 rounded-lg shadow-sm text-contrast-500 justify-between w-full h-full sm:space-y-0 sm:space-x-2.5 p-3 lg:w-3/4 xl:w-1/2 lg:rounded-full lg:m-auto lg:px-3"
        >
          {image && (
            <picture className="hidden lg:block max-h-13 max-w-11 object-contain rounded-full overflow-hidden border-3 border-solid border-brand-600 shadow-sm flex items-center justify-center bg-white">
              <img src={image.file?.url} alt={image.description} className="object-cover h-full w-full" />
            </picture>
          )}
          <div className="flex flex-col justify-center lg:space-y-2.5 lg:space-x-0">
            {title && <p className="text-lg m-0 text-contrast-600">{title}</p>}
            <div className="flex space-x-3 lg:space-x-0">
              {image && (
                <picture className="lg:hidden w-7 min-w-7 h-7 rounded-full overflow-hidden border-3 border-solid border-brand-600 shadow-sm flex items-center justify-center bg-white">
                  <img src={image.file?.url} alt={image.description} className="object-cover h-full w-full" />
                </picture>
              )}
              {description && <p className="w-full text-sm text-contrast-600">{description}</p>}
            </div>
          </div>
          {targetUrl && (
            <div className="flex lg:flex-grow justify-end">
              <button type="button" onClick={() => navigate(targetUrl)} className="cursor-pointer bg-transparent" aria-label="Arrow button to read more">
                <img
                  src={circularArrowButton}
                  alt="Read more"
                />
              </button>
            </div>
          )}
        </div>
      </Container>
    </Background>
  );
};

ModuleCustomerStory.defaultProps = {
  reference: '',
  title: {
    title: '',
  },
  description: {
    description: '',
  },
  image: null,
  targetUrl: '',
  topBackgroundColor: 'White',
  bottomBackgroundColor: 'White',
};

ModuleCustomerStory.propTypes = {
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
  targetUrl: PropTypes.string,
  topBackgroundColor: PropTypes.string,
  bottomBackgroundColor: PropTypes.string,
};

export default withTheme(ModuleCustomerStory);
