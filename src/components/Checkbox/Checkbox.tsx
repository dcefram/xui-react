import React, { useState, useEffect, FunctionComponent } from 'react';
import styled from '@emotion/styled';

import Check from './Check';
import { getId } from '../../helpers/get-id';

export interface CheckboxProps {
  className?: string;
  checked?: boolean;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Box = styled.div`
  background: #111;
  border: 1px solid #555;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 18px;
  width: 18px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Label = styled.label`
  display: flex;
`;

const Text = styled.span`
  color: #ccc;
  font-size: 14px;
  margin-left: 5px;
`;

const Checkbox: FunctionComponent<CheckboxProps> = props => {
  const [checked, setChecked] = useState(!!props.checked);
  const id = getId('checkbox__');

  useEffect(() => {
    if (typeof props.checked !== 'undefined') {
      setChecked(props.checked);
    }
  }, [props.checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof props.onChange !== 'undefined') {
      props.onChange(event);
    } else {
      setChecked(event.target.checked);
    }
  };

  return (
    <div className={props.className}>
      <HiddenInput type="checkbox" id={id} onChange={handleChange} />
      <Label htmlFor={id}>
        <Box>{checked ? <Check /> : null}</Box>
        <Text>{props.label}</Text>
      </Label>
    </div>
  );
};

export default Checkbox;
