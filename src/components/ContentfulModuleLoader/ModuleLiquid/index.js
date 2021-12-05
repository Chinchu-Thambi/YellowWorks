import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import slugify from 'slugify';

import AquaLeftLiquidTemplate from './AquaLeftTemplate';
import AquaRightLiquidTemplate from './AquaRightTemplate';
import KoruLiquidTemplate from './KoruLiquidTemplate';
import SectionRightTemplate from './SectionRightTemplate';
import SectionLeftTemplate from './SectionLeftTemplate';
import SectionTextQuoteTemplate from './SectionTextQuoteTemplate';
import SectionProfileLeftTemplate from './SectionProfileLeftTemplate';
import SectionTextLeftTemplate from './SectionTextLeftTemplate';
import SectionTextRightTemplate from './SectionTextRightTemplate';
import SectionTextCenterTemplate from './SectionTextCenterTemplate';
import SeparatorStraight from './SeparatorStraightTemplate';
import SeparatorCentralImageTemplate from './SeparatorCentralImageTemplate';
import SeparatorTestimonialTemplate from './SeparatorTestimonialTemplate';
import SeparatorWaveBottomGreyTemplate from './SeparatorWaveBottomGreyTemplate';
import SeparatorWaveTopGreyTemplate from './SeparatorWaveTopGreyTemplate';

const availableTemplates = {
  'Section [R]': SectionRightTemplate,
  'Section [L]': SectionLeftTemplate,
  'Section: Text Quote': SectionTextQuoteTemplate,
  'Section: Profile [L]': SectionProfileLeftTemplate,
  'Section: Text [L]': SectionTextLeftTemplate,
  'Section: Text [R]': SectionTextRightTemplate,
  'Section: Text [C]': SectionTextCenterTemplate,
  'Separator: Straight': SeparatorStraight,
  'Separator: Central Image': SeparatorCentralImageTemplate,
  'Separator: Testimonial': SeparatorTestimonialTemplate,
  'Separator: Wave Bottom - Grey': SeparatorWaveBottomGreyTemplate,
  'Separator: Wave Top - Grey': SeparatorWaveTopGreyTemplate,
};

const deprecatedTemplates = {
  '': AquaLeftLiquidTemplate,
  AquaLeft: AquaLeftLiquidTemplate,
  AquaRight: AquaRightLiquidTemplate,
  Koru: KoruLiquidTemplate,
  cards: KoruLiquidTemplate,
};

const ModuleLiquid = (props) => {
  const { template, reference } = props;

  const TemplateModule = availableTemplates[template] || deprecatedTemplates[template];

  if (TemplateModule === undefined) {
    // eslint-disable-next-line no-console
    console.error(`Couldn't find a Liquid template for ${template}`);
    return null;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <TemplateModule id={slugify(reference, { lower: true })} {...props} />;
};

ModuleLiquid.defaultProps = {
  reference: '',
};

ModuleLiquid.propTypes = {
  reference: PropTypes.string,
  template: PropTypes.string.isRequired,
};

export default withTheme(ModuleLiquid);
