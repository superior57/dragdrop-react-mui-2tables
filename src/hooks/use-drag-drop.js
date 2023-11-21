import { useContext } from 'react';
import { DroppableContext } from '../components/draggable-list/droppable-context';

// ----------------------------------------------------------------------

export default function useDragDrop() {
  const context = useContext(DroppableContext);

  return context;
}
