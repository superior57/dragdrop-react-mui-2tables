// components
import { DraggableList } from '../components/draggable-list';
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
