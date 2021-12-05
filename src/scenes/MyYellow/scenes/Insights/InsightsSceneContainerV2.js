import React from 'react';
import { Flex, Text } from 'rebass/styled-components';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import * as R from 'ramda';

import theme from '../../../../util/theme';
import AuthContext from '../../../../components/Auth';
import CalendarWhiteIcon from '../../../../assets/icons/light/calendar-white.svg';
import Spinner from '../../../../components/Spinner';

import InsightsScene from './InsightsSceneV2';
import transformInsights from './services/transformInsights';
import { formatYYYYdashMM, formatYYYYMM, utcDate } from '../../../../util/formatting';
import NoInsightsFoundMessage from './components/NoInsightsFoundMessage';

const INSIGHTS_GRAPHQL_ENDPOINT = process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT;

const MIN_DATE_UTC = utcDate(2020, 3, 1); // April 2020

const DatePickerStyled = styled(DatePicker)`
  width: 100%;
  text-align: left;
`;

const DateLabel = styled.label`
  width: 220px;
  cursor: pointer;
  position: relative;
  display: inline-block;

  .react-datepicker-wrapper {
    width: 100%;
  }
`;

const DateIcon = styled.div`
  top: 0;
  right: 0;
  width: 40px;
  height: 100%;
  background: ${theme.palette.accent[0][0]};
  position: absolute;
  border-top-right-radius: ${theme.radii[2]};
  border-bottom-right-radius: ${theme.radii[2]};
  background-repeat: no-repeat;
  background-position: ${theme.space[2]} ${theme.space[1]};
  background-image: url(${CalendarWhiteIcon});
  background-size: ${theme.space[3]};
  background-color: ${theme.palette.contrast[1]};
`;

export const monthsToMinimum = ({ fromDateUTC, minDateUTC }) => {
  const dates = [];
  let currentIterationDateUTC = new Date(fromDateUTC.getTime());

  while (minDateUTC.getTime() <= currentIterationDateUTC.getTime()) {
    dates.push(currentIterationDateUTC);
    currentIterationDateUTC = utcDate(currentIterationDateUTC.getFullYear(), currentIterationDateUTC.getMonth() - 1, 1);
  }
  return dates;
};

const customerFragment = ({ withSubscription = false }) => {
  let query = `
  ... on Customer {
    id
    insights {
      edges {
        node {
          dimension {
            name
            value
          }
          metric {
            name
            type
            value
          }
          namespace
          statistic
          timestamp
`;

  if (withSubscription) {
    query += `subscription {
                productSummary {
                  configuration
                }
                businessProfileSummary {
                  locationSummary {
                    id
                  }
                  name
                }
            }
`;
  }

  query += `
        }
      }
    }
  }
  `;

  return query;
};

const insightKey = (dateUTC) => `key${formatYYYYMM(dateUTC)}`;

const insightsQuery = ({ dateUTC, withSubscription = false }) => `${insightKey(
  dateUTC,
)}: getCustomerInsights(id: "", monthYear: "${formatYYYYdashMM(dateUTC)}") {
    ${customerFragment({ withSubscription })}
  }
`;

const insightsGroupQuery = ({ dateUTC, minDateUTC, withSubscription = false }) => {
  let query = `query CustomerInsights {
  `;

  const historicalMonths = monthsToMinimum({ fromDateUTC: dateUTC, minDateUTC });

  historicalMonths.forEach((date) => {
    query += insightsQuery({ dateUTC: date, withSubscription });
  });

  query += `
  }
  `;
  return query;
};

