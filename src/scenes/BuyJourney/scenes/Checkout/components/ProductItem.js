import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from 'rebass';

import { formatPrice, mediaBreakpointUp, useLocalStorage } from '../../../../../util';

import defaultImage from './images/default-product-icon.svg';

const Heading = styled.span`
  color: ${({ theme }) => theme.palette.contrast[0]};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  min-height: 90px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gallery};
  margin-bottom: 12px;

  ${mediaBreakpointUp('md')} {
    margin-left: auto;
    margin-right: auto;
    max-width: ${({ theme }) => theme.containerWidth[2]};
  }

  :last-of-type {
    padding-bottom: 0;
    border-bottom: 0;
    margin-bottom: 0;
  }

  > img {
    width: 95px;
    height: 90px;
    margin-right: 25px;

    ${mediaBreakpointUp('md')} {
      margin-left: -120px;
    }
  }
`;

const TextContent = styled.div`
  margin-right: 20px;

  > h4 {
    margin: 0;
    font-weight: ${({ theme }) => theme.fontWeight[0]};;
  }

  > h5 {
    margin: 0;
    font-weight: ${({ theme }) => theme.fontWeight[0]};;
    font-size: 13px;
  }

  > p {
    color: ${({ theme }) => theme.colors.dustyGray};
    font-size: 12px;
    margin: 6px 0;
  }
`;

const PriceDisplay = styled.div`
  white-space: nowrap;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: auto;
  font-weight: ${({ theme }) => theme.fontWeight[0]};
  width: 100%;

  ${mediaBreakpointUp('md')} {
    width: auto;
  }
`;

const ProductItem = ({ product }) => {
  const {
    listPrice,
    contentfulObject: {
      name,
      recurringPayment,
      cartIcon,
      shortText,
      type,
    },
    sku,
  } = product;

  const [searchAdsData] = useLocalStorage('searchAdsFormData', null);
  const productSubId = product?.options
          ?.find((option) => option?.name.includes('subscriptionId'))?.value;
  const formData = searchAdsData?.[productSubId] || null;
  const locations = formData?.targetLocation?.targetLocationType === 'regions'
    ? formData?.targetLocation?.regions.map((region) => region.name).join(', ')
    : `${formData?.targetLocation?.radius} km from my business`;
  const categories = formData?.filteredCategories.map((category) => category.name).join(', ');

  return (
    <Container>
      { cartIcon?.file ? (
        <img
          src={cartIcon.file.url}
          width={cartIcon.file.details.image.width / 2}
          height={cartIcon.file.details.image.height / 2}
          alt={`${name} Icon`}
        />
      ) : (
        <img src={defaultImage} width="95" height="90" alt="" />
      ) }
      <Flex flexDirection={['column', 'row']} flexGrow="1" justifyContent="space-between">
        <TextContent>
          { type === 'product-variant'
            ? <h4>{name}</h4>
            : <h5>{name}</h5>}
          { shortText && (
          <p>{shortText}</p>
          )}
          {sku === 'SEARCHADS' && (
            <>
              <p><Heading>Target Location(s):</Heading> {locations}</p>
              <p><Heading>Categories:</Heading> {categories}</p>
              <p><Heading>Target URL:</Heading> {formData?.targetLandingPage?.url}</p>
            </>
          )}
        </TextContent>
        <PriceDisplay>
          <strong>{formatPrice(listPrice)}</strong>
          { recurringPayment ? ' / month' : '' }
        </PriceDisplay>
      </Flex>
    </Container>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    listPrice: PropTypes.number.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    contentfulObject: PropTypes.shape({
      name: PropTypes.string,
      recurringPayment: PropTypes.bool,
      cartIcon: PropTypes.shape({
        file: PropTypes.shape({
          url: PropTypes.string,
          details: PropTypes.shape({
            image: PropTypes.shape({
              width: PropTypes.number,
              height: PropTypes.number,
            }),
          }),
        }),
      }),
      shortText: PropTypes.string,
      type: PropTypes.string,
    }),
    sku: PropTypes.string,
  }).isRequired,
};

export default ProductItem;
