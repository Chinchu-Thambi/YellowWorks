/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

import { Container } from '../../Grid';
import { theme } from '../../../util';
import YellowWebsitesThemePicker from '../../YellowWebsitesThemePicker';
import BrowserFrame from '../../BrowserFrame';

const Background = styled.div`
  background-color: ${theme.palette.base[1]};
  padding: 1px;
`;

// TODO change this
const DEFAULT_PREVIEW_MICROSITE_URL = 'https://yellow-sandbox.sites.next.yellow.co.nz/';

/**
 * @type {(heading: string, subtitle: string, content: string) => JSX.Element}
 */
const YellowWebsitesThemeShowcase = ({ heading, subtitle, content }) => {
  const [selectedThemeIndex, setSelectedThemeIndex] = React.useState(0);
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
    {
      label: 'Pro',
      colors: ['#FFFFFF', '#EFF1F5', '#BEC5D0', '#626D7D', '#384457', '#081D3C'],
    },
  ];

  return (
    <Background>
      <Container as="section" width={theme.containerWidth}>
        <div className="flex flex-col space-y-4 xl:flex-row xl:space-x-6 w-full justify-between px-2 md:px-4">
          <div className="flex-1 flex-col space-y-4 xl:space-y-5">
            <div className="text-center xl:text-left">
              <h1 className="text-2xl md:text-4xl">{heading}</h1>
              <h2 className="font-normal text-base md:text-2xl">{subtitle}</h2>
              <div className="font-normal font-sans text-sm md:text-lg">{content}</div>
            </div>
            <div className="flex space-x-2 justify-center xl:justify-start">
              <YellowWebsitesThemePicker
                themes={themes}
                initialSelectedThemeIndex={selectedThemeIndex}
                onSelect={(indexOfSelectedTheme) => setSelectedThemeIndex(indexOfSelectedTheme)}
              />
            </div>
          </div>
          <div className="flex-2 flex flex-col space-y-2 pointer-events-none" style={{ minHeight: '900px' }}>
            <BrowserFrame
              displayURL={DEFAULT_PREVIEW_MICROSITE_URL}
              url={`${DEFAULT_PREVIEW_MICROSITE_URL}?theme=${themes[selectedThemeIndex].label.toLowerCase()}`}
            />
          </div>
        </div>
      </Container>
    </Background>
  );
};

export default YellowWebsitesThemeShowcase;
