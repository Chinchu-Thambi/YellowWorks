/* global document window */
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import axios from 'axios';

import CalendarWhiteIcon from '../../../../assets/icons/light/calendar-white.svg';

import AuthContext from '../../../../components/Auth';
import Spinner from '../../../../components/Spinner';

const GraphContainer = styled.div`
  width: 100%;
  flex: 1;
`;

const ReportingToolBar = styled.div`
  top: 0;
  position: sticky;
  padding: 10px 5px;
  margin-top: -${({ theme }) => theme.space[2]};
  backdrop-filter: blur(5px);
  margin-bottom: 0 !important;
  background: rgba(255, 255, 255, 0.86);
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

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

const ViewingPeriod = styled.span`
  color: ${({ theme }) => theme.palette.contrast[2]};
`;

const DateIcon = styled.div`
  top: 0;
  right: 0;
  width: 40px;
  height: 100%;
  background: red;
  position: absolute;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  background-repeat: no-repeat;
  background-position: 10px 4px;
  background-image: url(${CalendarWhiteIcon});
  background-size: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.palette.contrast[1]};
`;

// formatDate: Year-Month-01
const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-01`;

// getMinDate: Get date from 2 Years ago until today
const getMinDate = () => {
  const twoYears = 2;
  const oneMonth = 1;
  const minDate = new Date(new Date().setFullYear(new Date().getFullYear() - twoYears));
  // Two years and subtracting one month, according to business rules.
  minDate.setMonth(new Date().getMonth() - oneMonth);
  return minDate;
};

// maxDate: get previous month
const maxDate = new Date(new Date().setMonth(new Date().getMonth() - 1));

const Insights = () => {
  const auth = React.useContext(AuthContext);

  const [signedReportUrl, setSignedReportUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [startDate, setStartDate] = useState(maxDate);
  const [reportDate, setReportDate] = useState(formatDate(maxDate));

  const [scriptNode, setScriptNode] = useState(undefined);
  const modeAnalyticsScriptId = 'modeAnalyticsEmbed';

  const handleChangeDate = (date) => {
    setScriptNode(undefined);
    setReportDate(formatDate(date));
    setStartDate(date);
    setLoading(true);
  };

  const renderModeAnalyticsLink = () => (
    <div>
      <a href={signedReportUrl} className="mode-embed">
        Go to report
      </a>
    </div>
  );

  useEffect(() => {
    const appendModeAnalyticsScript = () => {
      if (!scriptNode) {
        // ModeAnalytics required script
        const script = document.createElement('script');
        script.src = 'https://modeanalytics.com/embed/embed.js';
        script.async = true;
        script.id = modeAnalyticsScriptId;
        document.body.appendChild(script);
        setScriptNode(script);
      }
    };

    const getReportData = async ({ date }) => {
      const report = process.env.GATSBY_MODE_CUSTOMER_REPORT_URL_ID;
      const customer = auth.customerId;

      if (!customer) {
        setLoading(false);
        setError(true);
        return;
      }

      const query = `
        mutation {
          createSignedReportUrl(
            input: {
              report: "${report}",
              params: "{\\"date\\":\\"${date}\\"}"
            },
            customerId: "${customer}"
          )
        }
      `;

      const response = await axios.post(
        process.env.GATSBY_APPSYNC_URL,
        { query },
        {
          headers: {
            Authorization: auth.jwtToken,
          },
        },
      );

      const { data } = response;

      if (response && data.data && data.data.createSignedReportUrl) {
        setSignedReportUrl(data.data.createSignedReportUrl);

        // Remove loading
        setLoading(false);

        // Insert base script needed for Mode Analytics
        appendModeAnalyticsScript();
      }
    };

    // Get report
    if (auth && auth.jwtToken) {
      getReportData({
        date: reportDate, // reportDate is a formatted date Year-Month-Day
      });
    }

    return () => {
      // Clean up Mode Analytics variable
      if (window.modeanalized) window.modeanalized = undefined;
      if (scriptNode) scriptNode.remove();
    };
  }, [auth, error, reportDate, scriptNode]);

  return (
    <GraphContainer>
      <ReportingToolBar>
        <ViewingPeriod>Viewing performance for period: </ViewingPeriod>

        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <DateLabel htmlFor="insightsDatePicker">
          <DatePickerStyled
            id="insightsDatePicker"
            selected={startDate}
            onChange={(date) => handleChangeDate(date)}
            dateFormat="MM/yyyy"
            minDate={getMinDate()}
            maxDate={maxDate}
            disabled={loading}
            showMonthYearPicker
          />
          <DateIcon />
        </DateLabel>
      </ReportingToolBar>

      {loading && !error && (
        <div>
          <Spinner />
        </div>
      )}

      {error && (
        <p>
          An error has occurred.
          <br />
          Try refreshing the page, if the problem persists, contact support.
        </p>
      )}

      {!loading && !error && renderModeAnalyticsLink()}
    </GraphContainer>
  );
};

export default Insights;
