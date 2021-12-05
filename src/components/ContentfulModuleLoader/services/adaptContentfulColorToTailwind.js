const adaptContentfulColorToTailwind = (string) => {
  const colorGroups = {
    White: 'base-100',
    'Contrast (Dark Blue)': 'contrast-600',
    Grey: 'base-200',
    Yellow: 'brand-600',
  };
  return colorGroups[string] || 'base-100';
};

export default adaptContentfulColorToTailwind;
