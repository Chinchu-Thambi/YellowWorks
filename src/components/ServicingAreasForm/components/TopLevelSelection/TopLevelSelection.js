/* eslint jsx-a11y/label-has-associated-control: [2, { depth: 1 }] */

import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';

import useRegions from '../../../../services/useRegions';

import RadioInput from '../../../UI/RadioInput';

import { StyledContainer, SelectionItem } from './TopLevelSelection.styled';

const TopLevelSelection = ({
  setSelectionBy,
  setSelection,
}) => {
  const { getRegions } = useRegions();


  return (
    <StyledContainer>
      <h3>Select the servicing areas of your business:</h3>
      <label htmlFor="noneSelection">
        <RadioInput
          type="radio"
          name="radioSelection"
          id="noneSelection"
          required
          onChange={() => {
            setSelectionBy({ none: {} });
            setSelection({ selectedType: 'none' });
          }}
        />
        <SelectionItem>
          <h4>None</h4>
        </SelectionItem>
      </label>
      <Flex flexDirection={['column', null, 'row']} textAlign="left">
        <Box width={[1, null, 1 / 2]}>
          <label htmlFor="nz">
            <RadioInput
              type="radio"
              name="radioSelection"
              id="nz"
              required
              onChange={() => {
                setSelectionBy({ byMacroArea: {} });
                setSelection({
                  selectedType: 'regions',
                  value: getRegions({ byType: 3, output: 'options' }),
                });
              }}
            />
            <SelectionItem>
              <h4>All New Zealand</h4>
              <p>18 regions</p>
            </SelectionItem>
          </label>
          <label htmlFor="north">
            <RadioInput
              type="radio"
              name="radioSelection"
              id="north"
              required
              onChange={() => {
                setSelectionBy({ byMacroArea: {} });
                setSelection({
                  selectedType: 'regions',
                  value: getRegions({ byParent: 50002, output: 'options' }),
                });
              }}
            />
            <SelectionItem>
              <h4>North Island</h4>
              <p>11 regions</p>
            </SelectionItem>
          </label>
          <label htmlFor="south">
            <RadioInput
              type="radio"
              name="radioSelection"
              id="south"
              required
              onChange={() => {
                setSelectionBy({ byMacroArea: {} });
                setSelection({
                  selectedType: 'regions',
                  value: getRegions({ byParent: 50003, output: 'options' }),
                });
              }}
            />
            <SelectionItem>
              <h4>South Island</h4>
              <p>7 regions</p>
            </SelectionItem>
          </label>
        </Box>
        <Box width={[1, null, 1 / 2]}>
          <label htmlFor="regions">
            <RadioInput
              type="radio"
              name="radioSelection"
              id="regions"
              required
              onChange={() => {
                setSelection({
                  selectedType: 'regions',
                  value: [],
                });
                setSelectionBy({
                  byRegion: {},
                });
              }}
            />
            <SelectionItem>
              <h4>Select Regions</h4>
              <p>No limit</p>
            </SelectionItem>
          </label>
          <label htmlFor="cities">
            <RadioInput
              type="radio"
              name="radioSelection"
              id="cities"
              required
              onChange={() => setSelectionBy({
                byCity: {},
              })}
            />
            <SelectionItem>
              <h4>Select Towns and Cities</h4>
              <p>Within 1 Region - No limit</p>
            </SelectionItem>
          </label>
          <label htmlFor="suburbs">
            <RadioInput
              type="radio"
              name="radioSelection"
              id="suburbs"
              required
              onChange={() => setSelectionBy({
                bySuburb: {},
              })}
            />
            <SelectionItem>
              <h4>Select Suburbs</h4>
              <p>Within 1 Town or City - No limit</p>
            </SelectionItem>
          </label>
        </Box>
      </Flex>
    </StyledContainer>
  );
};

TopLevelSelection.propTypes = {
  setSelectionBy: PropTypes.func.isRequired,
  setSelection: PropTypes.func.isRequired,
};

export default TopLevelSelection;
