import { getMonthlyDimensions, getTimeseries, getScalarData } from './useInsights';

const mockMonthlyInsightsForDimension = {
  node: {
    id: 'QlVTSU5FU1MjSkVYd0xERFI3WTcwSHFnRmgxdkI3',
    insights: {
      edges: [
        {
          node: {
            metrics: [
              {
                name: 'Impressions',
                value: '60',
                dimensions: [
                  {
                    name: 'Channel',
                    value: 'Direct',
                  },
                ],
              },
              {
                name: 'Impressions',
                value: '65',
                dimensions: [
                  {
                    name: 'Channel',
                    value: 'Organic Search',
                  },
                ],
              },
              {
                name: 'Impressions',
                value: '40',
                dimensions: [
                  {
                    name: 'Channel',
                    value: 'Email',
                  },
                ],
              },
              {
                name: 'Impressions',
                value: '45',
                dimensions: [
                  {
                    name: 'Channel',
                    value: 'Social',
                  },
                ],
              },
            ],
            provider: 'WEBSITES',
            interval: 'MONTH',
            start: '2021-01',
            created: 1609459200,
          },
        },
      ],
    },
  },
};

const mockScalarData = {
  node: {
    id: 'QlVTSU5FU1MjSkVYd0xERFI3WTcwSHFnRmgxdkI3',
    insights: {
      edges: [
        {
          node: {
            metrics: [
              {
                name: 'Impressions',
                value: '240',
              },
            ],
            provider: 'WEBSITES',
            interval: 'MONTH',
            start: '2021-01',
            created: 1609459200,
          },
        },
      ],
    },
  },
};

const mockDailyInsights = {
  node: {
    insights: {
      edges: [
        {
          node: {
            metrics: [
              {
                name: 'Leads',
                value: '7',
              },
            ],
            provider: 'WEBSITES',
            interval: 'DAY',
            start: '2021-01-17',
            created: 1610881200,
          },
        },
        {
          node: {
            metrics: [
              {
                name: 'Leads',
                value: '5',
              },
            ],
            provider: 'WEBSITES',
            interval: 'DAY',
            start: '2021-01-18',
            created: 1610967600,
          },
        },
      ],
    },
  },
};

const mockBusinessWithNoInsights = {
  node: {
    insights: null,
  },
};

const mockBusinessWithEmptyInsights = {
  node: {
    insights: {
      edges: [],
    },
  },
};

describe('categorical data', () => {
  it('should extract label-value pairs for totals across a dimension over a specified month', () => {
    const expectedTransformedData = [
      {
        label: 'Direct',
        value: 60,
      },
      {
        label: 'Email',
        value: 40,
      },
      {
        label: 'Organic Search',
        value: 65,
      },
      {
        label: 'Social',
        value: 45,
      },
    ];
    const actualTransformedData = getMonthlyDimensions(mockMonthlyInsightsForDimension);
    expect(actualTransformedData).toEqual(expectedTransformedData);
  });

  it('works when there are no insights', () => {
    expect(getMonthlyDimensions(mockBusinessWithNoInsights)).toEqual([]);
    expect(getMonthlyDimensions(mockBusinessWithEmptyInsights)).toEqual([]);
  });
});

describe('time series data', () => {
  it('should extract x-y timeseries pairs', () => {
    const expectedTransformedData = [
      {
        x: 1610881200,
        y: 7,
      },
      {
        x: 1610967600,
        y: 5,
      },
    ];
    const actualTransformedData = getTimeseries(mockDailyInsights);
    expect(actualTransformedData).toEqual(expectedTransformedData);
  });

  it('works when there are no insights', () => {
    expect(getTimeseries(mockBusinessWithNoInsights)).toEqual([]);
    expect(getTimeseries(mockBusinessWithEmptyInsights)).toEqual([]);
  });
});

describe('scalar data', () => {
  it('should extract scalar value', () => {
    const actualTransformedData = getScalarData(mockScalarData);
    expect(actualTransformedData).toEqual(240);
  });

  it('works when there are no insights', () => {
    expect(getScalarData(mockBusinessWithNoInsights)).toEqual(null);
    expect(getScalarData(mockBusinessWithEmptyInsights)).toEqual(null);
  });
});
