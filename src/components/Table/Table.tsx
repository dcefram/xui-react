import React, { FunctionComponent, ReactElement, useState } from 'react';
import styled from '@emotion/styled/macro';

import TableContext from './TableContext';
import { StyledTableRow } from './TableRow';

interface StyledTableProps {
  className: string;
  children: ReactElement;
  isSelectable?: boolean;
}

export interface TableProps extends StyledTableProps {
  selected?: string | number;
  onSelect?: (event: React.MouseEvent<HTMLTableRowElement>, id: string | number) => void;
}

const getSelectableStyles = ({ isSelectable }: StyledTableProps) => {
  if (isSelectable) {
    return `${StyledTableRow}:hover {
      background-color: #003350;
    }`;
  }

  return '';
};

const StyledTable = styled('table')<StyledTableProps>`
  box-shadow: 0 0 0 1px #000;
  border-spacing: 0;
  font-size: 0.75rem;

  ${getSelectableStyles}
`;

const Table: FunctionComponent<TableProps> = ({
  children,
  isSelectable = false,
  selected,
  onSelect,
  ...rest
}) => {
  const [isSelected, setSelected] = useState('' as string | number);

  const handleSelect = (event: React.MouseEvent<HTMLTableRowElement>, id: string | number) => {
    const isAlreadySelected = typeof selected === 'undefined' ? isSelected === id : selected === id;
    if (typeof onSelect === 'function') {
      onSelect(event, isAlreadySelected ? '' : id);
    } else {
      setSelected(isAlreadySelected ? '' : id);
    }
  };

  return (
    <TableContext.Provider
      value={{
        isSelectable,
        onSelect: handleSelect,
        selected: typeof selected === 'undefined' ? isSelected : selected
      }}
    >
      <StyledTable isSelectable={isSelectable} {...rest}>
        {children}
      </StyledTable>
    </TableContext.Provider>
  );
};

export default Table;
