import PropTypes from 'prop-types';
// @mui
import { TableHead, TableRow, TableCell } from '@mui/material';

// ----------------------------------------------------------------------

CustomTableHead.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function CustomTableHead({ headers, sx }) {
  return (
    <TableHead sx={sx}>
      <TableRow>
        {headers
          .filter(({ hidden }) => !hidden)
          .map(({ field, headerName, align = 'left', width }) => {
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
