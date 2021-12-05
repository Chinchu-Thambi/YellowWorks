/* globals window, document */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Container as BaseContainer } from '../../Grid';
import { mediaBreakpointUp } from '../../../util';

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

const Background = styled.div`
  background-color: ${({ theme }) => theme.palette.base[2]};
`;

const Container = styled(BaseContainer)`
  &&& {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: ${({ theme }) => theme.fontSizes[1]};
    max-width: 100%;
    color: ${({ theme }) => theme.palette.contrast[2]};
    margin-bottom: 0;

    ${mediaBreakpointUp('md')} {
      width: 60%;
    }

    .hs-form-field>label {
      clip: rect(1px, 1px, 1px, 1px);
      height: 1px;
      overflow: hidden;
      position: absolute;
      width: 1px;
    }

    .hs-form-field {
      width: 50% !important;
      float: left !important;
    }

    .form-columns-2 {
      .input {
        border: 1px solid ${({ theme }) => theme.palette.contrast[5]};
      }

      .field {
        margin-bottom: ${({ theme }) => theme.space[3]};
      }
    }

    .hs-form-field-input {
      width:100%;
    }

    fieldset {
      max-width: 100%;

      input, textarea, hs-input, select {
        width: 100%;
        font-size: ${({ theme }) => theme.fontSizes[2]};
        font-weight: ${({ theme }) => theme.fontWeight[0]};;
        color: ${({ theme }) => theme.palette.contrast[2]};
        padding: ${({ theme }) => theme.space[2]};
        border: 1px solid ${({ theme }) => theme.palette.contrast[4]};
        border-radius: ${({ theme }) => theme.radii[2]};
      }
    }

    ul {
      list-style: none;
      padding: 0;
      color: ${({ theme }) => theme.palette.accent[2][0]};
    }

    .submitted-message {
      text-align: center;
    }

    .hs-button.primary {
      font-weight: ${({ theme }) => theme.fontWeight[0]};
      display: inline-block;
      background: ${({ theme }) => theme.colors.primary};
      padding: 20px 40px;
      border-radius: 40px;
      width: 100%;
      border: 0;
      text-transform: uppercase;

      ${mediaBreakpointUp('md')} {
        width: auto;
      }
    }

    .actions {
      text-align: center;
      padding-bottom: ${({ theme }) => theme.space[4]};
    }

    select {
      height: 42px;
    }

    .hs-submit {
      margin-top: ${({ theme }) => theme.space[4]};
    }
  }
`;

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
      <Background>
        <Container id={this.targetSelector} />
      </Background>
    );
  }
}

HubspotForm.defaultProps = {};

HubspotForm.propTypes = {
  portalId: PropTypes.string.isRequired,
  formId: PropTypes.string.isRequired,
};

export default HubspotForm;
