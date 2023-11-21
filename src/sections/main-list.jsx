// @mui
import { Checkbox, IconButton, Skeleton } from '@mui/material';
import { Visibility } from '@mui/icons-material';
// hook
import useDragDrop from '../hooks/use-drag-drop';
import { Droppable } from 'react-beautiful-dnd';
import { DroppableList } from '../components/droppable-list';

// ----------------------------------------------------------------------

export default function MainList() {
  const { datas, getDropStyle } = useDragDrop();

  const HEAD = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      hidden: true,
    },
    {
      field: 'collect_id',
      headerName: 'Collect ID',
      width: 150,
      renderCell: (value, row) => {
        return (
          <>
            {value ? (
              value
            ) : (
              <Droppable droppableId={`main.${row.id}`}>
                {(provided, snapshot) => (
                  <Skeleton
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    variant="rectangular"
                    animation="wave"
                    sx={getDropStyle(snapshot.isDraggingOver)}
                  />
                )}
              </Droppable>
            )}
          </>
        );
      },
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
    },
    {
      field: 'select',
      headerName: 'Select',
      width: 100,
      renderCell: (value) => {
        return <Checkbox />;
      },
    },
    {
      field: 'visible',
      headerName: 'Visible',
      width: 100,
      renderCell: (value) => {
        return (
          <IconButton>
            <Visibility />
          </IconButton>
        );
      },
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
    },
    {
      field: 'number',
      headerName: 'Number',
      width: 100,
    },
  ];

  return (
    <DroppableList
      id="main"
      headers={HEAD}
      rows={datas['main']}
      sx={{ minHeight: 500 }}
    />
  );
}
