/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Flex, Text } from 'rebass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { PropTypes } from 'prop-types';
import * as R from 'ramda';
import styled from 'styled-components';
import theme from '../../../../../../../../util/theme';

export const sort = (sortBy, sortAsc) => R.compose(R.sort, sortAsc ? R.ascend : R.descend, R.prop)(sortBy);

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-size: ${theme.fontSizes[1]};

  thead > tr {
    border-bottom: ${`1px solid ${theme.palette.contrast[3]}`};
  }
  th {
    position: sticky;
    top: ${theme.space[0]};
    cursor: pointer;
    user-select: none;
    background-color: ${theme.palette.contrast[5]};
  }
  tbody > tr {
    border-bottom: ${`1px solid ${theme.palette.contrast[5]}`};
  }
`;

const SortableTable = ({ data, columns, initialSortBy }) => {
  const [sortBy, setSortBy] = React.useState(initialSortBy);
  const [sortAsc, setSortAsc] = React.useState(false);
  const sortedData = sort(sortBy, sortAsc)(data || []);

  const handleSortChange = (col) => {
    if (col.accessorKey === sortBy) {
      setSortAsc(!sortAsc);
    }
    setSortBy(col.accessorKey);
  };

  return (
    <Table>
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={`col-${i}`} onClick={() => handleSortChange(col)}>
              <Flex p={3}>
                <Text color={theme.palette.contrast[0]}>{col.label}</Text>
                <Text mx={2} color={col.accessorKey === sortBy ? theme.palette.contrast[3] : 'transparent'}>
                  <FontAwesomeIcon icon={sortAsc ? faArrowUp : faArrowDown} />
                </Text>
              </Flex>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((dataPoint, j) => (
          <tr key={`row-${j}`}>
            {columns.map((col, k) => (
              <td key={`cell-${j}-${k}`}>
                <Flex justifyContent="flex-start" alignItems="start" padding={3} verticalAlign="text-top">
                  {dataPoint[col.accessorKey]}
                </Flex>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

SortableTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      accessorKey: PropTypes.string.isRequired,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  initialSortBy: PropTypes.string,
};

SortableTable.defaultProps = {
  initialSortBy: undefined,
};

export default SortableTable;
