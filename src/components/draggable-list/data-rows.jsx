import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
// @mui
import { TableBody, TableRow, TableCell, Box } from '@mui/material';
// hook
import useDragDrop from '../../hooks/use-drag-drop';

// ----------------------------------------------------------------------

DraggableListDataRows.propTypes = {
  id: PropTypes.string,
  headers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  rows: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
};

// ----------------------------------------------------------------------

export default function DraggableListDataRows({ id, headers, rows = [] }) {
  const { getItemStyle } = useDragDrop();

  return (
    <TableBody>
      {rows.map((row, index) => {
        return (
          <Draggable
            key={`-row-${index}`}
            draggableId={`${id}-row-${index}`}
            index={index}
          >
            {(provided, snapshot) => (
              <Box
                component={TableRow}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                sx={(theme) =>
                  getItemStyle({
                    theme,
                    isDragging: snapshot.isDragging,
                  })
                }
              >
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
            )}
          </Draggable>
        );
      })}
    </TableBody>
  );
}
