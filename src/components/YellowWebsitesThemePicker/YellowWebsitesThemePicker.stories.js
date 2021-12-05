import React from 'react';
import YellowWebsitesThemePicker from './YellowWebsitesThemePicker';

export const Component = () => {
  const [themeSelectedIndex, setThemeSelectedIndex] = React.useState(0);
  const themes = [
    {
      label: 'Rose',
      colors: ['#FFFFFF', '#F5F1EF', '#D0C4BE', '#7D6C62', '#4D423C', '#261E19'],
    },
    {
      label: 'Tradie',
      colors: ['#FFFFFF', '#F2F2F2', '#D9DDE3', '#718096', '#041430', '#DE2828'],
    },
    {
      label: 'Fresh',
      colors: ['#FFFFFF', '#EFF5F0', '#BED0C1', '#627D67', '#3C4D3F', '#19261B'],
    },
  ];

  return (
    <div>
      <YellowWebsitesThemePicker
        themes={themes}
        initialSelectedThemeIndex={themeSelectedIndex}
        onSelect={(selectedThemeIndex) => setThemeSelectedIndex(selectedThemeIndex)}
      />
      <div className="mt-5">
        Selected theme: <strong>{themes[themeSelectedIndex]?.label}</strong>
      </div>
    </div>
  );
};

export default {
  title: 'Manage Journey/Organisms/Theme Picker',
};
