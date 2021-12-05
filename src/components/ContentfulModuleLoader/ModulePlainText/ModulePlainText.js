import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { BaseContainer, Container, RestrictedContainer } from '../../Grid';

import richTextOptions from './richTextOptions';

const Simple = styled(BaseContainer)`
  line-height: 1.5;

  img {
    max-width: 100%;
  }
`;

const Center = styled(BaseContainer)`
  line-height: 1.5;
  text-align: center;

  img {
    max-width: 100%;
  }
`;

const Blog = styled(RestrictedContainer)`
  line-height: 1.5;

  img {
    max-width: 100%;
  }
`;

const templateMap = {
  Simple,
  Center,
  'Blog Post': Blog,
};


const ModulePlainText = (props) => {
  const { template, content } = props;
  const json = content?.json || { content: [] };

  const Template = templateMap[template];
  const richContent = documentToReactComponents(json, richTextOptions);

  return (
    <Container ExtendedContainer={Template}>
      {richContent}
    </Container>
  );
};

ModulePlainText.defaultProps = {
  template: 'Simple',
  content: {
    json: {
      content: [],
    },
  },
};

ModulePlainText.propTypes = {
  template: PropTypes.string,
  content: PropTypes.shape({
    json: PropTypes.shape({ }),
  }),
};

export default ModulePlainText;
