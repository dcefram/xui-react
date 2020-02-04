import React, { FunctionComponent, ReactElement } from 'react';
import styled from '@emotion/styled';

import { TableCellProps } from './TableCell';

export interface TableRowProps {
  className?: string;
  children: ReactElement<TableCellProps>;
}

export const StyledTableRow = styled('tr')`
  background-color: #212121;
  color: #ccc;
`;

const TableRow: FunctionComponent<TableRowProps> = ({ children, ...rest }) => (
  <StyledTableRow>
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

export default TableRow;
