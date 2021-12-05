import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import circleArrow from '../../../../assets/icons/circleArrow.svg';

import { parseMd } from '../../../../util';
import Button from '../../../Button';

import getColorSet from '../../services/getColorSet';

const MobileTemplate = (props) => {
  const {
    id,
    className,

    // base content
    title: rawTitle,
    titleSub: rawTitleSub,
    description: rawDescription,
    image,

    // cta
    callToActionButton,
    callToActionButtonUrl,
    callToActionSecondary,
    callToActionSecondaryUrl,

    // colors
    newBackgroundColor,

    // magic
    customFields,
  } = props;

  const title = parseMd(rawTitle);
  const titleSub = parseMd(rawTitleSub);
  const description = parseMd(rawDescription);

  const isExternalCTA = callToActionButtonUrl?.startsWith('http');
  const isExternalSecondaryCTA = callToActionSecondaryUrl?.startsWith('http');

  const caseStudy = R.compose(
    R.prop('caseStudy'),
    R.tryCatch(
      JSON.parse,
      R.always({}),
    ),
    R.pathOr('{}', ['internal', 'content']),
  )(customFields);

  const colorSet = getColorSet(newBackgroundColor);

  return (
    <div id={id} className={`${className} local-reset`}>
      {image && (
      <img
        className="h-1/2-screen max-w-full object-cover"
        src={image.file?.url}
        alt={image.description}
      />
      )}
      <div className="flex flex-col items-center relative -mt-5">
        {caseStudy && (
          <Link
            className={`
            absolute -mt-6
            flex items-center
            text-base-100 bg-contrast-600 bg-opacity-75
            px-2 py-1 mx-auto
            no-underline whitespace-no-wrap
            border border-base-100 border-solid rounded-full`}
            to={caseStudy.link}
          >
            {caseStudy.mobileText}
            <img src={circleArrow} alt="Read Customer Story" className="ml-2" />
          </Link>
        )}
        <div className={`bg-${colorSet.main} text-${colorSet.text} rounded-lg p-3 mx-2 text-base flex flex-col`}>
          <h1 className="text-2xl mb-2">{title}</h1>
          <h2 className="text-base mb-2">{titleSub}</h2>
          {description}
          {callToActionButton && callToActionButtonUrl && (
            <Button
              className={`
                mt-2 self-center 
                bg-${colorSet.inverse.background} text-${colorSet.inverse.text}
              `}
              to={!isExternalCTA ? callToActionButtonUrl : undefined}
              href={isExternalCTA ? callToActionButtonUrl : undefined}
              size="sm"
            >{callToActionButton}
            </Button>
          )}
          {callToActionSecondary && callToActionSecondaryUrl && (
            <Button
              className={`
                mt-2 self-center
                bg-${colorSet.main} text-${colorSet.text} border-${colorSet.text}
              `}
              to={!isExternalSecondaryCTA ? callToActionSecondaryUrl : undefined}
              href={isExternalSecondaryCTA ? callToActionSecondaryUrl : undefined}
              size="sm"
              outline="true"
            >{callToActionSecondary}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

MobileTemplate.defaultProps = {
  id: undefined,
  className: '',
  title: undefined,
  titleSub: undefined,
  description: undefined,
  image: undefined,
  callToActionButton: undefined,
  callToActionButtonUrl: undefined,
  callToActionSecondary: undefined,
  callToActionSecondaryUrl: undefined,
  customFields: undefined,
  newBackgroundColor: undefined,
};

MobileTemplate.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.shape({
    title: PropTypes.string,
  }),
  titleSub: PropTypes.shape({
    titleSub: PropTypes.string,
  }),
  description: PropTypes.shape({
    description: PropTypes.string,
  }),
  image: PropTypes.shape({
    description: PropTypes.string,
    file: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
  callToActionButton: PropTypes.string,
  callToActionButtonUrl: PropTypes.string,
  callToActionSecondary: PropTypes.string,
  callToActionSecondaryUrl: PropTypes.string,
  customFields: PropTypes.shape({
    internal: PropTypes.shape({
      content: PropTypes.string,
    }),
  }),
  newBackgroundColor: PropTypes.string,
};

export default MobileTemplate;
