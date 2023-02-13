import { Theme } from '@admiral-ds/react-ui';

const getColors = (theme: Theme): Record<string, string> => ({
  'Neutral/Neutral 90': theme.color['Neutral/Neutral 90'],
  'Neutral/Neutral 40': theme.color['Neutral/Neutral 40'],
  'Attention/Attention 70': theme.color['Attention/Attention 70'],
  'Magenta/Magenta 60 Main': theme.color['Magenta/Magenta 60 Main'],
  'Success/Success 50 Main': theme.color['Success/Success 50 Main'],
  'Cyan/Cyan 50': theme.color['Cyan/Cyan 50']
});

export {getColors}
