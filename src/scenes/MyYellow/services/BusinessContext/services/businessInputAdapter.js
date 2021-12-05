import * as R from 'ramda';

const businessInputAdapter = R.compose(
  R.dissoc('subscriptions'),
  R.evolve({
    assets: R.compose(
      R.map(R.pick(['caption', 'contentUrl'])),
      R.defaultTo([]),
    ),
    details: R.evolve({
      sameAs: R.compose(
        R.filter(({ url }) => !!url),
        R.defaultTo([]),
      ),
    }),
    providerConfiguration: R.evolve({
      yellowWebsite: R.evolve({
        theme: R.compose(
          R.defaultTo('basic'),
        ),
      }),
    }),
  }),
);

export default businessInputAdapter;
