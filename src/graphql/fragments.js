import { graphql } from 'gatsby';

export const FragmentContentfulModuleCards = graphql`
  fragment FragmentContentfulModuleSingleCard on ContentfulModuleSingleCard {
    title
    subtitle
    callToAction
    callToActionUrl
    image {
      title
      description
      file {
        url
        fileName
        details {
          image {
            width
            height
          }
        }
      }
    }
    text {
      text
    }
  }

  fragment FragmentContentfulModuleCards on ContentfulModuleCards {
    reference
    template
    title {
      title
    }
    subtitle {
      subtitle
    }
    description {
      description
    }
    media {
      description
      file {
        url
        fileName
        details {
          image {
            width
            height
          }
        }
      }
    }
    callToActionUrl
    callToActionButton
    cards {
      ...FragmentContentfulModuleSingleCard
    }
    backgroundColor
  }
`;

export const FragmentChildProduct = graphql`
  fragment FragmentChildProduct on ContentfulProductOption {
      sku
      productFamily
      type
      recurringPayment
      multipleChildSelection
      name
      text {
        text
      }
      shortName
      shortText
      features {
        features
      }
      cartIcon {
        file {
          url
          details {
            image {
              width
              height
            }
          }
        }
        description
      }
  }
`;

export const FragmentContentfulProductOption = graphql`
  fragment FragmentContentfulProductOption on ContentfulProductOption {
    sku
    productFamily
    type
    recurringPayment
    multipleChildSelection
    childProductsOffer
    name
    text {
      text
    }
    shortName
    shortText
    features {
      features
    }
    cartIcon {
      file {
        url
        details {
          image {
            width
            height
          }
        }
      }
      description
    }
    childProducts {
      ...FragmentChildProduct
    }
  }
`;

export const FragmentContentfulModuleProductDisplay = graphql`
  fragment FragmentContentfulModuleProductDisplay on ContentfulModuleProductDisplay {
    reference
    title {
      title
    }
    text {
      text
    }
    callToAction
    callToActionUrl
    products {
      ...FragmentContentfulProductOption
    }
  }
`;

export const FragmentContentfulModuleFreeform = graphql`
  fragment FragmentContentfulModuleFreeform on ContentfulModuleFreeform {
    name
    source
    data {
      internal {
        content
        description
        ignoreType
        mediaType
      }
    }
  }
`;

export const FragmentContentfulModuleHero = graphql`
  fragment FragmentContentfulModuleHero on ContentfulModuleHero {
    reference
    template
    backgroundColor
    title {
      title
    }
    titleSub {
      titleSub
    }
    description {
      description
    }
    callToActionButton
    callToActionButtonUrl
    callToActionSecondary
    callToActionSecondaryUrl
    image {
      title
      description
      file {
        url
        fileName
        details {
          image {
            width
            height
          }
        }
      }
    }
    customFields {
      internal {
        content
        description
        ignoreType
        mediaType
      }
    }
    customFields {
      internal {
        content
        description
        ignoreType
        mediaType
      }
    }
  }
`;

export const FragmentContentfulModulePlainText = graphql`
  fragment FragmentContentfulModulePlainText on ContentfulModulePlainText {
    template
    content {
      json
    }
  }
`;

export const FragmentContentfulModuleLiquid = graphql`
  fragment FragmentContentfulModuleLiquid on ContentfulModuleLiquid {
    reference
    template
    backgroundColor
    title {
      title
    }
    description {
      description
    }
    callToActionButton
    callToActionButtonUrl
    image {
      file {
        url
        fileName
        details {
          image {
            width
            height
          }
        }
      }
    }
  }
`;

export const FragmentContentfulModuleVideo = graphql`
  fragment FragmentContentfulModuleVideo on ContentfulModuleVideo {
    reference
    template
    backgroundColor
    title {
      title
    }
    subtitle {
      subtitle
    }
    content {
      content
    }
    callToActionButtonText
    callToActionButtonUrl
    videoId
  }
`;
