import React, { FunctionComponent, ReactElement } from 'react';
import styled from '@emotion/styled';

import { TableCellProps } from './TableCell';
import TableRow, { StyledTableRow } from './TableRow';

export interface TableHeadProps {
  className: string;
  children: ReactElement<TableCellProps>;
}

const StyledTableHead = styled('thead')`
  color: white;
  background-color: #003350;
  box-shadow: 0 -1px 0 0 inset #000;
`;

const TableHead: FunctionComponent<TableHeadProps> = ({ children, ...rest }) => (
  <StyledTableHead>
    <tr>
      {
        (React.Children.map(children, (child: ReactElement<TableCellProps>) =>
          React.cloneElement(child, {
            ...rest,
            isHeader: true
          })
        ) as unknown) as ReactElement<TableCellProps>
      }
    </tr>
  </StyledTableHead>
);

export default TableHead;
