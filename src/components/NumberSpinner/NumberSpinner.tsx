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
  onIncrement?: (value: number) => void;
  onDecrement?: (value: number) => void;
}

const Container = styled.div`
  display: inline-block;
  position: relative;
`;

const StyledInput = styled.input`
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
  appearance: textfield;
  position: relative;
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
  top: 6px;

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
  bottom: 6px;

  &:hover {
    border-top: 6px solid white;
  }
`;

const NumberSpinner: FunctionComponent<NumberSpinnerProps> = props => {
  const [value, setValue]: any = useState(props.value || props.min || 0);

  useEffect(() => {
    if (typeof props.value === 'undefined') return;

    const min = Number(props.min);
    const max = Number(props.max);
    let processed = Number(props.value);

    if (typeof props.min !== 'undefined' && props.value < min) {
      processed = min;
    }

    if (typeof props.max !== 'undefined' && props.value > max) {
      processed = max;
    }

    setValue(processed);
  }, [props.value]);

  const handleIncrement = () => {
    const step = props.step ? Number(props.step) : 1;
    const newValue =
      props.max === undefined || value + step <= props.max ? value + step : props.max;

    if (typeof props.onIncrement === 'function') {
      props.onIncrement(newValue);
    } else {
      setValue(newValue);
    }
  };

  const handleDecrement = () => {
    const fn = typeof props.onBlur === 'function' ? props.onBlur : setValue;
    const step = props.step ? Number(props.step) : 1;
    const newValue =
      props.min === undefined || value - step >= props.min ? value - step : props.min;

    if (typeof props.onDecrement === 'function') {
      props.onDecrement(newValue);
    } else {
      setValue(newValue);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim() === '') {
      setValue('');
      return;
    }

    const value = Number(event.target.value);

    setValue(value);
  };

  const handleBlur = () => {
    const fn = typeof props.onBlur === 'function' ? props.onBlur : setValue;

    if (typeof props.min !== 'undefined' && value < props.min) {
      fn(props.min);
      return;
    }

    if (typeof props.max !== 'undefined' && value > props.max) {
      fn(props.max);
      return;
    }

    fn(value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.which !== 13) return;
    if (typeof props.onChange !== 'function') return;

    if (typeof props.min !== 'undefined' && value < props.min) {
      props.onChange(props.min);
      return;
    }

    if (typeof props.max !== 'undefined' && value > props.max) {
      props.onChange(props.max);
      return;
    }

    props.onChange(value);
  };

  return (
    <Container>
      <StyledInput
        type="number"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        {...omit(props, ['onBlur', 'onKeyPress', 'value', 'min', 'max'])}
      />
      <ArrowUp onClick={handleIncrement} />
      <ArrowDown onClick={handleDecrement} />
    </Container>
  );
};

export default NumberSpinner;
