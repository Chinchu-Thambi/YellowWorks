import React from 'react';
import { Text } from 'rebass';
import { PropTypes } from 'prop-types';
import theme from '../../../../../../../../util/theme';
import MaterialCard from '../../../../../../components/MaterialCard';
import SortableTable from '../SortableTable';

const CardedSortableTable = ({
  title, data, columns, initialSortBy,
}) => (
  <MaterialCard fullWidth padding="0px" height="450px">
    {/* //TODO replace fontweight with new/proper theme scheme once it's activated. so it becomes fontWeight='bold' */}
    <Text
      as="h2"
      py={2}
      textAlign="center"
      fontSize={[0, 1]}
      fontWeight={theme.fontWeight[1]}
      sx={{
        borderBottom: `1px solid ${theme.palette.contrast[3]}`,
      }}
    >
      {title}
    </Text>
    <SortableTable data={data} columns={columns} initialSortBy={initialSortBy} />
  </MaterialCard>
);

CardedSortableTable.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      accessorKey: PropTypes.string.isRequired,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  initialSortBy: PropTypes.string,
};

CardedSortableTable.defaultProps = {
  initialSortBy: undefined,
};

export default CardedSortableTable;
