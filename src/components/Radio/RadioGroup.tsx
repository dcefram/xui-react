// Due to the sad nature of onChange events in radio buttons, we would need this
// just to mimic the native behavior of radio buttons
import React, { useState, FunctionComponent, useEffect } from 'react';

interface RadioGroupProps {
  value?: any;
  children?: any;
  onChange?: (value: any) => void;
}

const RadioGroup: FunctionComponent<RadioGroupProps> = ({
  value: initialValue,
  children,
  onChange
}) => {
  const [value, setValue] = useState('' as any);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (typeof onChange === 'undefined') {
      setValue(event.target.value);
    } else {
      onChange(event.target.value);
    }
  }

  return (
    <>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, {
          ...child.props,
          checked: child.props.value === value,
          onChange: handleChange
        })
      )}
    </>
  );
};

export default RadioGroup;
