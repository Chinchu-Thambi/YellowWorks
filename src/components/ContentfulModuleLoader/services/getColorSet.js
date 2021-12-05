const contentfulColorIdToSetName = (contentfulColorId) => {
  const map = {
    'Contrast (Dark Blue)': 'DarkBlue',
    'Light Blue': 'LightBlue',
  };

  return map[contentfulColorId] ?? contentfulColorId;
};

const getColorSet = (contentfulColorId) => {
  const colorSets = {
    Base: {
      main: 'base-200',
      text: 'contrast-600',
      inverse: {
        background: 'brand-600',
        text: 'contrast-600',
      },
    },
    Yellow: {
      main: 'brand-600',
      text: 'contrast-600',
      inverse: {
        background: 'contrast-600',
        text: 'base-100',
      },
    },
    DarkBlue: {
      main: 'contrast-600',
      text: 'base-100',
      inverse: {
        background: 'brand-600',
        text: 'contrast-600',
      },
    },
    LightBlue: {
      main: 'pacific-600',
      text: 'base-100',
      inverse: {
        background: 'brand-600',
        text: 'contrast-600',
      },
    },
  };

  const colorName = contentfulColorIdToSetName(contentfulColorId);

  return colorSets[colorName] ?? colorSets.Base;
};

export default getColorSet;
