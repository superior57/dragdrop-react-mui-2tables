// @mui
import { Checkbox, IconButton } from '@mui/material';
import { Visibility } from '@mui/icons-material';
// components
import { DraggableList } from '../components/main-list';
// hook
import useDragDrop from '../hooks/use-drag-drop';

// ----------------------------------------------------------------------

export default function SecondList() {
  const { datas } = useDragDrop();

  const HEAD = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
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
    <DraggableList
      id="second"
      headers={HEAD}
      rows={datas['second']}
      sx={{ minHeight: 500 }}
    />
  );
}
