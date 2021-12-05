import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import slugify from 'slugify';

import CardLiquidLeftTemplate from './CardLiquidLeftTemplate';
import CardLiquidRightTemplate from './CardLiquidRightTemplate';
import CardLiquidQuotesTemplate from './CardLiquidQuotesTemplate';
import ThreePanelTemplate from './ThreePanelTemplate';
import ThreePanelPlainTemplate from './ThreePanelPlainTemplate';
import CardCarouselTemplate from './CardCarouselTemplate';
import CardSquareTemplate from './CardSquareTemplate';
import CardFourSquareTemplate from './CardFourSquareTemplate';
import CardFourSquareVariationTemplate from './CardFourSquareVariationTemplate';
import SquareFeatureHeaderTemplate from './SquareFeatureHeaderTemplate';
import CardFourLiquidTemplate from './CardFourLiquidTemplate';
import ThreePanelTemplateVariation from './ThreePanelTemplateVariation';
import CardSquareLongFormTemplate from './CardSquareLongFormTemplate';
import ThreePanelYellowButtonTemplate from './ThreePanelYellowButtonTemplate';
import CardFaqTemplate from './CardFaqTemplate';

const availableTemplates = {
  'Card: Carousel': CardCarouselTemplate,
  'Card: 3 Square': CardSquareTemplate,
  'Card: 3 Square - Long Form Text': CardSquareLongFormTemplate,
  'Card: 4 Square': CardFourSquareTemplate,
  'Card: 4 Square Variation': CardFourSquareVariationTemplate,
  'Card: 3 panel': ThreePanelTemplate,
  'Card: 3 panel (Plain Background)': ThreePanelPlainTemplate,
  'Card: 3 panel Variation (Orange Subtitle)': ThreePanelTemplateVariation,
  'Card: 3 panel Variation (Yellow CTA)': ThreePanelYellowButtonTemplate,
  'Card: Liquid Left': CardLiquidLeftTemplate,
  'Card: Liquid Right': CardLiquidRightTemplate,
  'Card: Liquid Quotes': CardLiquidQuotesTemplate,
  'Card: Header Image Feature': SquareFeatureHeaderTemplate,
  'Card: 4 Liquid Hero Section': CardFourLiquidTemplate,
  'Card: FAQs': CardFaqTemplate,
};

const ModuleCards = (props) => {
  const { template, reference } = props;

  const TemplateModule = availableTemplates[template];

  if (TemplateModule === undefined) {
    // eslint-disable-next-line no-console
    console.error(`Couldn't find a Card template for ${template}`);
    return null;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <TemplateModule id={slugify(reference, { lower: true })} {...props} />;
};

ModuleCards.defaultProps = {
  reference: '',
};

ModuleCards.propTypes = {
  reference: PropTypes.string,
  template: PropTypes.string.isRequired,
};

export default withTheme(ModuleCards);
