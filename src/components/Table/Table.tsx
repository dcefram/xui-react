import React, { FunctionComponent, ReactElement } from 'react';
import styled from '@emotion/styled';

export interface TableProps {
  className: string;
  children: ReactElement;
}

const StyledTable = styled('table')`
  box-shadow: 0 0 0 1px #000;
  border-spacing: 0;
  font-size: 0.75rem;
`;

const Table: FunctionComponent<TableProps> = ({ children, ...rest }) => (
  <StyledTable {...rest}>{children}</StyledTable>
);

export default Table;
