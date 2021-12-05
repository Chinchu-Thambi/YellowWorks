import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { monthIndexToString, utcDate } from '../../../../../util/formatting';
import MaterialCard from '../../../../MyYellow/components/MaterialCard';
import HorizontalBarChart from '../../../../MyYellow/scenes/Insights/components/data/charts/HorizontalBarChart';
import LineChart from '../../../../MyYellow/scenes/Insights/components/data/charts/LineChart';
import HeroMetric from '../../../../MyYellow/scenes/Insights/components/data/HeroMetric';
import useInsights from './services/useInsights';
import ActionableNotice from '../../../../../components/ActionableNotice';
import chartArt from './assets/chartart.svg';
import CardedSortableTable from '../../../../MyYellow/scenes/Insights/components/data/tables/CardedSortableTable';

const InsightsWebsitesScene = () => {
  const [startDateMillis, setStartDateMillis] = React.useState(null);

  const previousMonth = (date) => new Date(new Date(date).getFullYear(), new Date(date).getMonth() - 1, 0).getTime();

  const impressionsBySource = useInsights({
    provider: 'WEBSITE',
    interval: 'MONTH',
    metric: 'impressions',
    dimension: 'source',
    start: startDateMillis,
  });
  const impressionsByPage = useInsights({
    provider: 'WEBSITE',
    interval: 'MONTH',
    metric: 'impressions',
    dimension: 'page',
    start: startDateMillis,
  });
  const leadsBySource = useInsights({
    provider: 'WEBSITE',
    interval: 'MONTH',
    metric: 'leads',
    dimension: 'source',
    start: startDateMillis,
  });
  const leadsByTarget = useInsights({
    provider: 'WEBSITE',
    interval: 'MONTH',
    metric: 'leads',
    dimension: 'target',
    start: startDateMillis,
  });
  const interactionsByLink = useInsights({
    provider: 'WEBSITE',
    interval: 'MONTH',
    metric: 'interactions',
    dimension: 'link',
    start: startDateMillis,
  });
  const totalInteractions = useInsights({
    provider: 'WEBSITE',
    interval: 'MONTH',
    metric: 'interactions',
    dimension: null,
    start: startDateMillis,
  });
  const previousMonthTotalInteractions = useInsights({
    provider: 'WEBSITE',
    interval: 'MONTH',
    metric: 'interactions',
    dimension: null,
    start: previousMonth(startDateMillis),
  });
  const totalLeads = useInsights({
    provider: 'WEBSITE',
    interval: 'MONTH',
    metric: 'leads',
    dimension: null,
    start: startDateMillis,
  });
  const previousMonthTotalLeads = useInsights({
    provider: 'WEBSITE',
    interval: 'MONTH',
    metric: 'leads',
    dimension: null,
    start: previousMonth(startDateMillis),
  });
  const totalImpressions = useInsights({
    provider: 'WEBSITE',
    interval: 'MONTH',
    metric: 'impressions',
    dimension: null,
    start: startDateMillis,
  });
  const previousMonthTotalImpressions = useInsights({
    provider: 'WEBSITE',
    interval: 'MONTH',
    metric: 'impressions',
    dimension: null,
    start: previousMonth(startDateMillis),
  });
  const pageViewsOverTime = useInsights({
    provider: 'WEBSITE',
    interval: 'DAY',
    metric: 'impressions',
    dimension: 'source',
    start: startDateMillis,
  });

  const anyDataIsStillLoading = () => useInsights.loading
    || impressionsBySource.loading
    || impressionsByPage.loading
    || leadsBySource.loading
    || leadsByTarget.loading
    || interactionsByLink.loading
    || totalInteractions.loading
    || totalLeads.loading
    || totalImpressions.loading
    || pageViewsOverTime.loading;

  return (
    <div className="space-y-3 relative">
      {/* // TODO refactor */}
      <MaterialCard className="flex justify-between items-center sticky top-0 z-50 overflow-visible">
        <h2 className="local-reset text-xs sm:text-lg">
          Website <span className="font-normal">Insights</span>
        </h2>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label id="selectMonthLabel" htmlFor="insightsDatePicker" className="flex items-center space-x-2">
          <div className="font-bold w-full hidden sm:block">Select a month</div>
          <div className="relative flex items-center w-full">
            <DatePicker
              disabled={anyDataIsStillLoading()}
              id="insightsDatePicker"
              selected={startDateMillis}
              onChange={(arg) => setStartDateMillis(arg.getTime())}
              dateFormat="MMM yyyy"
              minDate={utcDate(2020, 2, 1)}
              maxDate={new Date()}
              showMonthYearPicker
              title="Date to view customer analytics from"
              ariaLabelledBy="selectMonthLabel"
            />
            <FontAwesomeIcon icon={faCalendarAlt} className="absolute" style={{ right: '10px' }} />
          </div>
        </label>
      </MaterialCard>
      {!startDateMillis && (
        <div className="bg-base-100 px-4 py-8 rounded-md">
          <ActionableNotice
            art={{
              image: chartArt,
              scalePercent: 15,
            }}
            title="Website Insights"
            text="Select a month to see your Website's key insights"
          />
        </div>
      )}
      {startDateMillis && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <HeroMetric
              value={totalImpressions.data}
              loading={totalImpressions.loading || previousMonthTotalImpressions.loading}
              label="Impressions"
              change={totalImpressions.data - previousMonthTotalImpressions.data}
            />
            <HeroMetric
              value={totalLeads.data}
              loading={totalLeads.loading || previousMonthTotalLeads.loading}
              label="Leads"
              change={totalLeads.data - previousMonthTotalLeads.data}
            />
            <HeroMetric
              value={totalInteractions.data}
              loading={totalInteractions.loading || previousMonthTotalInteractions.loading}
              label="Interactions"
              change={totalInteractions.data - previousMonthTotalInteractions.data}
            />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            <HorizontalBarChart
              title="Impressions by Page"
              label="Impressions by Page"
              data={impressionsByPage.data?.map((d) => ({
                label: d.label.replace('/', '') || 'Home',
                value: d.value,
              }))}
              loading={impressionsByPage.loading}
              xAxisLabel="Impressions"
              color={2}
            />
            <CardedSortableTable
              title="Impressions by Source"
              data={impressionsBySource.data}
              columns={[
                {
                  label: 'Source',
                  accessorKey: 'label',
                },
                {
                  label: 'Impressions',
                  accessorKey: 'value',
                },
              ]}
              initialSortBy="value"
            />
            <CardedSortableTable
              title="Leads by Source"
              data={leadsBySource.data}
              columns={[
                {
                  label: 'Source',
                  accessorKey: 'label',
                },
                {
                  label: 'Leads',
                  accessorKey: 'value',
                },
              ]}
              initialSortBy="value"
            />
            <HorizontalBarChart
              title="Leads by Target"
              label="Leads by Target"
              data={leadsByTarget.data}
              loading={leadsByTarget.loading}
              xAxisLabel="Leads"
              color={1}
            />
            <LineChart
              title="Page Views"
              yDataSeriesName="Page Views"
              data={pageViewsOverTime.data}
              loading={pageViewsOverTime.loading}
              formatX={(timestamp) => `${new Date(timestamp * 1000).getDate()} ${monthIndexToString(new Date(timestamp * 1000).getMonth())}`}
            />
            <HorizontalBarChart
              title="Top Interactions"
              label="Interactions"
              data={interactionsByLink.data}
              loading={interactionsByLink.loading}
              xAxisLabel="Interactions"
              color={4}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default InsightsWebsitesScene;
