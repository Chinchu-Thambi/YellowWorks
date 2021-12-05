import * as R from 'ramda';

import businessModel from './businessModel';

export const getPathMock = function getPath(path = []) { return R.path(path)(this.currentBusiness); };

const businessStoreModel = {
  currentBusiness: businessModel,
  getPath: jest.fn(getPathMock),
  getSubset: jest.fn(),
  saveBusinessChange: jest.fn(),
};

export default businessStoreModel;
