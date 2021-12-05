import businessInputAdapter from './businessInputAdapter';
import assetModel from './__mocks__/assetModel';

describe('businessInputAdapter', () => {
  it('filters asset props down to match input definition', () => {
    const businessEntity = {
      assets: [
        assetModel,
      ],
    };

    const adaptedInput = businessInputAdapter(businessEntity);

    expect(adaptedInput.assets).toEqual([{
      caption: 'caption',
      contentUrl: 'contentUrl',
    }]);
  });
});
