import React from 'react';
import { Router } from '@reach/router';

import Shopify from './scenes/Shopify';

const Connect = () => (
  <Router>
    <Shopify path="shopify/*" />
  </Router>
);

export default Connect;
