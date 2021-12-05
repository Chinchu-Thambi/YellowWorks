import React from 'react';
import { Flex } from 'rebass/styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { PropTypes } from 'prop-types';

import HeroMetric from './components/data/HeroMetric';
import theme from '../../../../util/theme';

// TODO replace sample icon with proper icon
// import sampleicon from '../../../../assets/icons/SEOsetup.png';
import HorizontalBarChart from './components/data/charts/HorizontalBarChart';
import CardedSortableTable from './components/data/tables/CardedSortableTable';
import LineChart from './components/data/charts/LineChart';

import SectionHeader from './SectionHeader';
import { formatDateToMonthYear } from '../../../../util/formatting';
import ActionableNotice from './components/ActionableNotice';
import MaterialCard from '../../components/MaterialCard';
import analyticsArtwork from '../../../../assets/icons/analytics-profile.svg';

const customerProfilesTableColumns = [
  {
    label: 'Trading Name',
    accessorKey: 'name',
  },
  {
    label: 'Listing Address',
    accessorKey: 'address',
  },
  {
    label: 'Visits',
    accessorKey: 'visitCount',
  },
  {
    label: 'Interactions',
    accessorKey: 'interactionCount',
  },
];

const commonGridSettings = {
  gridGap: 3,
  pb: 3,
  px: 3,
  flexDirection: ['column', 'row', 'row'],
};

// export const fetchSecondToLast = (key) => R.compose(R.map(R.prop('y')), R.prop(key), R.reverse, R.takeLast(2));

export const fetchSecondToLast = (prop, subProp) => (insights) => {
  if (!insights) {
    return undefined;
  }
  let arr = insights[prop];
  if (arr && arr.length >= 2) {
    arr = arr.sort((a, b) => a.x - b.x);
    return arr[arr.length - 2][subProp];
  }
  return undefined;
};

export const fetchLast = (prop, subProp) => (insights) => {
  if (!insights) {
    return undefined;
  }
  let arr = insights[prop];
  if (arr && arr.length >= 1) {
    arr = arr.sort((a, b) => a.x - b.x);
    return arr[arr.length - 1][subProp];
  }
  return undefined;
};

const InsightsScene = ({ selectedMonthInsights, historicalInsights }) => {
  const lastSA = fetchLast('searchAppearances', 'y')(selectedMonthInsights);
  const lastPV = fetchLast('profileVisits', 'y')(selectedMonthInsights);
  const lastPI = fetchLast('profileInteractions', 'y')(selectedMonthInsights);
  const penultimateSA = fetchSecondToLast('searchAppearances', 'y')(historicalInsights);
  const penultimatePV = fetchSecondToLast('profileVisits', 'y')(historicalInsights);
  const penultimatePI = fetchSecondToLast('profileInteractions', 'y')(historicalInsights);

  return (
    <Flex
      as="main"
      flexDirection="column"
      backgroundColor={theme.palette.contrast[5]}
      borderRadius={theme.radii[2]}
      pt={3}
    >
      {selectedMonthInsights && (
        <>
          {/* row 1 -> 3 main metrics */}
          <Flex role="region" sx={commonGridSettings} justifyContent="space-between" alignItems="stretch">
            <HeroMetric label="Search Appearances" value={lastSA} change={lastSA - penultimateSA} />
            <HeroMetric label="Profile Visits" value={lastPV} change={lastPV - penultimatePV} />
            <HeroMetric label="Profile Interactions" value={lastPI} change={lastPI - penultimatePI} />
          </Flex>

          {/* row 3 -> recommendation and table */}
          <SectionHeader title="Detailed Insights" />
          <Flex role="region" sx={commonGridSettings} justifyContent="space-between" alignItems="center">
            <HorizontalBarChart
              title="Performance by Category"
              xAxisLabel="Search appearances"
              data={selectedMonthInsights.performanceByCategory}
            />
            <HorizontalBarChart
              title="Interaction Breakdown"
              xAxisLabel="Total interactions"
              data={selectedMonthInsights.interactions}
            />
          </Flex>

          {/* row 3 -> recommendation and table */}
          <Flex role="region" sx={commonGridSettings}>
            <MaterialCard minHeight="400px" flex={[1, 1]} display="flex" flexDirection="column" justifyContent="center">
              <ActionableNotice
                art={{
                  image: analyticsArtwork,
                  scalePercent: 30,
                }}
                title="Premium profiles get more views"
                text="Click below to learn more about all the advantages a Yellow Premium profile gives you."
                action={{
                  text: 'Learn more',
                  href: 'https://yellow.co.nz/our-products/yellow-profile/#yellow-choose-your-profile',
                }}
              />
            </MaterialCard>
            <Flex flex={[1, 2]}>
              <CardedSortableTable
                title="Performance by Yellow Profile"
                data={selectedMonthInsights.profiles}
                columns={customerProfilesTableColumns}
                initialSortBy="visitCount"
              />
            </Flex>
          </Flex>
        </>
      )}

      {historicalInsights && (
        <>
          <SectionHeader title="Historical Insights" />
          {/* row 4 -> lifetime metrics and line chart */}
          <Flex role="region" sx={commonGridSettings} justifyContent="space-between">
            {/* <Flex sx={{ gridGap: 3, flexDirection: 'column' }}> */}
            <Flex>
              <HeroMetric
                label="Total Business Reviews"
                sublabel="(Lifetime)"
                value={selectedMonthInsights.lifetimeReviewsCount}
              />
              {/* // TODO re-enable once backend endpoint for averages is ready */}
              {/* <HeroMetric
                label="Average Review Rating"
                sublabel="(Lifetime)"
                value={selectedMonthInsights.lifetimeAverageReviewRating}
                valueIsDecimal
              /> */}
            </Flex>
            <Flex flex={2}>
              <LineChart
                title="Search Appearances"
                yDataSeriesName="Search appearances"
                data={historicalInsights.searchAppearances}
                formatX={(x) => formatDateToMonthYear(new Date(x * 1000))}
              />
            </Flex>
          </Flex>
          {/* row 4 -> lifetime metrics and line chart */}
          <Flex role="region" sx={commonGridSettings} justifyContent="space-between" alignItems="center">
            <LineChart
              title="Profile Visits"
              yDataSeriesName="Profile visits"
              data={historicalInsights.profileVisits}
              formatX={(x) => formatDateToMonthYear(new Date(x * 1000))}
            />
            <LineChart
              title="Profile Interactions"
              yDataSeriesName="Interactions"
              data={historicalInsights.profileInteractions}
              formatX={(x) => formatDateToMonthYear(new Date(x * 1000))}
            />
          </Flex>
        </>
      )}
    </Flex>
  );
};

InsightsScene.propTypes = {
  selectedMonthInsights: PropTypes.shape({
    searchAppearances: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    ).isRequired,
    profileInteractions: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    ).isRequired,
    profileVisits: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    ).isRequired,
    interactions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number,
      }),
    ).isRequired,
    performanceByCategory: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number,
      }),
    ).isRequired,

    lifetimeReviewsCount: PropTypes.number.isRequired,
    lifetimeAverageReviewRating: PropTypes.number.isRequired,

    profiles: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        visitCount: PropTypes.number.isRequired,
        interactionCount: PropTypes.number.isRequired,
      }),
    ),
  }).isRequired,
  historicalInsights: PropTypes.shape({
    searchAppearances: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    ).isRequired,
    profileInteractions: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    ).isRequired,
    profileVisits: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    ).isRequired,
  }),
};

InsightsScene.defaultProps = {
  historicalInsights: undefined,
};

export default InsightsScene;
