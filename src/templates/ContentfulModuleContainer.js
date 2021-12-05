/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ContentfulModuleLoader from '../components/ContentfulModuleLoader';

const ContentfulModuleContainer = (props) => {
  const {
    data: { contentfulProduct, contentfulPage },
  } = props;

  const contentfulData = contentfulProduct || contentfulPage;

  if (!contentfulData) {
    return null;
  }

  const modules = contentfulData.modules || [];

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <meta charSet="utf-8" />
        <title>{contentfulData.seoTitle || contentfulData.name}</title>
        <meta name="description" content={contentfulData.seoDescription} />
      </Helmet>

      <Header />
      {modules.map(({ __typename: typeName, ...moduleProps }, index) => (
        <ContentfulModuleLoader
          key={moduleProps.name || index}
          typeName={typeName}
          data={contentfulData}
          {...moduleProps}
        />
      ))}
      <Footer />
    </>
  );
};

ContentfulModuleContainer.defaultProps = {
  data: {},
};

const contentfulPropTypes = PropTypes.shape({
  name: PropTypes.string,
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      __typename: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
});

ContentfulModuleContainer.propTypes = {
  data: PropTypes.shape({
    contentfulProduct: contentfulPropTypes,
    contentfulPage: contentfulPropTypes,
  }),
};

export const query = graphql`
  query GetProductData($url: String) {
    contentfulPage(url: {eq: $url}) {
      name
      url
      seoCanonical
      seoTitle
      seoDescription
      modules {
        __typename
        ...FragmentContentfulModuleCards
        ...FragmentContentfulModuleProductDisplay
        ...FragmentContentfulModuleFreeform
        ...FragmentContentfulModuleHero
        ...FragmentContentfulModulePlainText
        ...FragmentContentfulModuleLiquid
        ...FragmentContentfulModuleVideo
      }
    }
    contentfulProduct(url: { eq: $url }) {
      name
      sku
      url
      seoCanonical
      seoTitle
      seoDescription
      modules {
        __typename
        ...FragmentContentfulModuleCards
        ...FragmentContentfulModuleProductDisplay
        ...FragmentContentfulModuleFreeform
        ...FragmentContentfulModuleHero
        ...FragmentContentfulModulePlainText
        ...FragmentContentfulModuleLiquid
        ...FragmentContentfulModuleVideo
      }
    }
  }
`;

export default ContentfulModuleContainer;
