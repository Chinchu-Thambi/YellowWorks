/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import appTheme from '../../util/theme';

/**
 * @type {(theme: {label: string, colors: string[]}, onSelect: Function) => JSX.Element}
 */
const ThemeSwatch = ({ swatchTheme, onSelect, isSelected }) => (
  <div className="flex flex-col items-center space-y-2">
    <button
      type="button"
      className={`bg-contrast-200 rounded-full w-7 sm:w-8 md:w-10 h-7 sm:h-8 md:h-10 cursor-pointer overflow-hidden p-0 active:border-2 active:border-amber-500 flex justify-center items-center relative ${
        isSelected ? 'shadow-md' : 'shadow-lg'
      }`}
      style={{ border: `5px solid ${isSelected ? appTheme.palette.brand[0] : 'white'}` }}
      onClick={onSelect}
    >
      <div className="absolute w-full h-full flex flex-col items-stretch transform -rotate-45">
        <div className="flex-1" style={{ backgroundColor: swatchTheme.colors[2] }}>
          &zwnj;
        </div>
        <div className="flex-1" style={{ backgroundColor: swatchTheme.colors[5] }}>
          &zwnj;
        </div>
        <div className="flex-1" style={{ backgroundColor: swatchTheme.colors[3] }}>
          &zwnj;
        </div>
      </div>
      {isSelected && (
        <div className="absolute text-base-100 text-md md:text-4xl">
          <FontAwesomeIcon icon={faCheck} />
        </div>
      )}
    </button>
    <div className={isSelected && 'font-bold'}>{swatchTheme.label}</div>
  </div>
);

/**
 * @type {(themes: {label: string, colors: string[]}[], initialSelectedThemeIndex: number, onSelect: Function) => JSX.Element}
 */
const YellowWebsitesThemePicker = ({ themes, initialSelectedThemeIndex = 0, onSelect }) => {
  const [selectedThemeIndex, setSelectedThemeIndex] = React.useState(initialSelectedThemeIndex);
  return (
    <>
      {themes.map((swatchTheme, i) => (
        <ThemeSwatch
          theme={swatchTheme}
          onSelect={() => {
            onSelect(i);
            setSelectedThemeIndex(i);
          }}
          isSelected={i === selectedThemeIndex}
          // eslint-disable-next-line react/no-array-index-key
          key={i}
        />
      ))}
    </>
  );
};

export default YellowWebsitesThemePicker;
