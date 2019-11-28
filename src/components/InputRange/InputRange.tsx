import React, { FunctionComponent, ReactElement } from 'react';
import styled from '@emotion/styled';

export interface InputRangeProps {
  className: string;
  children: ReactElement;
}

const StyledInputRange = styled('input')<InputRangeProps | { type: string }>`
  -webkit-appearance: none;
  background: transparent;
  width: 100%;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #ffffff;
    border-radius: 0;
    border: 1px solid #000000;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    cursor: pointer;
    height: 36px;
    margin-top: -14px;
    width: 16px;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #3071a9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
`;

const InputRange: FunctionComponent<InputRangeProps> = ({ children, ...rest }) => (
  <StyledInputRange type="range" {...rest} />
);

export default InputRange;
