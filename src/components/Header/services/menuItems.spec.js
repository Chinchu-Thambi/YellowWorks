import * as R from 'ramda';

import menuItems from './menuItems';

const flattenChildren = (items) => R.compose(
  R.flatten,
  R.map(
    R.ifElse(
      R.prop('children'),
      R.compose(
        R.evolve([
          R.omit(['children']),
          R.compose(
            flattenChildren,
            R.prop('children'),
          ),
        ]),
        R.repeat(R.__, 2),
      ),
      R.identity,
    ),
  ),
)(items);

describe('menuItems', () => {
  it('icons are valid', () => {
    const flattenMenu = flattenChildren(menuItems);
    const iconItems = R.filter((item) => 'iconSrc' in item)(flattenMenu);

    iconItems.forEach(({ iconSrc }) => {
      expect(iconSrc).toBeTruthy();
    });
  });
});
