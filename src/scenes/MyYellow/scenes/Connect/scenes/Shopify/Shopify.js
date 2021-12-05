import React from 'react';
import Loadable from 'react-loadable';
import { Router } from '@reach/router';

import Spinner from '../../../../../../components/Spinner';

const Status = Loadable({
  loader: () => import('./scenes/Status'),
  loading: Spinner,
});

const Install = Loadable({
  loader: () => import('./scenes/Install'),
  loading: Spinner,
});

const Confirm = Loadable({
  loader: () => import('./scenes/Confirm'),
  loading: Spinner,
});

const Shopify = () => (
  <>
    <h1>Connect Shopify</h1>
    <Router>
      <Status path="/" />
      <Install path="install" />
      <Confirm path="confirm" />
    </Router>
  </>
);

export default Shopify;
