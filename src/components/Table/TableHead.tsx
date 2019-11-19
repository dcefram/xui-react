import React, { FunctionComponent, ReactElement } from 'react';
import styled from '@emotion/styled';

import { TableCellProps } from './TableCell';

export interface TableHeadProps {
  className: string;
  children: ReactElement<TableCellProps>;
}

const StyledTableHead = styled('thead')`
  background-color: #003350;
  color: white;
`;

const TableHead: FunctionComponent<TableHeadProps> = ({ children, ...rest }) => (
  <StyledTableHead>
    {
      (React.Children.map(children, (child: ReactElement<TableCellProps>) =>
        React.cloneElement(child, {
          ...rest,
          isHeader: true
        })
      ) as unknown) as ReactElement<TableCellProps>
    }
  </StyledTableHead>
);

export default TableHead;
