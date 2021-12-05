import * as R from 'ramda';

const normalizeBusinessEntity = R.evolve({
  locations: R.compose(
    R.filter(R.prop('id')),
    R.defaultTo([]),
  ),
  subscriptions: R.compose(
    R.map(R.prop('node')),
    R.defaultTo([]),
    R.prop('edges'),
  ),
});

export default normalizeBusinessEntity;
