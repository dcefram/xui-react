import React, { useState, useEffect, FunctionComponent } from 'react';
import styled from '@emotion/styled';
import shortid from 'shortid';

export interface RadioProps {
  className?: string;
  checked?: boolean;
  label?: string;
  id?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioOuter = styled.div`
  background: #111;
  border: 2px solid #505050;
  border-radius: 15px;
  cursor: pointer;
  height: 13px;
  width: 13px;
  transition: border-color ease 0.3s;

  &:hover {
    border-color: #eeeded;
  }
`;

const SelectedCircle = styled.div`
  background: #ccc;
  border-radius: 10px;
  height: 5px;
  width: 5px;
  margin: 4px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Label = styled.label`
  display: flex;
`;

const Text = styled.span`
  align-items: center;
  color: #ccc;
  display: flex;
  font-size: 11px;
  margin-left: 5px;
`;

const Radio: FunctionComponent<RadioProps> = ({
  id: initialId,
  checked,
  onChange,
  label,
  className,
  ...rest
}) => {
  const [id, setId] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (typeof initialId !== 'undefined') {
      setId(initialId);
    } else {
      setId(shortid.generate());
    }
  }, [initialId]);

  useEffect(() => {
    if (typeof checked !== 'undefined') {
      setIsChecked(checked);
    }
  }, [checked]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (typeof onChange === 'undefined') {
      setIsChecked(event.target.checked);
    } else {
      onChange(event);
    }
  }

  return (
    <div className={className}>
      <HiddenInput
        type="radio"
        id={id}
        checked={isChecked}
        onChange={handleInputChange}
        {...rest}
      />
      <Label htmlFor={id}>
        <RadioOuter>{isChecked && <SelectedCircle />}</RadioOuter>
        <Text>{label}</Text>
      </Label>
    </div>
  );
};

export default Radio;
