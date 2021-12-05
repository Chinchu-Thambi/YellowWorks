import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import slugify from 'slugify';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { mediaBreakpointUp, theme } from '../../../util';

import ModuleHero from '../ModuleHero';

const SliderWrapper = styled.div`
.carousel .slide {
  background-color: transparent;
  text-align: left;
}

.carousel .control-dots {
  bottom: 0;
  top: unset;

  .dot {
    border: 1px solid ${theme.palette.contrast[0]};

    &.selected {
      background: ${theme.palette.contrast[0]};
    }
  }
}

.carousel.carousel-slider .control-arrow {
  background: ${theme.palette.contrast[0]};
  width: 40px;
  height: 40px;
  top: calc(25% - 25px);
  opacity: .75;
  border-radius: 20px;
  line-height: 16px;
  margin: 5px;

${mediaBreakpointUp('lg')} {
  top: calc(90% - 25px);
  margin: 20px;
}
}

.carousel .control-prev.control-arrow:before {
  position: relative;
  top: -1px;
  left: -2px;
}

.carousel .control-next.control-arrow:before {
  position: relative;
  top: -1px;
  right: -2px;
}
`;

const ModuleCarousel = (props) => {
  const { reference, interval, slides } = props;

  return (
    <SliderWrapper>
      <Carousel
        id={slugify(reference, { lower: true })}
        // autoPlay
        stopOnHover
        dynamicHeight
        // infiniteLoop
        useKeyboardArrows
        showThumbs={false}
        emulateTouch
        swipeable
        interval={interval * 1000}
      >
        {slides && (
          slides.map((moduleProps, index) => (
            <ModuleHero
              key={moduleProps.name || index}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...moduleProps}
            />
          ))
        )}
      </Carousel>
    </SliderWrapper>
  );
};

ModuleCarousel.defaultProps = {
  reference: '',
  interval: 3,
};

ModuleCarousel.propTypes = {
  reference: PropTypes.string,
  interval: PropTypes.number,
  slides: PropTypes.arrayOf(
    PropTypes.shape({
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
    }),
  ).isRequired,
};

export default withTheme(ModuleCarousel);
