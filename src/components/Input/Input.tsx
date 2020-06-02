import React, { ChangeEvent, FocusEvent, FunctionComponent } from 'react';
import styled from '@emotion/styled';

export interface InputProps {
  className: string;
  value?: string;
  placeholder?: string;
  isFluid?: boolean;
  onChange?: (event: ChangeEvent) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

const StyledInput = styled('input')<InputProps>`
  font-size: 12px;
  padding: 0;
  color: #ccc;
  background-color: #393939;
  line-height: 17px;
  text-overflow: ellipsis;
  text-indent: 6px;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  border: 1px solid #040404;
  outline: none;
  height: 22px;

  &:hover {
    background-color: #464646;
  }

  &:focus,
  &:active {
    background-color: #505050;
  }

  &::-webkit-input-placeholder {
    color: #888;
  }

  &[disabled] {
    color: #666;
    background-color: #292929;

    &::-webkit-input-placeholder {
      color: #464646;
    }
  }

  ${({ isFluid }) =>
    isFluid
      ? `
    width: calc(100% - ${9 * 2}px);
  `
      : ''}
`;

const Input: FunctionComponent<InputProps> = props => <StyledInput {...props} />;

export default Input;
