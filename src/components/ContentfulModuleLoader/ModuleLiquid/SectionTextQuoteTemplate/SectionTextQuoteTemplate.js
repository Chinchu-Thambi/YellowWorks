import { withTheme } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';
import { parseMd } from '../../../../util';
import quote from '../../../../assets/icons/blueQuoteIcon.svg';

import {
  Container, Content,
} from './Styled';

const SectionTextQuoteTemplate = ({
  reference,
  description: rawDescription,
}) => {
  const description = parseMd(rawDescription);

  return (
    <Container
      as="section"
      id={slugify(reference, { lower: true })}
    >
      <Content>
        <img
          src={quote}
          alt="Start quote."
          title="Start quote."
        />
        {description && (
          <span>{description}</span>
        )}
        <img
          src={quote}
          alt="End quote."
          title="End quote."
        />
      </Content>
    </Container>
  );
};

SectionTextQuoteTemplate.defaultProps = {
  reference: '',
  description: {
    description: '',
  },
};

SectionTextQuoteTemplate.propTypes = {
  reference: PropTypes.string,
  description: PropTypes.shape({
    description: PropTypes.string,
  }),
};

export default withTheme(SectionTextQuoteTemplate);
