import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Table,
  TableHead,
  Collapse,
  TableContainer,
  Paper,
} from '@mui/material';
import { ChevronRight, KeyboardArrowDown } from '@mui/icons-material';

// ----------------------------------------------------------------------

DroppableListDataRows.propTypes = {
  id: PropTypes.string,
  headers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  rows: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
};

// ----------------------------------------------------------------------

export default function DroppableListDataRows({ id, headers, rows = [] }) {
  const [selectedIds, setSelectedIds] = useState([]);

  return (
    <TableBody>
      {rows.map((row, index) => {
        return (
          <React.Fragment key={`droppable-row-${index}`}>
            <TableRow>
              <TableCell>
                <IconButton
                  disabled={!row.childrens?.length}
                  onClick={() => {
                    if (selectedIds.includes(index)) {
                      setSelectedIds([
                        ...selectedIds.filter((id) => id !== index),
                      ]);
                    } else {
                      setSelectedIds([...selectedIds, index]);
                    }
                  }}
                >
                  {selectedIds.includes(index) ? (
                    <KeyboardArrowDown />
                  ) : (
                    <ChevronRight />
                  )}
                </IconButton>
              </TableCell>
              {headers
                .filter(({ hidden, hideCell }) => !hidden && !hideCell)
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
            </TableRow>
            {row.childrens?.length && (
              <CustomChildrenTable
                headers={headers}
                datas={row.childrens}
                open={selectedIds.includes(index)}
              />
            )}
          </React.Fragment>
        );
      })}
    </TableBody>
  );
}

// ----------------------------------------------------------------------
function CustomChildrenTable({ headers, datas, open }) {
  return (
    <TableRow>
      <TableCell colSpan={headers.length} sx={{ padding: 0, border: 'none' }}>
        <Collapse
          in={open}
          sx={{
            ...(open && {
              padding: 2,
            }),
          }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datas?.map(({ id, description }) => {
                  return (
                    <TableRow key={`children-row-${id}`}>
                      <TableCell>{id}</TableCell>
                      <TableCell>{description}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}
