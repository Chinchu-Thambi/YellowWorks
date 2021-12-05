import React from 'react';
import PropTypes from 'prop-types';

import clicksIcon from '../../../../../assets/icons/clicksIcon.png';
import leadsIcon from '../../../../../assets/icons/leadsIcon.png';
import viewsIcon from '../../../../../assets/icons/viewsIcon.png';

import { Metric, Icon } from './EstimatedPerformance.styled';

const EstimatedPerformance = (props) => {
  const {
    views,
    leads,
    clicks,
  } = props;
  return (
    <div>
      <h3>Estimated performance</h3>
      <p>Estimates are based on Yellow campaign, population & performance data</p>
      <Metric>
        <Icon src={viewsIcon} alt="Views Icon" />
        <p>Views per month</p>
        <strong>{views}</strong>
      </Metric>
      <Metric>
        <Icon src={leadsIcon} alt="Views Icon" />
        <p>Leads per month</p>
        <strong>{leads === 0 ? 1 : leads}</strong>
      </Metric>
      <Metric>
        <Icon src={clicksIcon} alt="Views Icon" />
        <p>Clicks per month</p>
        <strong>{clicks}</strong>
      </Metric>
    </div>
  );
};

EstimatedPerformance.defaultProps = {
  views: 1,
  leads: 1,
  clicks: 1,
};

EstimatedPerformance.propTypes = {
  views: PropTypes.number,
  leads: PropTypes.number,
  clicks: PropTypes.number,
};

export default EstimatedPerformance;
