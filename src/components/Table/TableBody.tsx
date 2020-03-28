import React, { FunctionComponent, ReactElement } from 'react';
import styled from '@emotion/styled';

import { TableRowProps } from './TableRow';

export interface TableBodyProps {
  className: string;
  children: ReactElement<TableRowProps>;
}

const StyledTableBody = styled('tbody')`
  background-color: #212121;
  box-shadow: none;
  color: #ccc;
`;

const TableBody: FunctionComponent<TableBodyProps> = ({ children, ...rest }) => (
  <StyledTableBody {...rest}>{children}</StyledTableBody>
);

export default TableBody;
