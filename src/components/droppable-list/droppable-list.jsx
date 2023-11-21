import PropTypes from 'prop-types';
// @mui
import { TableContainer, Table, Paper } from '@mui/material';
//
import MainListHead from './head';
import DroppableListDataRows from './data-rows';

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
        <MainListHead headers={headers} />

        <DroppableListDataRows id={id} headers={headers} rows={rows} />
      </Table>
    </TableContainer>
  );
}
