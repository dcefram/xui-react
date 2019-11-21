import React, { FunctionComponent, ReactElement } from 'react';
import styled from '@emotion/styled';

import { TableCellProps } from './TableCell';

export interface TableHeadProps {
  className: string;
  children: ReactElement<TableCellProps>;
}

const StyledTableBody = styled('thead')`
  background-color: #212121;
  color: #ccc;
`;

const TableBody: FunctionComponent<TableHeadProps> = ({ children, ...rest }) => (
  <StyledTableBody>
    {
      (React.Children.map(children, (child: ReactElement<TableCellProps>) =>
        React.cloneElement(child, {
          ...rest,
          isHeader: true
        })
      ) as unknown) as ReactElement<TableCellProps>
    }
  </StyledTableBody>
);

export default TableBody;