const InsightsSceneContainer = () => {
  const { customerId, jwtToken } = React.useContext(AuthContext) || {};
  const [startDate, setStartDate] = React.useState(utcDate(new Date().getFullYear(), new Date().getMonth() - 1, 1)); // load insights for previous month on load.
  const [selectedMonthInsights, setSelectedMonthInsights] = React.useState();
  const [historicalInsights, setHistoricalInsights] = React.useState();
  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [
    encounteredServerErrorOnLoadingSelectedMonthData,
    setEncounteredServerErrorOnLoadingSelectedMonthData,
  ] = React.useState(false);

  const resetStateBeforeDataLoad = () => {
    setSelectedMonthInsights(null);
    setEncounteredServerErrorOnLoadingSelectedMonthData(false);
    setIsLoadingData(true);
  };

  React.useEffect(() => {
    // async method to consturct and execute query
    const constructQueryAndFetchData = async () => {
      resetStateBeforeDataLoad();
      const selectedMonthDataResponse = await axios
        .post(
          INSIGHTS_GRAPHQL_ENDPOINT,
          { query: insightsGroupQuery({ dateUTC: startDate, minDateUTC: startDate, withSubscription: true }) },
          { headers: { Authorization: jwtToken } },
        )
        .catch(() => setEncounteredServerErrorOnLoadingSelectedMonthData(true));

      const selectedMonthData = transformInsights({
        metrics: selectedMonthDataResponse?.data?.data[insightKey(startDate)].insights?.edges?.map((e) => e.node),
      });
      setIsLoadingData(false);
      setSelectedMonthInsights(selectedMonthData);
    };

    if (customerId && jwtToken && startDate) {
      constructQueryAndFetchData();
    }
  }, [customerId, jwtToken, startDate]);

  React.useEffect(() => {
    // async method to consturct and execute query
    const constructQueryAndFetchData = async () => {
      resetStateBeforeDataLoad();
      const historicalDataResponse = await axios.post(
        INSIGHTS_GRAPHQL_ENDPOINT,
        {
          query: insightsGroupQuery({
            dateUTC: utcDate(startDate.getFullYear(), startDate.getMonth(), 1),
            minDateUTC: MIN_DATE_UTC,
            withSubscription: false,
          }),
        },
        { headers: { Authorization: jwtToken } },
      );
      // TODO do we need a separate message for no HISTORICAL insights?
      // .catch(() => setEncounteredServerErrorOnLoadingSelectedMonthData(true));

      const historicalKeys = Object.keys(historicalDataResponse?.data?.data);
      const historicalData = historicalKeys
        .map((key) => historicalDataResponse?.data?.data[key].insights.edges?.map((f) => f.node))
        .map((historicalMonthMetrics) => transformInsights({ metrics: historicalMonthMetrics, withSubscriptionProfiles: false }));

      const historicalSearchAppearances = historicalData.map((h) => h.searchAppearances[0]);
      const historicalProfileInteractions = historicalData.map((h) => h.profileInteractions[0]);
      const historicalProfileVisits = historicalData.map((h) => h.profileVisits[0]);

      setIsLoadingData(false);
      setHistoricalInsights({
        searchAppearances: historicalSearchAppearances,
        profileInteractions: historicalProfileInteractions,
        profileVisits: historicalProfileVisits,
      });
    };

    if (customerId && jwtToken && startDate) {
      constructQueryAndFetchData();
    }
  }, [customerId, jwtToken, startDate]);

  const maxDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1, 0, 0);

  return (
    <Flex flexDirection="column" flex={1}>
      {/* period selection controls */}
      <Flex
        justifyContent="center"
        alignItems="center"
        p={3}
        mb={2}
        fontSize={[0, 1]}
        fontWeight={theme.fontWeight[1]}
        borderRadius={theme.radii[2]}
        backgroundColor={theme.palette.contrast[5]}
      >
        <Text id="performanceSinceLabel" mr={2}>
          Performance for
        </Text>
        <DateLabel htmlFor="insightsDatePicker">
          <DatePickerStyled
            disabled={isLoadingData}
            style={{ width: '100%', textAlign: 'left' }}
            id="insightsDatePicker"
            selected={startDate}
            onChange={(date) => setStartDate(utcDate(date.getFullYear(), date.getMonth(), 1))}
            dateFormat="yyyy-MM"
            minDate={MIN_DATE_UTC}
            maxDate={maxDate}
            showMonthYearPicker
            title="Date to view customer analytics from"
            ariaLabelledBy="performanceSinceLabel"
          />
          <DateIcon disabled={isLoadingData} />
        </DateLabel>
      </Flex>

      {isLoadingData && (
        <Flex my={[10, 100]} flexDirection="column" alignItems="center" justifyContent="center">
          <Spinner />
          <Text mt={5} fontSize={[0, 1]} fontWeight="bold">
            Hang tight, we&apos;re fetching your insights.
          </Text>
        </Flex>
      )}

      {encounteredServerErrorOnLoadingSelectedMonthData
      || R.isEmpty(selectedMonthInsights)
      || typeof customerId === 'undefined' ? (
        <NoInsightsFoundMessage />
        ) : (
          selectedMonthInsights && (
          <InsightsScene selectedMonthInsights={selectedMonthInsights} historicalInsights={historicalInsights} />
          )
        )}
    </Flex>
  );
};

export default InsightsSceneContainer;
