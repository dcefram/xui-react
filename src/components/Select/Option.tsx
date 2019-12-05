import React, { FunctionComponent, ReactNode } from 'react';
import styled from '@emotion/styled';

export interface OptionProps {
  children: ReactNode | string;
  value: string | number;
  selected: boolean;
  disabled: boolean;
  onClick: (event: React.MouseEvent, value: any) => void;
}

const StyledOpton = styled('li')`
  color: #888;
  font-size: 12px;
  padding: 6px 8px 5px;
  cursor: pointer;
  overflow: hidden;

  &.selected:not(.disabled) {
    background-color: #245f7c;
    color: #ccc;

    > * {
      color: #ccc;
      font-size: 12px;
      cursor: pointer;
    }
  }

  &.disabled {
    color: #444;

    > * {
      color: #444;
    }
  }

  &.italic {
    font-style: italic;
  }

  &.ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: block;
  }

  > * {
    color: #888;
    font-size: 12px;
    cursor: pointer;
  }
`;

const Option: FunctionComponent<OptionProps> = ({
  children,
  value,
  onClick = () => {},
  ...rest
}) => (
  <StyledOpton onClick={(event: React.MouseEvent) => onClick(event, value)} {...rest}>
    {children}
  </StyledOpton>
);

export default Option;
