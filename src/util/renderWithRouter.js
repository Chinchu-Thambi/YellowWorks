import React from 'react';
import { render } from '@testing-library/react';
import { createHistory, createMemorySource, LocationProvider } from '@reach/router';

const renderWithRouter = (
  ui,
  { route = '/', history = createHistory(createMemorySource(route)) } = {},
) => ({
  ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
  // adding `history` to the returned utilities to allow us
  // to reference it in our tests (just try to avoid using
  // this to test implementation details).
  history,
});

export default renderWithRouter;
