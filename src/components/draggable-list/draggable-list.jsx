import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
// @mui
import { TableContainer, Table, Paper } from '@mui/material';
//
import MainListHead from './head';
import MainListDataRows from './data-rows';

// ----------------------------------------------------------------------

DraggableList.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  rows: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  sx: PropTypes.object,
};

export default function DraggableList({ id, headers, rows, sx }) {
  return (
    <>
      <Droppable droppableId={id} isDropDisabled>
        {({ innerRef }) => (
          <TableContainer component={Paper} sx={sx} ref={innerRef}>
            <Table size="small">
              <MainListHead headers={headers} />

              <MainListDataRows id={id} headers={headers} rows={rows} />
            </Table>
          </TableContainer>
        )}
      </Droppable>
    </>
  );
}
