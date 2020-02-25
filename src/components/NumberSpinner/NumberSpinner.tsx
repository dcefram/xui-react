import React, { useState, useEffect, ChangeEvent, FocusEvent, FunctionComponent } from 'react';
import styled from '@emotion/styled';

import omit from '../../helpers/omit';

export interface NumberSpinnerProps {
  className: string;
  value?: number;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  isFluid?: boolean;
  onChange?: (value: number) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

const Container = styled.div`
  display: inline-block;
  position: relative;
`;

const StyledInput = styled.input`
  font-size: 12px;
  padding: 5px 9px 7px 9px;
  color: #ccc;
  background-color: #393939;
  line-height: 17px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  border: 1px solid #040404;
  outline: none;
  appearance: textfield;
  position: relative;

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

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  &[disabled] {
    color: #666;
    background-color: #292929;

    &::-webkit-input-placeholder {
      color: #464646;
    }
  }

  ${({ isFluid }: any) =>
    isFluid
      ? `
    width: calc(100% - ${9 * 2}px);
  `
      : ''}
`;

const ArrowUp = styled.div`
  cursor: pointer;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 5px solid #666666;

  position: absolute;
  right: 6px;
  top: 9px;

  &:hover {
    border-bottom: 6px solid white;
  }
`;

const ArrowDown = styled.div`
  cursor: pointer;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 5px solid #666666;

  position: absolute;
  right: 6px;
  bottom: 9px;

  &:hover {
    border-top: 6px solid white;
  }
`;

const NumberSpinner: FunctionComponent<NumberSpinnerProps> = props => {
  const [value, setValue]: any = useState(props.value || 0);

  useEffect(() => {
    setValue(value);
  }, [value]);

  const handleIncrement = () => {
    const step = props.step ? Number(props.step) : 1;
    const newValue =
      props.max === undefined || value + step <= props.max ? value + step : props.max;

    if (typeof props.onChange === 'function') {
      props.onChange(newValue);
    } else {
      setValue(newValue);
    }
  };

  const handleDecrement = () => {
    const step = props.step ? Number(props.step) : 1;
    const newValue =
      props.min === undefined || value - step >= props.min ? value - step : props.min;

    if (typeof props.onChange === 'function') {
      props.onChange(newValue);
    } else {
      setValue(newValue);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    if (event.target.value.trim() === '') {
      setValue('');
      return;
    }

    const value = Number(event.target.value);

    // Made this readable on first glance
    let newValue = value;

    if (props.min !== undefined && value < props.min) {
      newValue = props.min;
    } else if (props.max !== undefined && value > props.max) {
      newValue = props.max;
    }

    if (typeof props.onChange === 'function') {
      props.onChange(newValue);
    } else {
      setValue(newValue);
    }
  };

  return (
    <Container>
      <StyledInput
        type="number"
        value={value}
        {...omit(props, ['onChange'])}
        onChange={handleChange}
      />
      <ArrowUp onClick={handleIncrement} />
      <ArrowDown onClick={handleDecrement} />
    </Container>
  );
};

export default NumberSpinner;
