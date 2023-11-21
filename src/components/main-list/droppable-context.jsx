import { createContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

export const DroppableContext = createContext(null);

// ----------------------------------------------------------------------

export default function DroppableProvider({ datas, onChangeData, children }) {
  const getItemStyle = ({ theme, isDragging }) => {
    const table = document.querySelector('.signature-table');
    const tableHeader = table?.querySelector('thead');
    const tableBody = table?.querySelector('tbody');
    const theads = tableHeader?.querySelectorAll('th');
    const tr = tableBody?.querySelector('tr');

    const trStyle = {};
    theads?.forEach((th, index) => {
      trStyle[`& td:nth-of-type(${index + 1})`] = {
        width: th.clientWidth ? `${th.clientWidth}px` : 'auto',
      };
    });

    if (isDragging)
      table?.style.setProperty('margin-bottom', `${tr?.clientHeight}px`);
    else table?.style.removeProperty('margin-bottom');

    return {
      ...(isDragging
        ? {
            boxShadow: theme.shadows[5],
            borderRadius: `${theme.shape.borderRadius}px`,
            background: theme.palette.background.paper,
            ...trStyle,
          }
        : {}),
    };
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const replace = (
    datas,
    sourceIndex,
    destinationIndex,
    sourceId,
    destinationId
  ) => {
    const newData = {
      ...datas,
      [sourceId]: datas[sourceId].filter((_, index) => index !== sourceIndex),
      [destinationId]: [
        ...datas[destinationId].slice(0, destinationIndex),
        datas[sourceId][sourceIndex],
        ...datas[destinationId].slice(destinationIndex),
      ],
    };
    return newData;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId) {
      const newData = reorder(
        datas[source.droppableId],
        source.index,
        destination.index
      );
      onChangeData({
        ...datas,
        [source.droppableId]: newData,
      });
    } else {
      const newData = replace(
        datas,
        source.index,
        destination.index,
        source.droppableId,
        destination.droppableId
      );
      onChangeData(newData);
    }
  };

  const memorizedValues = {
    datas,
    onDragEnd,
    getItemStyle,
  };

  return (
    <DroppableContext.Provider value={memorizedValues}>
      <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
    </DroppableContext.Provider>
  );
}