import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import slugify from 'slugify';

// TODO: point to unrepeated version of the path
import HeroLiquidRightTemplate from './HeroLiquidRightTemplate';
import HeroLiquidRightAlternateTemplate from './HeroLiquidRightAlternateTemplate';
import HeroLiquidRightBottomTemplate from './HeroLiquidRightBottomTemplate';
import HeroLiquidLeftTemplate from './HeroLiquidLeftTemplate';
import FullImageLeftTemplate from './FullImageLeftTemplate';
import FullImageCenterTemplate from './FullImageCenterTemplate';
import FullTestimonialTemplate from './FullTestimonialTemplate';
import BlogHeaderHeroTemplate from './BlogHeaderHeroTemplate';
import HeroAlertTemplate from './HeroAlertTemplate';
import HeroSplitTemplate from './HeroSplitTemplate';

const availableTemplates = {
  'Hero: Liquid [L]': HeroLiquidLeftTemplate,
  'Hero: COVID19': HeroAlertTemplate,
  'Hero: Liquid [R]': HeroLiquidRightTemplate,
  'Hero: Liquid [R] - White Text': HeroLiquidRightAlternateTemplate,
  'Hero: Liquid [R] - Bottom Aligned Image': HeroLiquidRightBottomTemplate,
  'Hero: Full Image [L] - Light': FullImageLeftTemplate,
  'Hero: Full Image [Center Text]': FullImageCenterTemplate,
  'Hero/Section: Full Testimonial': FullTestimonialTemplate,
  'Hero: Blog Post': BlogHeaderHeroTemplate,
  'Hero: Split': HeroSplitTemplate,
};

const ModuleHero = (props) => {
  const { template, reference } = props;

  const TemplateModule = availableTemplates[template] || HeroLiquidLeftTemplate;

  if (TemplateModule === undefined) {
    // eslint-disable-next-line no-console
    console.error(`Couldn't find a hero template for ${template}`);
    return null;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <TemplateModule id={slugify(reference, { lower: true })} {...props} />;
};

ModuleHero.defaultProps = {
  reference: '',
};

ModuleHero.propTypes = {
  reference: PropTypes.string,
  template: PropTypes.string.isRequired,
};

export default withTheme(ModuleHero);
