import PropTypes from 'prop-types';
// @mui
import { TableContainer, Table, Paper } from '@mui/material';
//
import DroppableListDataRows from './data-rows';
import CustomTableHead from '../table/head';

// ----------------------------------------------------------------------

DraggableList.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  rows: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  sx: PropTypes.object,
};

export default function DraggableList({ id, headers, rows, sx }) {
  return (
    <TableContainer component={Paper} sx={sx}>
      <Table size="small">
        <CustomTableHead headers={headers} sx={{ bgcolor: 'primary.light' }} />

        <DroppableListDataRows id={id} headers={headers} rows={rows} />
      </Table>
    </TableContainer>
  );
}
