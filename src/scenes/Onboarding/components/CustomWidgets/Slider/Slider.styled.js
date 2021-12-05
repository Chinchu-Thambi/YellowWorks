import styled from 'styled-components';
import theme from '../../../../../util/theme';
import thumbBubble from '../../../../../assets/shapes/thumbBubble.svg';
import { mediaBreakpointUp } from '../../../../../util';

export const Tooltip = styled.div`
  background-image: url(${thumbBubble});
  color: #fff;
  height: 40px;
  width: 40px;
  position: absolute;
  top: -10px;
  font-size: ${theme.fontSizes[2]};
`;

export const SliderWrapper = styled.div`
  padding: ${theme.space[2]} ${theme.space[3]} ${theme.space[6]};

  ${mediaBreakpointUp('lg')} {
    padding: ${theme.space[7]} 0;
  }

  .rc-slider {
    position: relative;
    height: 14px;
    padding: 5px 0;
    width: 100%;
    border-radius: 10px;
  }

  .rc-slider-rail {
    position: absolute;
    width: 100%;
    background-color: ${theme.palette.contrast[4]};
    height: 10px;
    border-radius: 10px;
  }

  .rc-slider-track {
    position: absolute;
    left: 0;
    border-radius: 10px;
    background-color: ${theme.palette.contrast[0]};
    height: 10px;
  }
  .rc-slider-handle {
    position: absolute;
    background-color: ${theme.palette.contrast[0]};
    border-color: ${theme.palette.contrast[0]};
    height: 30px;
    width: 30px;
    top: -25%;
    margin-top: 0;
    cursor: grab;
    border-radius: 50%;
    z-index: 100;
  }
  
  .rc-slider-mark {
    position: absolute;
    top: 18px;
    left: 0;
    width: 100%;
    font-size: 12px;
  }

  .rc-slider-step {
    position: absolute;
    width: 100%;
    height: 4px;
    background: transparent;
  }

  .rc-slider-tooltip {
    position: absolute;
    left: -9999px;
    top: -9999px;
    visibility: visible;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .rc-slider-tooltip * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

.rc-slider-mark-text {
  position: absolute;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  color: #999;

  strong {
    display: block;
  }
}


.rc-slider-mark-text {
    display: none;
  }

  .rc-slider-mark > span:first-child, .rc-slider-mark > span:last-child {
    display: inline-block;
  }

.rc-slider-mark-text-active {
  color: #666;
}
.rc-slider-step {
  position: absolute;
  width: 100%;
  height: 4px;
  background: transparent;
}
.rc-slider-dot {
  display: none;
}
.rc-slider-tooltip-zoom-down-enter,
.rc-slider-tooltip-zoom-down-appear {
  animation-duration: .3s;
  animation-fill-mode: both;
  display: block !important;
  animation-play-state: paused;
}
.rc-slider-tooltip-zoom-down-leave {
  animation-duration: .3s;
  animation-fill-mode: both;
  display: block !important;
  animation-play-state: paused;
}
.rc-slider-tooltip-zoom-down-enter.rc-slider-tooltip-zoom-down-enter-active,
.rc-slider-tooltip-zoom-down-appear.rc-slider-tooltip-zoom-down-appear-active {
  animation-name: rcSliderTooltipZoomDownIn;
  animation-play-state: running;
}
.rc-slider-tooltip-zoom-down-leave.rc-slider-tooltip-zoom-down-leave-active {
  animation-name: rcSliderTooltipZoomDownOut;
  animation-play-state: running;
}
.rc-slider-tooltip-zoom-down-enter,
.rc-slider-tooltip-zoom-down-appear {
  transform: scale(0, 0);
  animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
}
.rc-slider-tooltip-zoom-down-leave {
  animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
}
.rc-slider-tooltip {
  position: absolute;
  left: -9999px;
  top: -9999px;
  visibility: visible;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  span {
    display: block;
  }
}
.rc-slider-tooltip * {
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.rc-slider-tooltip-content > .rc-slider-tooltip-arrow {
    border-top-color: #1f2a44;
    bottom: 0px;
    left: 50%;
    margin-left: -10px;
    border-width: 10px 10px 0;
}

.rc-slider-tooltip-content .rc-slider-tooltip-inner {
  padding: ${theme.space[2]};
  
  ${mediaBreakpointUp('lg')} {
    padding: ${theme.space[2]} ${theme.space[4]};
  }
}
`;

export const ThumbBubble = styled.div`
  background-image: url(${thumbBubble});
  color: #fff;
  height: 40px;
  width: 40px;
  position: absolute;
  top: -10px;
  font-size: ${theme.fontSizes[2]};
`;
