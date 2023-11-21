import PropTypes from 'prop-types';
// @mui
import { TableBody, TableRow, TableCell, Box } from '@mui/material';

// ----------------------------------------------------------------------

DroppableListDataRows.propTypes = {
  id: PropTypes.string,
  headers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  rows: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
};

// ----------------------------------------------------------------------

export default function DroppableListDataRows({ id, headers, rows = [] }) {
  return (
    <TableBody>
      {rows.map((row, index) => {
        return (
          <Box key={`droppable-row-${index}`} component={TableRow}>
            {headers
              .filter(({ hidden }) => !hidden)
              .map(({ field, align = 'left', width, renderCell }) => {
                return (
                  <TableCell
                    key={`${row.id}-${field}`}
                    align={align}
                    width={width}
                    height={45}
                  >
                    {renderCell ? renderCell(row[field], row) : row[field]}
                  </TableCell>
                );
              })}
          </Box>
        );
      })}
    </TableBody>
  );
}
