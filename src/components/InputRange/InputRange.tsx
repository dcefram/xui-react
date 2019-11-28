import React, {
  FunctionComponent,
  ReactElement,
  useState,
  useEffect,
  useCallback,
  ChangeEvent
} from 'react';
import styled from '@emotion/styled';

export interface InputRangeProps {
  className: string;
  children: ReactElement;
  step?: number;
  min?: number;
  max?: number;
  value?: number;
}

interface RangeButtonProps {
  children: string;
  onClick: any;
}

const StyledRangeContainer = styled('div')`
  background: #111;
  border: 1px solid #000;
  display: flex;
`;

const StyledRangeButton = styled('button')<RangeButtonProps>`
  background: transparent;
  border: 0;
  color: #666666;
  cursor: pointer;
  height: 14px;
  outline: none;
  padding: 0;
  width: 14px;

  &:hover {
    color: #fff;
  }
`;

const StyledInputRange = styled('input')<InputRangeProps | { type: string }>`
  -webkit-appearance: none;
  background: transparent;
  margin: 0;
  width: 100%;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #888888;
    border-radius: 0;
    cursor: pointer;
    height: 12px;
    margin-top: 1px;
    width: 12px;

    &:hover {
      background: #fff;
    }
  }

  &::-webkit-slider-runnable-track {
    background: transparent;
    border: 0;
    cursor: pointer;
    height: 14px;
    width: 100%;
  }
`;

const InputRange: FunctionComponent<InputRangeProps> = ({
  children,
  value: propValue = 0,
  step = 1,
  min = 0,
  max = 100,
  ...rest
}) => {
  const [value, setValue] = useState(propValue);

  useEffect(() => {
    setValue(Number(propValue) || 0);
  }, [propValue]);

  const handleButtonClick = (offset: number) => () => {
    const newValue = value + offset;
    setValue(Math.min(max, Math.max(min, newValue)));
  };

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(Number(event.target.value));

  return (
    <StyledRangeContainer>
      <StyledRangeButton onClick={handleButtonClick(-step)}>-</StyledRangeButton>
      <StyledInputRange
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleRangeChange}
        {...rest}
      />
      <StyledRangeButton onClick={handleButtonClick(step)}>+</StyledRangeButton>
    </StyledRangeContainer>
  );
};

export default InputRange;
