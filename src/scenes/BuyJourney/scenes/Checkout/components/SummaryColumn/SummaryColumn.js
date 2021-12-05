/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Box, Text } from 'rebass/styled-components';

import {
  formatPrice,
  reformatDate,
  getNextMonth, getEndOfMonth,
  useLocalStorage,
} from '../../../../../../util';

import { StyledSummary, SingleItem, Container } from './SummaryColumn.styled';
import Spinner from '../../../../../../components/Spinner';

import defaultImage from '../images/default-product-icon.svg';
import getPublishingDate from '../../../../../../services/getPublishingDate';

const SummaryColumn = ({ purchase, allContentfulProducts, pricingOptions }) => {
  const {
    fullMonthPrice,
    remainingDaysPrice,
    fullYearPrice,
    discountValidity,
  } = pricingOptions || {};

  const productsList = purchase ? [purchase?.product, ...(purchase?.childProducts || [])] : [];
  const [brief] = useLocalStorage('productBrief', null);

  const associateContentful = (p) => R.assoc('contentfulObject',
    R.find((product) => p?.sku === product.sku)(allContentfulProducts || []), p);
  const associateProductBriefProduct = R.assoc('briefProduct', ({ book: brief?.book?.product, listingType: brief?.listingType }));
  let products = R.map(associateContentful, productsList);
  if (R.any((p) => R.includes('PRT', p.sku))(products)) {
    products = R.map(associateProductBriefProduct, products);
  }
  const chargingDates = {
    nextMonth: getNextMonth({ baseNextWeekday: true }),
    tomorrow: remainingDaysPrice?.startDate,
    nextYear: fullYearPrice?.startDate,
    endOfCurrentMonth: getEndOfMonth({ baseNextWeekday: true }),
  };

  const formatDate = (timestamp, annual = false) => {
    const dateObj = new Date(timestamp * 1000);
    if (annual) {
      dateObj.setFullYear(dateObj.getFullYear() + 1);
    }
    return reformatDate(dateObj);
  };

  const fullMonthValues = fullMonthPrice ? {
    grandTotal: fullMonthPrice?.grandTotal / 100 || 0,
    taxTotal: fullMonthPrice?.tax / 100 || 0,
    subtotal: fullMonthPrice?.subtotal / 100 || 0,
    discount: fullMonthPrice?.discount?.amount / 100 || 0,
  } : null;
  const remainingDaysValues = remainingDaysPrice ? {
    grandTotal: remainingDaysPrice?.grandTotal / 100 || 0,
    taxTotal: remainingDaysPrice?.tax / 100 || 0,
    subtotal: remainingDaysPrice?.subtotal / 100 || 0,
    discount: remainingDaysPrice?.discount?.amount / 100 || 0,
  } : null;
  const fullYearValues = fullYearPrice ? {
    grandTotal: fullYearPrice?.grandTotal / 100 || 0,
    taxTotal: fullYearPrice?.tax / 100 || 0,
    subtotal: fullYearPrice?.subtotal / 100 || 0,
    discount: fullYearPrice?.discount?.amount / 100 || 0,
  } : null;
  return (
    <Container>
      <header>
        <h3>Purchase summary</h3>
      </header>
      {fullYearValues ? (
        <StyledSummary>
          <h4>Annual payments</h4>
          <table>
            <tbody>
              <Fragment key={products[0]?.subscriptionId}>
                {products.map((product) => {
                  const publishDate = () => {
                    const book = product.briefProduct?.book;
                    const dateSegments = R.split(' ', getPublishingDate(
                      book?.printDeliveryDate,
                      book?.printLastBookingDate,
                    ));
                    return `${dateSegments?.[1]} ${dateSegments?.[2]}`;
                  };
                  return (
                    <SingleItem
                      alignItems="center"
                    >
                      <td>
                        {product.contentfulObject?.cartIcon ? (
                          <img
                            src={product.contentfulObject.cartIcon.file.url}
                            width={product.contentfulObject.cartIcon.file.details.image.width / 3}
                            height={product.contentfulObject.cartIcon.file.details.image.height / 3}
                            alt={`${product.contentfulObject?.name} Icon`}
                          />
                        ) : (
                          <img src={defaultImage} width="64" height="30" alt="" />
                        )}
                      </td>
                      <td>
                        <h5>{product.contentfulObject?.name}</h5>
                        {product.briefProduct?.listingType
                          && <p>{product.briefProduct?.listingType?.name} - {publishDate()}</p>}
                      </td>
                      <td>
                        <strong>{formatPrice(product.pricingPlan?.amount / 100 || 0)}</strong>
                      </td>
                    </SingleItem>
                  );
                })}
              </Fragment>
              <tr>
                <td />
                <td>
                  <div>
                    <Text as="p" mb={1}>Annualised payment</Text>
                    <Text as="p" mb={1}>Next payment will be due {formatDate(chargingDates?.nextYear, true)} </Text>
                    <Text as="p" mb={1}>Cancel anytime</Text>
                  </div>
                </td>
                <td />
              </tr>
              <tr>
                <td />
                <td>Subtotal</td>
                <td>
                  {fullYearValues ? formatPrice(fullYearValues.subtotal) : <Spinner size={12} />}
                </td>
              </tr>
              {discountValidity?.validity && (
                <tr>
                  <td />
                  <td>- Discount</td>
                  <td>
                    {fullYearValues ? formatPrice(fullYearValues?.discount) : <Spinner size={12} />}
                  </td>
                </tr>
              )}
              <tr>
                <td />
                <td>+ GST 15%</td>
                <td>
                  {fullYearValues ? formatPrice(fullYearValues.taxTotal) : <Spinner size={12} />}
                </td>
              </tr>
            </tbody>
            <Box as="tfoot" display={[null, 'none']}>
              <tr>
                <td />
                <td colSpan="2">
                  Total Yearly Ongoing
                </td>
                <td align="right">
                  {fullYearValues ? formatPrice(fullYearValues.grandTotal) : <Spinner size={12} />}
                </td>
              </tr>
              <tr>
                <td />
                <td colSpan="2">
                  Total Billed Today
                </td>
                <td align="right">
                  {typeof fullYearValues?.grandTotal === 'number'
                    ? formatPrice(fullYearValues?.grandTotal)
                    : <Spinner align="left" size={12} />}
                </td>
              </tr>
            </Box>
            <Box as="tfoot" display={['none', 'table-footer-group']}>
              <tr>
                <td />
                <td className="right">
                  <span>Total Annual Charge</span>
                </td>
                <td className="right">
                  {fullYearValues ? formatPrice(fullYearValues.grandTotal) : <Spinner size={12} />}
                </td>
              </tr>
            </Box>
          </table>
        </StyledSummary>
      ) : (
        <StyledSummary>
          <h4>Monthly payments</h4>
          <table>
            <tbody>
              <Fragment key={products[0]?.subscriptionId}>
                {products.map((product) => (
                  <SingleItem
                    alignItems="center"
                  >
                    <td>
                      {product.contentfulObject?.cartIcon ? (
                        <img
                          src={product.contentfulObject.cartIcon.file.url}
                          width={product.contentfulObject.cartIcon.file.details.image.width / 3}
                          height={product.contentfulObject.cartIcon.file.details.image.height / 3}
                          alt={`${product.contentfulObject?.name} Icon`}
                        />
                      ) : (
                        <img src={defaultImage} width="64" height="30" alt="" />
                      )}
                    </td>
                    <td>
                      <h5>{product.contentfulObject?.name}</h5>
                    </td>
                    <td>
                      <strong>{formatPrice(product.pricingPlan?.amount / 100 || 0)}</strong>
                    </td>
                    <td />
                  </SingleItem>
                ))}
              </Fragment>
              <tr>
                <td />
                <td />
                <td>
                  <div>
                    <strong>MONTHLY ONGOING</strong>
                    <p>
                      from
                      {' '}
                      {reformatDate(chargingDates.nextMonth)}
                    </p>
                  </div>
                </td>
                <td>
                  <div>
                    <strong>1ST PERIOD BILLED (TODAY)</strong>
                    {chargingDates.tomorrow
                      ? (
                        <p>
                          {formatDate(chargingDates.tomorrow)} - {reformatDate(chargingDates.endOfCurrentMonth)}
                        </p>
                      ) : (
                        <Spinner align="left" size={12} />
                      )}
                  </div>
                </td>
              </tr>
              <tr>
                <td />
                <td>Subtotal</td>
                <td>
                  {fullMonthValues ? formatPrice(fullMonthValues.subtotal) : <Spinner size={12} />}
                </td>
                <td>
                  {remainingDaysValues
                    ? formatPrice(remainingDaysValues.subtotal)
                    : <Spinner align="left" size={12} />}
                </td>
              </tr>
              {discountValidity?.validity && (
                <tr>
                  <td />
                  <td>- Discount</td>
                  <td>
                    {fullMonthValues ? formatPrice(fullMonthValues?.discount) : <Spinner size={12} />}
                  </td>
                  <td>
                    {remainingDaysValues
                      ? formatPrice(remainingDaysValues?.discount)
                      : <Spinner align="left" size={12} />}
                  </td>
                </tr>
              )}
              <tr>
                <td />
                <td>+ GST 15%</td>
                <td>
                  {fullMonthValues ? formatPrice(fullMonthValues.taxTotal) : <Spinner size={12} />}
                </td>
                <td>
                  {remainingDaysValues
                    ? formatPrice(remainingDaysValues?.taxTotal)
                    : <Spinner align="left" size={12} />}
                </td>
              </tr>
            </tbody>
            <Box as="tfoot" display={[null, 'none']}>
              <tr>
                <td />
                <td colSpan="2">
                  Total Monthly Ongoing
                </td>
                <td align="right">
                  {fullMonthValues ? formatPrice(fullMonthValues.grandTotal) : <Spinner size={12} />}
                </td>
              </tr>
              <tr>
                <td />
                <td colSpan="2">Total 1st Period</td>
                <td align="right">
                  {remainingDaysValues
                    ? formatPrice(remainingDaysValues?.grandTotal)
                    : <Spinner align="left" size={12} />}
                </td>
              </tr>
              <tr>
                <td />
                <td colSpan="2">
                  Total Billed Today
                </td>
                <td align="right">
                  {typeof remainingDaysValues?.grandTotal === 'number'
                    ? formatPrice(remainingDaysValues?.grandTotal)
                    : <Spinner align="left" size={12} />}
                </td>
              </tr>
            </Box>
            <Box as="tfoot" display={['none', 'table-footer-group']}>
              <tr>
                <td />
                <td className="right">
                  <span>Total Monthly Ongoing</span>
                </td>
                <td className="right">
                  {fullMonthValues ? formatPrice(fullMonthValues.grandTotal) : <Spinner size={12} />}
                  <span>Total 1st Period</span>
                </td>
                <td>
                  {remainingDaysValues
                    ? formatPrice(remainingDaysValues?.grandTotal)
                    : <Spinner align="left" size={12} />}
                </td>
              </tr>
              <tr>
                <td />
                <td />
                <td className="right">
                  <span>Total Billed Today</span>
                </td>
                <td>
                  {typeof remainingDaysValues?.grandTotal === 'number'
                    ? formatPrice(remainingDaysValues?.grandTotal)
                    : <Spinner align="left" size={12} />}
                </td>
              </tr>
            </Box>
          </table>
        </StyledSummary>
      )}
    </Container>
  );
};

SummaryColumn.propTypes = {
  allContentfulProductOption: PropTypes.shape({
    nodes: PropTypes.arrayOf(PropTypes.shape({
      sku: PropTypes.string,
    })),
  }).isRequired,
};

export default React.memo(SummaryColumn);
