import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import theme from '../../../../../../util/theme';

const TabsBanner = ({ tabLabels, selectedOptionCallback, initialSelectedIndex }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialSelectedIndex);

  return (
    <Flex
      justifyContent="space-evenly"
      alignItems="stretch"
      px={2}
      height={60}
      sx={{ border: `1px solid ${theme.palette.contrast[4]}`, borderRadius: 2 }}
    >
      {tabLabels.map((tabLabel, index) => (
        <Flex
          alignItems="center"
          justifyContent="center"
          width={[60, 100]}
          fontSize={1}
          sx={{
            borderBottom: selectedIndex === index ? `${theme.radii[1]} solid ${theme.palette.brand[0]}` : 'none',
            cursor: 'pointer',
          }}
          onClick={() => {
            selectedOptionCallback({ index, name: tabLabel });
            setSelectedIndex(index);
          }}
        >
          {tabLabel}
        </Flex>
      ))}
    </Flex>
  );
};

TabsBanner.propTypes = {
  tabLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOptionCallback: PropTypes.func.isRequired,
  initialSelectedIndex: PropTypes.number,
};

TabsBanner.defaultProps = {
  initialSelectedIndex: 0,
};

export default TabsBanner;
