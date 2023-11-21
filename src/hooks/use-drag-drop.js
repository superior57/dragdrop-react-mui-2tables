import { useContext } from 'react';
import { DroppableContext } from '../components/main-list/droppable-context';

// ----------------------------------------------------------------------

export default function useDragDrop() {
  const context = useContext(DroppableContext);

  return context;
}
