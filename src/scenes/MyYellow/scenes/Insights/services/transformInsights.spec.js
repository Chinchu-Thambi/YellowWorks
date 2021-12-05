/* globals describe it expect */

import * as R from 'ramda';

import transformInsights, {
  discrete,
  continuous,
  sum,
  average,
  metricNames,
  dimensionTypes,
  profiles,
} from './transformInsights';

import largeTestMetricsSet from './largeTestMetricsSet';

describe('Metrics processing functions', () => {
  describe('Metrics aggregation', () => {
    const metrics = [
      {
        dimension: null,
        metric: {
          name: 'Search Appearances',
          type: 'INT',
          value: '34',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '92B',
                streetAddress: 'Russley Road',
                sublocality: 'Russley',
                subpremise: null,
                premise: null,
                postalCode: '9320',
                country: 'NZ',
                administrativeArea: 'Canterbury',
                floor: null,
              },
              id: '9e5e1ee9-1201-42c6-ad0d-5802f8b09517',
            },
            name: 'Spark Christchurch',
          },
        },
      },
      {
        dimension: {
          name: 'Category',
          value: 'RELEVANCY',
        },
        metric: {
          name: 'Search Appearances',
          type: 'INT',
          value: '8',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '92B',
                streetAddress: 'Russley Road',
                sublocality: 'Russley',
                subpremise: null,
                premise: null,
                postalCode: '9320',
                country: 'NZ',
                administrativeArea: 'Canterbury',
                floor: null,
              },
              id: '9e5e1ee9-1201-42c6-ad0d-5802f8b09517',
            },
            name: 'Spark Christchurch',
          },
        },
      },
      {
        dimension: {
          name: 'Category',
          value: 'Telecommunications',
        },
        metric: {
          name: 'Search Appearances',
          type: 'INT',
          value: '26',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '92B',
                streetAddress: 'Russley Road',
                sublocality: 'Russley',
                subpremise: null,
                premise: null,
                postalCode: '9320',
                country: 'NZ',
                administrativeArea: 'Canterbury',
                floor: null,
              },
              id: '9e5e1ee9-1201-42c6-ad0d-5802f8b09517',
            },
            name: 'Spark Christchurch',
          },
        },
      },
      {
        dimension: {
          name: 'Interaction Type',
          value: 'phoneClicks',
        },
        metric: {
          name: 'Interactions',
          type: 'INT',
          value: '2',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '92B',
                streetAddress: 'Russley Road',
                sublocality: 'Russley',
                subpremise: null,
                premise: null,
                postalCode: '9320',
                country: 'NZ',
                administrativeArea: 'Canterbury',
                floor: null,
              },
              id: '9e5e1ee9-1201-42c6-ad0d-5802f8b09517',
            },
            name: 'Spark Christchurch',
          },
        },
      },
      {
        dimension: null,
        metric: {
          name: 'Interactions',
          type: 'INT',
          value: '36',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '251',
                streetAddress: 'Broadway Ave',
                sublocality: null,
                subpremise: 'Shop 3',
                premise: null,
                postalCode: '4414',
                country: 'NZ',
                administrativeArea: 'Otago',
                floor: null,
              },
              id: '78d3aa72-7e99-4d1f-94b9-36a625644010',
            },
            name: 'Spark Broadway, Palmerston North ',
          },
        },
      },
      {
        dimension: null,
        metric: {
          name: 'Profile Visits',
          type: 'INT',
          value: '70',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '251',
                streetAddress: 'Broadway Ave',
                sublocality: null,
                subpremise: 'Shop 3',
                premise: null,
                postalCode: '4414',
                country: 'NZ',
                administrativeArea: 'Otago',
                floor: null,
              },
              id: '78d3aa72-7e99-4d1f-94b9-36a625644010',
            },
            name: 'Spark Broadway, Palmerston North ',
          },
        },
      },
      {
        dimension: null,
        metric: {
          name: 'Search Appearances',
          type: 'INT',
          value: '14',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '251',
                streetAddress: 'Broadway Ave',
                sublocality: null,
                subpremise: 'Shop 3',
                premise: null,
                postalCode: '4414',
                country: 'NZ',
                administrativeArea: 'Otago',
                floor: null,
              },
              id: '78d3aa72-7e99-4d1f-94b9-36a625644010',
            },
            name: 'Spark Broadway, Palmerston North ',
          },
        },
      },
      {
        dimension: {
          name: 'Category',
          value: 'RELEVANCY',
        },
        metric: {
          name: 'Search Appearances',
          type: 'INT',
          value: '2',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '251',
                streetAddress: 'Broadway Ave',
                sublocality: null,
                subpremise: 'Shop 3',
                premise: null,
                postalCode: '4414',
                country: 'NZ',
                administrativeArea: 'Otago',
                floor: null,
              },
              id: '78d3aa72-7e99-4d1f-94b9-36a625644010',
            },
            name: 'Spark Broadway, Palmerston North ',
          },
        },
      },
      {
        dimension: {
          name: 'Category',
          value: 'Telecommunications',
        },
        metric: {
          name: 'Search Appearances',
          type: 'INT',
          value: '12',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '251',
                streetAddress: 'Broadway Ave',
                sublocality: null,
                subpremise: 'Shop 3',
                premise: null,
                postalCode: '4414',
                country: 'NZ',
                administrativeArea: 'Otago',
                floor: null,
              },
              id: '78d3aa72-7e99-4d1f-94b9-36a625644010',
            },
            name: 'Spark Broadway, Palmerston North ',
          },
        },
      },
      {
        dimension: {
          name: 'Interaction Type',
          value: 'getDirectionsClicks',
        },
        metric: {
          name: 'Interactions',
          type: 'INT',
          value: '8',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '251',
                streetAddress: 'Broadway Ave',
                sublocality: null,
                subpremise: 'Shop 3',
                premise: null,
                postalCode: '4414',
                country: 'NZ',
                administrativeArea: 'Otago',
                floor: null,
              },
              id: '78d3aa72-7e99-4d1f-94b9-36a625644010',
            },
            name: 'Spark Broadway, Palmerston North ',
          },
        },
      },
      {
        dimension: null,
        metric: {
          name: 'Average Rating Review (Lifetime)',
          type: 'FLOAT',
          value: '3.5',
        },
        namespace: 'YOL',
        statistic: 'AVERAGE',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '251',
                streetAddress: 'Broadway Ave',
                sublocality: null,
                subpremise: 'Shop 3',
                premise: null,
                postalCode: '4414',
                country: 'NZ',
                administrativeArea: 'Otago',
                floor: null,
              },
              id: '78d3aa72-7e99-4d1f-94b9-36a625644010',
            },
            name: 'Spark Broadway, Palmerston North ',
          },
        },
      },
      {
        dimension: null,
        metric: {
          name: 'Average Rating Review (Lifetime)',
          type: 'FLOAT',
          value: '4.5',
        },
        namespace: 'YOL',
        statistic: 'AVERAGE',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '42',
                streetAddress: 'Willis Street',
                sublocality: 'Wellington Central',
                subpremise: null,
                premise: null,
                postalCode: '6011',
                country: 'NZ',
                administrativeArea: 'Wellington',
                floor: null,
              },
              id: '802132e4-0d4a-43f1-81c8-ca9ea3cb8137',
            },
            name: 'Spark Willis Street',
          },
        },
      },
      {
        dimension: null,
        metric: {
          name: 'Average Rating Review (Lifetime)',
          type: 'FLOAT',
          value: '4',
        },
        namespace: 'YOL',
        statistic: 'AVERAGE',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '214',
                streetAddress: 'High Street',
                sublocality: null,
                subpremise: null,
                premise: null,
                postalCode: '4610',
                country: 'NZ',
                administrativeArea: 'Taranaki',
                floor: null,
              },
              id: '444b649f-e977-4fd2-b06c-2d0d24b20083',
            },
            name: 'Spark Hawera',
          },
        },
      },
    ];

    it('should sum metrics across subscriptions - dimensionless', () => {
      expect(sum(metricNames.SEARCH_APPEARANCES)(metrics)).toBe(48);
      expect(sum(metricNames.INTERACTIONS)(metrics)).toBe(36);
      expect(sum(metricNames.PROFILE_VISITS)(metrics)).toBe(70);
    });

    it('should sum metrics across subscriptions - edge cases', () => {
      expect(sum(metricNames.SEARCH_APPEARANCES)([])).toBe(0);
      expect(sum(metricNames.SEARCH_APPEARANCES)(null)).toBeFalsy();
    });

    it('should sum metrics across subscriptions - with dimension', () => {
      expect(sum(metricNames.INTERACTIONS, dimensionTypes.INTERACTION_TYPE)(metrics)).toBe(10);
      expect(sum(metricNames.SEARCH_APPEARANCES, dimensionTypes.CATEGORY)(metrics)).toBe(48);
      expect(sum(metricNames.PROFILE_VISITS, dimensionTypes.CATEGORY)(metrics)).toBe(0);
      expect(sum(metricNames.PROFILE_VISITS, dimensionTypes.INTERACTION_TYPE)(metrics)).toBe(0);
    });

    it('should average metrics across subscriptions', () => {
      expect(average(metricNames.LIFETIME_AVERAGE_RATING)(metrics)).toBe(4);
    });

    it('should average metrics across subscriptions - edge cases', () => {
      expect(average(metricNames.LIFETIME_AVERAGE_RATING)([])).toBeFalsy();
      expect(average(metricNames.LIFETIME_AVERAGE_RATING)(null)).toBeFalsy();
    });
  });

  describe('Metrics timeseries data extraction', () => {
    const metricsTimeseries = [
      {
        dimension: null,
        metric: {
          name: 'Search Appearances',
          type: 'INT',
          value: '34',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000, // month 1
      },
      {
        dimension: null,
        metric: {
          name: 'Search Appearances',
          type: 'INT',
          value: '10',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000, // month 1
      },
      {
        dimension: null,
        metric: {
          name: 'Search Appearances',
          type: 'INT',
          value: '21',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1635434525, // month 2
      },
      {
        dimension: null,
        metric: {
          name: 'Search Appearances',
          type: 'INT',
          value: '15',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1635434525, // month 2
      },
      {
        dimension: {
          name: 'Category',
          value: 'RELEVANCY',
        },
        metric: {
          name: 'Search Appearances',
          type: 'INT',
          value: '8',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
      },
      {
        dimension: {
          name: 'Interaction Type',
          value: 'phoneClicks',
        },
        metric: {
          name: 'Interactions',
          type: 'INT',
          value: '2',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
      },
      {
        dimension: null,
        metric: {
          name: 'Interactions',
          type: 'INT',
          value: '36',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
      },
      {
        dimension: null,
        metric: {
          name: 'Interactions',
          type: 'INT',
          value: '12',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1635434525,
      },
      {
        dimension: null,
        metric: {
          name: 'Interactions',
          type: 'INT',
          value: '18',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
      },
      {
        dimension: null,
        metric: {
          name: 'Interactions',
          type: 'INT',
          value: '20',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1635434525,
      },
    ];

    it('should extract continuous metrics - search appearances', () => {
      expect(continuous('Search Appearances')(metricsTimeseries).sort((a, b) => a.x - b.x)).toEqual(
        [
          {
            x: 1596240000,
            y: 44, // 34 + 10
          },
          {
            x: 1635434525,
            y: 36, // 21 + 15
          },
        ].sort((a, b) => a.x - b.x),
      );
    });

    it('should extract continuous metrics - interactions', () => {
      expect(continuous('Interactions')(metricsTimeseries).sort((a, b) => a.x - b.x)).toEqual(
        [
          {
            x: 1596240000,
            y: 54, // 36 + 18
          },
          {
            x: 1635434525,
            y: 32, // 12 + 22
          },
        ].sort((a, b) => a.x - b.x),
      );
    });

    it('should extract continuous metrics - edge cases', () => {
      expect(continuous('Search Appearances')([])).toEqual([]);
      expect(continuous('Search Appearances')(null)).toEqual([]);
    });
  });

  describe('Extracting profile data for multiple subscriptions', () => {
    const profile = ({
      metricName, metricValue, timestamp, store,
    }) => ({
      dimension: null,
      metric: {
        name: metricName,
        type: 'INT',
        value: metricValue,
      },
      namespace: 'YOL',
      statistic: 'COUNT',
      timestamp,
      subscription: {
        productSummary: {
          configuration: JSON.stringify({
            name: store.subscriptionName,
            location: `${store.streetNumber} ${store.streetName}, ${store.town} ${store.postalCode}`,
          }),
        },
        productOptionSummary: [],
        businessProfileSummary: {
          locationSummary: {
            id: store.subscriptionID,
          },
        },
      },
    });

    it('should extract profiles with requested metrics', () => {
      const store1 = {
        streetNumber: '2',
        streetName: 'Some St',
        town: 'Sometown',
        postalCode: '1234',
        subscriptionID: 'jalfj24984f',
        subscriptionName: 'Foo Store Sometown',
      };

      const store2 = {
        streetNumber: '5',
        streetName: 'Another St',
        town: 'Anothertown',
        postalCode: '4321',
        subscriptionID: 'zsd40525nf032',
        subscriptionName: 'Foo Store Anothertown',
      };

      const metricsWithMultipleProfiles = [
        profile({
          metricName: metricNames.INTERACTIONS,
          metricValue: '12',
          timestamp: 123123123,
          store: store1,
        }),
        profile({
          metricName: metricNames.INTERACTIONS,
          metricValue: '6',
          timestamp: 123123123,
          store: store1,
        }),
        profile({
          metricName: metricNames.INTERACTIONS,
          metricValue: '21',
          timestamp: 123123123,
          store: store2,
        }),
        profile({
          metricName: metricNames.INTERACTIONS,
          metricValue: '15',
          timestamp: 123123123,
          store: store2,
        }),
        profile({
          metricName: metricNames.PROFILE_VISITS,
          metricValue: '112',
          timestamp: 123123123,
          store: store1,
        }),
        profile({
          metricName: metricNames.PROFILE_VISITS,
          metricValue: '16',
          timestamp: 123123123,
          store: store1,
        }),
        profile({
          metricName: metricNames.PROFILE_VISITS,
          metricValue: '121',
          timestamp: 123123123,
          store: store2,
        }),
        profile({
          metricName: metricNames.PROFILE_VISITS,
          metricValue: '115',
          timestamp: 123123123,
          store: store2,
        }),
      ];

      expect(profiles([metricNames.PROFILE_VISITS, metricNames.INTERACTIONS])(metricsWithMultipleProfiles)).toEqual([
        {
          name: 'Foo Store Sometown',
          address: '2 Some St, Sometown 1234',
          id: 'jalfj24984f',
          metrics: [
            {
              metric: 'Profile Visits',
              value: 128, // 112 + 16
            },
            {
              metric: 'Interactions',
              value: 18, // 12 + 6
            },
          ],
        },
        {
          name: 'Foo Store Anothertown',
          address: '5 Another St, Anothertown 4321',
          id: 'zsd40525nf032',
          metrics: [
            {
              metric: 'Profile Visits',
              value: 236, // 121 + 115
            },
            {
              metric: 'Interactions',
              value: 36, // 21 + 15
            },
          ],
        },
      ]);
    });
  });

  describe('Metrics categorical data extraction', () => {
    const dimensionedMetrics = [
      {
        dimension: {
          name: 'Category',
          value: 'RELEVANCY',
        },
        metric: {
          name: 'Search Appearances',
          type: 'INT',
          value: '8',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '92B',
                streetAddress: 'Russley Road',
                sublocality: 'Russley',
                subpremise: null,
                premise: null,
                postalCode: '9320',
                country: 'NZ',
                administrativeArea: 'Canterbury',
                floor: null,
              },
              id: '9e5e1ee9-1201-42c6-ad0d-5802f8b09517',
            },
            name: 'Spark Christchurch',
          },
        },
      },
      {
        dimension: {
          name: 'Category',
          value: 'Telecommunications',
        },
        metric: {
          name: 'Search Appearances',
          type: 'INT',
          value: '26',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '92B',
                streetAddress: 'Russley Road',
                sublocality: 'Russley',
                subpremise: null,
                premise: null,
                postalCode: '9320',
                country: 'NZ',
                administrativeArea: 'Canterbury',
                floor: null,
              },
              id: '9e5e1ee9-1201-42c6-ad0d-5802f8b09517',
            },
            name: 'Spark Christchurch',
          },
        },
      },
      {
        dimension: {
          name: 'Category',
          value: 'RELEVANCY',
        },
        metric: {
          name: 'Search Appearances',
          type: 'INT',
          value: '2',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '251',
                streetAddress: 'Broadway Ave',
                sublocality: null,
                subpremise: 'Shop 3',
                premise: null,
                postalCode: '4414',
                country: 'NZ',
                administrativeArea: 'Otago',
                floor: null,
              },
              id: '78d3aa72-7e99-4d1f-94b9-36a625644010',
            },
            name: 'Spark Broadway, Palmerston North ',
          },
        },
      },
      {
        dimension: {
          name: 'Category',
          value: 'Telecommunications',
        },
        metric: {
          name: 'Search Appearances',
          type: 'INT',
          value: '12',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '251',
                streetAddress: 'Broadway Ave',
                sublocality: null,
                subpremise: 'Shop 3',
                premise: null,
                postalCode: '4414',
                country: 'NZ',
                administrativeArea: 'Otago',
                floor: null,
              },
              id: '78d3aa72-7e99-4d1f-94b9-36a625644010',
            },
            name: 'Spark Broadway, Palmerston North ',
          },
        },
      },
      {
        dimension: {
          name: 'Category',
          value: 'RELEVANCY',
        },
        metric: {
          name: 'Search Appearances',
          type: 'INT',
          value: '4',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '42',
                streetAddress: 'Willis Street',
                sublocality: 'Wellington Central',
                subpremise: null,
                premise: null,
                postalCode: '6011',
                country: 'NZ',
                administrativeArea: 'Wellington',
                floor: null,
              },
              id: '802132e4-0d4a-43f1-81c8-ca9ea3cb8137',
            },
            name: 'Spark Willis Street',
          },
        },
      },
      {
        dimension: {
          name: 'Some other dimension',
          value: 'Should be ignored',
        },
        metric: {
          name: 'Search Appearances',
          type: 'INT',
          value: '560',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '42',
                streetAddress: 'Willis Street',
                sublocality: 'Wellington Central',
                subpremise: null,
                premise: null,
                postalCode: '6011',
                country: 'NZ',
                administrativeArea: 'Wellington',
                floor: null,
              },
              id: '802132e4-0d4a-43f1-81c8-ca9ea3cb8137',
            },
            name: 'Spark Willis Street',
          },
        },
      },
      {
        // should be ignored as metric isn't the one queried.
        dimension: {
          name: 'Category',
          value: 'RELEVANCY',
        },
        metric: {
          name: 'Some other metric',
          type: 'INT',
          value: '1021',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '42',
                streetAddress: 'Willis Street',
                sublocality: 'Wellington Central',
                subpremise: null,
                premise: null,
                postalCode: '6011',
                country: 'NZ',
                administrativeArea: 'Wellington',
                floor: null,
              },
              id: '802132e4-0d4a-43f1-81c8-ca9ea3cb8137',
            },
            name: 'Spark Willis Street',
          },
        },
      },
      {
        // should be ignored as dimension is null
        dimension: null,
        metric: {
          name: 'Search Appearances',
          type: 'INT',
          value: '1021',
        },
        namespace: 'YOL',
        statistic: 'COUNT',
        timestamp: 1596240000,
        subscription: {
          productSummary: null,
          productOptionSummary: [],
          businessProfileSummary: {
            locationSummary: {
              address: {
                streetNumber: '42',
                streetAddress: 'Willis Street',
                sublocality: 'Wellington Central',
                subpremise: null,
                premise: null,
                postalCode: '6011',
                country: 'NZ',
                administrativeArea: 'Wellington',
                floor: null,
              },
              id: '802132e4-0d4a-43f1-81c8-ca9ea3cb8137',
            },
            name: 'Spark Willis Street',
          },
        },
      },
    ];

    it('should extract dimensioned data into label value pairs', () => {
      expect(discrete(metricNames.SEARCH_APPEARANCES, 'Category')(dimensionedMetrics)).toEqual([
        {
          label: 'Relevancy',
          value: 14,
        },
        {
          label: 'Telecommunications',
          value: 38,
        },
      ]);
    });
  });

  describe('overall transformation', () => {
    it('should transform entire insights object - with subscription profiles', () => {
      expect(transformInsights({ metrics: largeTestMetricsSet })).toEqual({
        interactions: [
          { label: 'Phoneclicks', value: 8 },
          { label: 'Websiteclicks', value: 4 },
          { label: 'Getdirectionsclicks', value: 1 },
        ],
        lifetimeAverageReviewRating: 4.108333333333333,
        lifetimeReviewsCount: 47,
        performanceByCategory: [
          { label: 'Government & community', value: 2 },
          { label: 'Relevancy', value: 22 },
          { label: 'Telecommunications', value: 19 },
          { label: 'Cellular phones', value: 2 },
        ],
        profileInteractions: [{ x: 1596240000, y: 14 }],
        profileVisits: [{ x: 1596240000, y: 20 }],
        profiles: [
          {
            address: 'Shop G10, Shore City Shop Centre, Cnr Lake Rd & Como Street, Takapuna, Auckland',
            interactionCount: 4,
            name: 'Spark Takapuna',
            visitCount: 8,
          },
          {
            address: '198 Queen Street, Auckland Central, Auckland',
            interactionCount: 0,
            name: 'Spark Queen Street',
            visitCount: 0,
          },
          {
            address: 'Rotorua Central Mall, 1170 Amohau Street, Rotorua 3010',
            interactionCount: 4,
            name: 'Spark Rotorua',
            visitCount: 7,
          },
          {
            address: '28 Devonport Road, Tauranga 3110',
            interactionCount: 4,
            name: 'Spark Tauranga ',
            visitCount: 4,
          },
          {
            address: '31 Police Street, Dunedin Central, Dunedin',
            interactionCount: 1,
            name: 'Spark Business - Dunedin ',
            visitCount: 1,
          },
          {
            address: '239 Dee Street, Avenal, Invercargill 9810',
            interactionCount: 1,
            name: 'Spark Business Hub Invercargill',
            visitCount: 0,
          },
        ],
        searchAppearances: [{ x: 1596240000, y: 48 }],
        timestamp: 1596240000,
      });
    });
    it('should transform entire insights object - without subscription profiles', () => {
      expect(transformInsights({ metrics: largeTestMetricsSet, withSubscriptionProfiles: false })).toEqual({
        interactions: [
          { label: 'Phoneclicks', value: 8 },
          { label: 'Websiteclicks', value: 4 },
          { label: 'Getdirectionsclicks', value: 1 },
        ],
        lifetimeAverageReviewRating: 4.108333333333333,
        lifetimeReviewsCount: 47,
        performanceByCategory: [
          { label: 'Government & community', value: 2 },
          { label: 'Relevancy', value: 22 },
          { label: 'Telecommunications', value: 19 },
          { label: 'Cellular phones', value: 2 },
        ],
        profileInteractions: [{ x: 1596240000, y: 14 }],
        profileVisits: [{ x: 1596240000, y: 20 }],
        searchAppearances: [{ x: 1596240000, y: 48 }],
        timestamp: 1596240000,
      });
    });
    it('should transform entire insights object - empty param', () => {
      expect(R.isEmpty(null)).toBeFalsy();
      expect(R.isEmpty(undefined)).toBeFalsy();
      expect(R.isEmpty(transformInsights({ metrics: [] }))).toBeTruthy();
    });
    it('should transform entire insights object - null param', () => {
      expect(R.isEmpty(transformInsights({ metrics: null }))).toBeTruthy();
    });
  });
});
