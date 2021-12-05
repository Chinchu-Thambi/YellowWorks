import React from 'react';
import * as R from 'ramda';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { productAPIClient } from '../../../../../../services/graphql';
import AuthContext from '../../../../../../components/Auth';
import BusinessContext from '../../../../../MyYellow/services/BusinessContext';

const QUERY_BUSINESS_INSIGHTS = gql`
  query BusinessInsightQuery(
    $businessId: ID!
    $provider: ProductFamily!
    $interval: InsightInterval
    $metric: String
    $dimension: String
    $start: AWSTimestamp
    $end: AWSTimestamp
  ) {
    node(id: $businessId) {
      ... on Business {
        id
        insights(
          query: {
            provider: $provider
            interval: $interval
            start: $start
            end: $end
            metrics: [$metric]
            dimensions: [$dimension]
          }
        ) {
          edges {
            node {
              metrics {
                name
                value
                dimensions {
                  name
                  value
                }
              }
              provider
              interval
              start
              created
            }
          }
        }
      }
    }
  }
`;

const getBusinessInsights = (business) => R.compose(R.flatten, R.pathOr([], ['edges']), R.path(['node', 'insights']))(business);

/**
 * Converts backend insights model into an array of label and value pairs for categorical data (used in histograms).
 */
export const getMonthlyDimensions = (business) => R.compose(
  R.sortBy(R.prop('label')),
  R.map((o) => ({
    label: o.dimensions[0].value,
    value: Number.parseInt(o.value, 10),
  })),
  R.filter(Boolean),
  R.flatten,
  R.map(R.path(['node', 'metrics'])),
)(getBusinessInsights(business));

/**
 * Converts backend insights model into an array of x and y pairs for timeseries data (used in line charts).
 */
export const getTimeseries = (business) => R.compose(
  R.sortBy(R.prop('x')),
  R.map((m) => ({
    x: m.node.created,
    y: Number.parseInt(m.node.metrics[0].value, 10),
  })),
  R.filter(Boolean),
)(getBusinessInsights(business));

export const getScalarData = (business) => {
  const insights = getBusinessInsights(business);
  if (insights?.length > 0 && insights[0]?.node?.metrics && insights[0]?.node?.metrics.length > 0) {
    return Number.parseFloat(insights[0].node.metrics[0].value);
  }
  return null;
};

/**
 * Hook to retrieve insights from the new insights API (queries using the current BusinessContext's  businessId). If dimension is null, will return the sum for the metric value across the interval.
 * Uses apollo useQuery under the hood, and as such the apollo loading status is one of the return values that you can use to indicate data loading status in the UI.
 */
const useInsights = ({
  provider, interval, metric, dimension, start,
}) => {
  const { businessId } = React.useContext(BusinessContext);
  const { jwtToken } = React.useContext(AuthContext) || {};

  const startDate = Date.UTC(new Date(start).getFullYear(), new Date(start).getMonth(), 1);
  const endDate = Date.UTC(new Date(start).getFullYear(), new Date(start).getMonth() + 1, -1);

  /**
   * TODO awaiting backend fix - notion issue
   * https://www.notion.so/yellownz/Enum-param-to-GQL-not-working-insights-query-70628f7661f94e509ab2966db2408a55
   */
  const { loading, data, error } = useQuery(QUERY_BUSINESS_INSIGHTS, {
    variables: {
      businessId,
      provider,
      metric,
      dimension,
      start: startDate / 1000, // b/e uses sec since epoch (not ms)
      end: endDate / 1000,
      interval,
    },
    context: { headers: { Authorization: jwtToken } },
    client: productAPIClient,
  });

  if (!loading && !error && data) {
    let transformedData;

    if (interval === 'MONTH') {
      if (!dimension) {
        transformedData = getScalarData(data);
      } else {
        transformedData = getMonthlyDimensions(data);
      }
    } else if (interval === 'DAY') {
      transformedData = getTimeseries(data);
    } else {
      return {
        loading: false,
        data: null,
        error: `useInsights: Error - Invalid interval (${interval}).`,
      };
    }

    return {
      loading,
      data: transformedData,
      error,
    };
  }

  return { loading, data: null, error };
};

export default useInsights;

useInsights.propTypes = {
  provider: PropTypes.oneOf(['YOL', 'PRINT', 'WEBSITE', 'GMB', 'SEARCHADS']),
  metric: PropTypes.oneOf(['leads', 'impressions', 'interactions']),
  dimension: PropTypes.oneOf(['source', 'page', 'target', 'link']),
  interval: PropTypes.oneOf(['DAY', 'WEEK', 'MONTH', 'QUARTER', 'YEAR']),
};
