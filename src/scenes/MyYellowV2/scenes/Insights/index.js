import React from 'react';
import { Router } from '@reach/router';
import InsightsWebsiteScene from './InsightsWebsites';
import InsightsSceneContainerV2 from '../../../MyYellow/scenes/Insights/index.v2';

const InsightsHome = () => (
  <Router>
    <InsightsWebsiteScene path="website" />
    <InsightsSceneContainerV2 path="yellow-profile" />
  </Router>
);

export default InsightsHome;
