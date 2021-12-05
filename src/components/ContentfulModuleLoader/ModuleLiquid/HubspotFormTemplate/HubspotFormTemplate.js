import { withTheme } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';

import { parseMd } from '../../../../util';

import { Container, Description } from '../../ContenfulModules.styled';

import {
  ContainerX,
} from './Styled';
import adaptContentfulColorToTailwind from '../../services/adaptContentfulColorToTailwind';

const loadHubspotForm = ({
  portalId,
  formId,
  target,
}) => {
  const createForm = () => window.hbspt.forms.create({
    portalId,
    formId,
    target,
  });

  if (window.hbspt === undefined) {
    const script = document.createElement('script');
    script.async = false;
    script.src = '//js.hsforms.net/forms/v2.js';
    script.addEventListener('load', createForm);

    document.getElementsByTagName('body')[0].appendChild(script);
  } else {
    createForm();
  }
};


class HubspotForm extends React.Component {
  constructor(props) {
    super(props);

    const {
      formId,
    } = this.props;

    this.targetSelector = `hubspot-form-container-${formId}`;
  }

  componentDidMount() {
    const {
      portalId,
      formId,
    } = this.props;

    loadHubspotForm({
      portalId,
      formId,
      target: `#${this.targetSelector}`,
    });
  }

  render() {
    return (
      <div>
        <ContainerX id={this.targetSelector} />
      </div>
    );
  }
}

HubspotForm.defaultProps = {};

HubspotForm.propTypes = {
  portalId: PropTypes.string.isRequired,
  formId: PropTypes.string.isRequired,
};


const HubspotFormTemplate = ({
  reference,
  title: rawTitle,
  description: rawDescription,
  image,
  textColor,
  newBackgroundColor,
  portalId,
  formId,
}) => {
  const title = parseMd(rawTitle);
  const description = parseMd(rawDescription);

  const backgroundColorString = adaptContentfulColorToTailwind(newBackgroundColor);
  const fontColorString = adaptContentfulColorToTailwind(textColor);

  return (
    <div className={`relative h-full overflow-y-visible bg-${backgroundColorString}`}>
      <Container
        id={slugify(reference, { lower: true })}
      >
        <div className="lg:w-1/2 flex justify-center">
          {image && image.file && (
            <img
              src={`${image.file.url}?w=660`}
              alt={image.description}
              title={image.description}
            />
          )}
        </div>
        <div className={`text-${fontColorString} lg:w-1/2`}>
          {title && (
            <h2 className="lg:text-4xl">{title}</h2>
          )}
          <Description backgroundColor={newBackgroundColor} className="text-left">{description}</Description>
          <HubspotForm formId={formId} portalId={portalId} />
        </div>
      </Container>
    </div>
  );
};
HubspotFormTemplate.defaultProps = {
  reference: '',
  title: {
    title: '',
  },
  description: {
    description: '',
  },
  newBackgroundColor: 'White',
  textColor: 'Contrast (Dark Blue)',
  image: null,
};

HubspotFormTemplate.propTypes = {
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
  newBackgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  portalId: PropTypes.string.isRequired,
  formId: PropTypes.string.isRequired,
};

export default withTheme(HubspotFormTemplate);
