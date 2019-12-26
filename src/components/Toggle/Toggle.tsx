import React, { FunctionComponent, useState, useCallback } from 'react';
import styled from '@emotion/styled';

export interface OnChangeEvent {
  checked: boolean;
}

export interface ToggleProps {
  className?: string;
  checked?: boolean;
  onChange?: ({ checked }: OnChangeEvent) => void;
}

const StyledButton = styled('button')`
  background-color: #060606;
  border: 1px solid #040404;
  cursor: pointer;
  height: 24px;
  outline: none;
  padding: 1px;
  position: relative;
  width: 50px;
  transition: background-color ease 0.2s;

  &.checked {
    background-color: #0c6996;
  }
`;

const StyledThumb = styled('div')`
  background: #666666;
  height: 20px;
  width: 20px;
  left: 1px;
  top: 1px;
  position: absolute;
  transition: left ease 0.2s;

  &:hover {
    background: white;
  }

  &.checked {
    background: white;
    left: calc(100% - 21px);
  }
`;

const Toggle: FunctionComponent<ToggleProps> = ({ checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = useCallback(() => {
    if (typeof checked === 'undefined') {
      setIsChecked(!isChecked);
    } else if (typeof onChange === 'function') {
      onChange({ checked: !checked });
    }
  }, [isChecked, checked]);

  const cname = (typeof checked === 'undefined' && isChecked) || checked ? 'checked' : '';
  return (
    <StyledButton role="checkbox" className={cname} onClick={handleClick}>
      <StyledThumb className={cname} />
    </StyledButton>
  );
};

export default Toggle;
