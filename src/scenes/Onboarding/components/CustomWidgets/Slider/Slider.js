/* eslint-disable react/jsx-props-no-spreading */
/* globals document */

import React from 'react';
import PropTypes from 'prop-types';
import rcSlider, { createSliderWithTooltip } from 'rc-slider';
import { SliderWrapper } from './Slider.styled';

const SliderWithTooltip = createSliderWithTooltip(rcSlider);

const Slider = (props) => (
  <SliderWrapper data-id="sliderWrapper">
    <SliderWithTooltip
      {...props}
      tipProps={{
        prefixCls: 'rc-slider-tooltip',
        visible: true,
        getTooltipContainer: () => document.querySelector('div[data-id=sliderWrapper]'),
      }}
    />
  </SliderWrapper>
);

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  defaultValue: PropTypes.number,
  tipFormatter: PropTypes.func,
  step: PropTypes.number,
  marks: PropTypes.shape({}),
};

Slider.defaultProps = {
  min: 1,
  max: 1000,
  defaultValue: 50,
  tipFormatter: () => null,
  step: 1,
  marks: {},
};

export default Slider;
