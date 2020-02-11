import React, {
  ReactElement,
  FunctionComponent,
  useState,
  useCallback,
  useRef,
  useEffect
} from 'react';
import usePortal from 'react-useportal';

import { OptionProps } from './Option';
import { StyledContainer, StyledValue, StyledArrow, StyledListContainer } from './StyledSelect';

export interface SelectProps {
  children?: ReactElement<OptionProps>[];
  value?: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
}

const Select: FunctionComponent<SelectProps> = ({
  value,
  disabled,
  onChange,
  children = [],
  ...rest
}) => {
  const containerRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [label, setLabel] = useState('');
  const [internalValue, setInternalValue] = useState(value);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const handleValueClick = useCallback(
    event => {
      const canExpand = !disabled && children.length > 0;

      if (expanded) {
        closePortal();
      } else if (canExpand) {
        openPortal(event);
      }

      setExpanded(canExpand ? !expanded : false);
    },
    [expanded, disabled, children.length]
  );
  const handlePortalClose = () => {
    setExpanded(false);
  };
  const handlePortalOpen = () => {
    if (containerRef.current) {
      const clientRect = ((containerRef.current as unknown) as HTMLElement).getClientRects();
      const { bottom, left, width } = clientRect[0];
      const scrollOffset = window.pageYOffset;

      // @TODO: auto vertical position the dropdown if it hits the bottom edge po.
      setDropdownStyle({
        top: bottom + scrollOffset,
        left,
        width
      });
    }
  };
  const handleOptionClick = (_: any, value: any) => {
    React.Children.forEach(children, (child: ReactElement<OptionProps>) => {
      if (value === child.props.value) {
        setLabel(child.props.children as string);
        closePortal();
        if (typeof onChange === 'function') {
          onChange(value);
        } else {
          setInternalValue(value);
        }
      }
    });
  };

  const { openPortal, closePortal, isOpen, Portal } = usePortal({
    onClose: handlePortalClose,
    onOpen: handlePortalOpen,
    closeOnOutsideClick: true,
    closeOnEsc: true
  });

  useEffect(() => {
    React.Children.forEach(children, (child: ReactElement<OptionProps>) => {
      if (value === child.props.value) {
        setLabel(child.props.children as string);
        setInternalValue(child.props.value as string);
      }
    });
  }, [value]);

  return (
    <StyledContainer ref={containerRef} disabled={disabled} {...rest}>
      <StyledValue className="xui-styled-value" onClick={handleValueClick}>
        {label}
        <StyledArrow className="xui-styled-arrow" expanded={expanded} />
      </StyledValue>

      {isOpen && (
        <Portal>
          <StyledListContainer style={dropdownStyle}>
            {
              (React.Children.map(children, (child: ReactElement<OptionProps>) =>
                React.cloneElement(child, {
                  selected: internalValue === child.props.value,
                  onClick: handleOptionClick
                })
              ) as unknown) as ReactElement<OptionProps>
            }
          </StyledListContainer>
        </Portal>
      )}
    </StyledContainer>
  );
};

export default Select;
