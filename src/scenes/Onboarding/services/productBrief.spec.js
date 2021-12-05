/* globals describe, it, expect */

import { getSteps } from './productBrief';

describe('productBrief service', () => {
  describe('getSteps', () => {
    it('returns a step list for YPPREMIUM', () => {
      const skuList = [
        { value: 'YPPREMIUM' },
      ];

      const steps = getSteps({ skuList });

      expect(steps).not.toHaveLength(0);
      expect(
        steps.map(({ title }) => title),
      ).not.toContain('Category Boost');
    });

    it('includes a category boost step', () => {
      const skuList = [
        { value: 'YPPREMIUM' },
        { value: 'CBSILVER' },
      ];

      const steps = getSteps({ skuList });

      expect(steps).not.toHaveLength(0);
      expect(
        steps.map(({ title }) => title),
      ).toContain('Category Boost');
    });

    it('returns empty list if sku matches', () => {
      const skuList = [
        { value: 'IM NOT A SKU' },
      ];

      expect(getSteps({ skuList })).toHaveLength(0);
      expect(getSteps()).toHaveLength(0);
      expect(getSteps({})).toHaveLength(0);
    });
  });
});
