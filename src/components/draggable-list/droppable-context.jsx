import { createContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
// @mui
import { alpha } from '@mui/material/styles';

export const DroppableContext = createContext(null);

// ----------------------------------------------------------------------

export default function DroppableProvider({ datas, onChangeData, children }) {
  const getDropStyle = (isDraggingOver) => ({
    height: 45,
    width: 1,
    borderRadius: 1,
    bgcolor: (theme) => alpha(theme.palette.primary.light, 0.7),
    ...(isDraggingOver && {
      bgcolor: (theme) => alpha(theme.palette.primary.main, 1),
      '&::after': {
        background:
          'linear-gradient( 90deg, transparent, rgb(239 239 239 / 72%), transparent )',
      },
    }),
  });

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
    sourceId,
    destinationId,
    sourceName,
    destinationName
  ) => {
    const newItem = datas[sourceName][sourceId];

    const newSourceData = datas[sourceName].filter(
      (_, index) => index !== sourceId
    );

    const newDestinationData = [
      ...datas[destinationName].map((item) => {
        if (item.id === Number(destinationId)) {
          return {
            ...item,
            childrens: [...(item.childrens || []), newItem],
          };
        }
        return item;
      }),
    ];

    const result = {
      ...datas,
      [sourceName]: newSourceData,
      [destinationName]: newDestinationData,
    };
    return result;
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
      const destinationName = destination.droppableId.split('.')[0];
      const destinationId = destination.droppableId.split('.')[1];

      const newData = replace(
        datas,
        source.index,
        destinationId,
        source.droppableId,
        destinationName
      );

      onChangeData(newData);
    }
  };

  const memorizedValues = {
    datas,
    onDragEnd,
    getItemStyle,
    getDropStyle,
  };

  return (
    <DroppableContext.Provider value={memorizedValues}>
      <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
    </DroppableContext.Provider>
  );
}
