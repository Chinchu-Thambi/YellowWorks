import { theme } from '../../../util';

const adaptContentfulColorToTheme = (string) => {
  const colorGroups = {
    White: theme.palette.base[0],
    'Contrast (Dark Blue)': theme.palette.contrast[0],
    Grey: theme.palette.base[1],
  };
  return colorGroups[string];
};

export default adaptContentfulColorToTheme;
