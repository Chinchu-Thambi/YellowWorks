import { toSentenceCase } from '../../../../../util/formatting';

export const metricNames = {
  SEARCH_APPEARANCES: 'Search Appearances',
  INTERACTIONS: 'Interactions',
  PROFILE_VISITS: 'Profile Visits',
  LIFETIME_REVIEWS_COUNT: 'Total Business Reviews (Lifetime)',
  LIFETIME_AVERAGE_RATING: 'Average Rating Review (Lifetime)',
};

export const dimensionTypes = {
  INTERACTION_TYPE: 'Interaction Type',
  CATEGORY: 'Category',
};

/**
 * Returns an array of {x, y} pairs, sorted ascending by x.
 */
export const continuous = (nameOfMetric) => (metrics) => {
  const timeToTotalMap = {};
  // eslint-disable-next-line no-unused-expressions
  metrics
    ?.filter(
      (m) => m.dimension === null && m.metric.name === nameOfMetric && m.statistic === 'COUNT' && m.namespace === 'YOL',
    )
    .forEach((m) => {
      timeToTotalMap[m.timestamp] = (timeToTotalMap[m.timestamp] || 0) + Number.parseInt(m.metric.value, 10);
    });

  const continuousData = [];
  Object.keys(timeToTotalMap).forEach((timestampStr) => continuousData.push({
    x: Number.parseInt(timestampStr, 10),
    y: timeToTotalMap[timestampStr],
  }));
  const sortedContinuousData = continuousData.sort((a, b) => a.x - b.x);
  return sortedContinuousData;
};

export const sum = (nameOfMetric, nameOfDimension = null, subscriptionID = null) => (metrics) => metrics
    ?.filter(
      (m) => (nameOfDimension ? m.dimension?.name === nameOfDimension : m.dimension === null)
        && (subscriptionID ? m.subscription.businessProfileSummary.locationSummary.id === subscriptionID : true)
        && m.metric?.name === nameOfMetric
        && m.statistic === 'COUNT'
        && m.namespace === 'YOL',
    )
    .map((n) => n.metric?.value)
    .reduce((accumulated, current) => Number.parseInt(current, 10) + accumulated, 0);

export const average = (nameOfMetric, nameOfDimension = null) => (metrics) => {
  const averages = metrics?.filter(
    (m) => (nameOfDimension ? m.dimension?.name === nameOfDimension : m.dimension === null)
      && m.metric?.name === nameOfMetric
      && m.statistic === 'AVERAGE'
      && m.namespace === 'YOL',
  );
  const sumOfAverages = averages?.map((a) => a.metric.value).reduce((accum, a) => Number.parseFloat(a, 10) + accum, 0);
  return (sumOfAverages * 1.0) / averages?.length;
};

export const profiles = (namesOfMetrics) => (metrics) => {
  const uniqueSubscriptionIdsSet = new Set();

  metrics
    .filter((m) => namesOfMetrics.includes(m.metric.name) && m.dimension === null && m.subscription)
    .forEach((m) => uniqueSubscriptionIdsSet.add(m.subscription?.businessProfileSummary?.locationSummary?.id));

  const uniqueSubIds = Array.from(uniqueSubscriptionIdsSet);

  const subToBusinessProfileMap = {};
  uniqueSubIds.forEach((subID) => {
    const sub = metrics.find((m) => m.subscription.businessProfileSummary.locationSummary.id === subID).subscription;

    if (sub?.productSummary?.configuration) {
      const formattedSub = JSON.parse(sub.productSummary.configuration);
      subToBusinessProfileMap[subID] = {
        name: formattedSub.name,
        address: formattedSub.location,
      };
    } else {
      subToBusinessProfileMap[subID] = null;
    }
  });

  const subToMetricsMap = {};

  uniqueSubIds.forEach((subID) => {
    subToMetricsMap[subID] = namesOfMetrics.map((metricName) => ({
      metric: metricName,
      value: sum(metricName, null, subID)(metrics),
    }));
  });

  // const profileSet = uniqueSubIds.map((subID) => ({
  //   name: subToBusinessProfileMap[subID].name,
  //   address: subToBusinessProfileMap[subID].address,
  //   id: subID,
  //   metrics: subToMetricsMap[subID],
  // }));

  const profileSet = uniqueSubIds.map((subID) => ({
    name: subToBusinessProfileMap[subID].name,
    address: subToBusinessProfileMap[subID].address,
    id: subID,
    metrics: subToMetricsMap[subID],
  }));

  return profileSet;
};

export const discrete = (nameOfMetric, nameOfDimension) => (metrics) => {
  const dimensionToValueMap = {};
  metrics
    .filter((m) => m.dimension?.name === nameOfDimension && m.metric.name === nameOfMetric)
    .forEach((m) => {
      dimensionToValueMap[m.dimension.value] = (dimensionToValueMap[m.dimension.value] || 0) + Number.parseInt(m.metric.value, 10);
    });
  return Object.keys(dimensionToValueMap).map((dimValue) => ({
    label: toSentenceCase(dimValue),
    value: dimensionToValueMap[dimValue],
  }));
};

const transformInsights = ({ metrics, withSubscriptionProfiles = true }) => {
  if (!metrics || metrics.length === 0) {
    return {};
  }

  const insights = {
    searchAppearances: continuous(metricNames.SEARCH_APPEARANCES)(metrics),
    profileInteractions: continuous(metricNames.INTERACTIONS)(metrics),
    profileVisits: continuous(metricNames.PROFILE_VISITS)(metrics),
    interactions: discrete(metricNames.INTERACTIONS, dimensionTypes.INTERACTION_TYPE)(metrics),
    performanceByCategory: discrete(metricNames.SEARCH_APPEARANCES, dimensionTypes.CATEGORY)(metrics),
    lifetimeReviewsCount: sum(metricNames.LIFETIME_REVIEWS_COUNT)(metrics),
    lifetimeAverageReviewRating: average(metricNames.LIFETIME_AVERAGE_RATING)(metrics),
    timestamp: metrics[0]?.timestamp,
  };

  if (withSubscriptionProfiles) {
    insights.profiles = profiles([metricNames.PROFILE_VISITS, metricNames.INTERACTIONS])(metrics).map((p) => ({
      name: p.name,
      address: p.address,
      visitCount: p.metrics.find((m) => m.metric === metricNames.PROFILE_VISITS).value,
      interactionCount: p.metrics.find((m) => m.metric === metricNames.INTERACTIONS).value,
    }));
  }

  return insights;
};

export default transformInsights;
