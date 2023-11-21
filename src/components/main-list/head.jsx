import PropTypes from 'prop-types';
// @mui
import { TableHead, TableRow, TableCell } from '@mui/material';

// ----------------------------------------------------------------------

DraggableListHead.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

// ----------------------------------------------------------------------

export default function DraggableListHead({ headers }) {
  return (
    <TableHead>
      <TableRow>
        {headers.map(({ field, headerName, align = 'left', width }) => {
          return (
            <TableCell key={field} align={align} width={width}>
              {headerName}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
