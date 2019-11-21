import React, { FunctionComponent, ReactNode } from 'react';
import styled from '@emotion/styled';

export interface TableCellProps {
  children?: ReactNode;
  className?: string;
  isHeader?: boolean;
}

const StyledTD = styled('td')<TableCellProps>`
  padding: 6px;
`;

const StyledTH = styled('th')<TableCellProps>`
  padding: 6px;

  &:not(:last-of-type) {
    box-shadow: -1px 0 0 0 inset #000;
  }
`;

const TableCell: FunctionComponent<TableCellProps> = ({ children, isHeader = false, ...rest }) => {
  const Component = isHeader ? StyledTH : StyledTD;
  return <Component {...rest}>{children}</Component>;
};

export default TableCell;
