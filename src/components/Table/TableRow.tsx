import React, { FunctionComponent, ReactElement, useContext, useState } from 'react';
import styled from '@emotion/styled';

import TableContext from './TableContext';
import { TableCellProps } from './TableCell';

export interface TableRowProps {
  className?: string;
  id?: number | string;
  selected?: boolean;
  children: ReactElement<TableCellProps>;
}

interface StyledTableRowProps {
  selected?: boolean;
}

export const StyledTableRow = styled('tr')<StyledTableRowProps>`
  background-color: #212121;
  color: #ccc;
  height: 40px;

  ${({ selected }) => (selected ? `background-color: #003350;` : '')}
`;

const TableRow: FunctionComponent<TableRowProps> = ({ children, id, selected, ...rest }) => {
  const context = useContext(TableContext);

  const handleClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
    // Hmm...
    if (context.isSelectable && typeof context.onSelect === 'function') {
      context.onSelect(event, id === undefined ? '' : id);
    }
  };

  return (
    <StyledTableRow selected={context.selected === id} onClick={handleClick}>
      {
        (React.Children.map(children, (child: ReactElement<TableCellProps>) =>
          React.cloneElement(child, {
            ...rest,
            isHeader: false
          })
        ) as unknown) as ReactElement<TableCellProps>
      }
    </StyledTableRow>
  );
};

export default TableRow;
