import React, {
  ReactElement,
  FunctionComponent,
  useState,
  useCallback,
  useRef,
  useEffect,
  useLayoutEffect
} from 'react';
import usePortal from 'react-useportal';
import { FixedSizeList as List } from 'react-window';

import { OptionProps } from './Option';
import { StyledContainer, StyledValue, StyledArrow, StyledListContainer } from './StyledSelect';

export interface SelectProps {
  children?: ReactElement<OptionProps>[];
  value?: string | number;
  width?: number;
  disabled?: boolean;
  style?: any;
  onChange?: (value: any) => void;
}

const Select: FunctionComponent<SelectProps> = ({
  value,
  disabled,
  onChange,
  children = [],
  width = 300,
  style = {},
  ...rest
}) => {
  const containerRef = useRef(null);
  const listRef = useRef(null);
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

  useLayoutEffect(() => {
    const selectedIndex = children.findIndex(child => child.props.value === internalValue);

    if (listRef.current && selectedIndex > -1) {
      ((listRef.current as unknown) as any).scrollToItem(selectedIndex, "center");
    }
  }, [isOpen]);

  function Items({ index, style }: any) {
    const child = children[index];

    return React.cloneElement(child, {
      style: { ...style, height: 'auto' },
      selected: internalValue === child.props.value,
      onClick: handleOptionClick
    });
  }

  return (
    <StyledContainer
      ref={containerRef}
      disabled={disabled}
      style={{
        width,
        ...style
      }}
      {...rest}
    >
      <StyledValue className="xui-styled-value" onClick={handleValueClick}>
        {label}
        <StyledArrow className="xui-styled-arrow" expanded={expanded} />
      </StyledValue>

      {isOpen && (
        <Portal>
          <StyledListContainer style={dropdownStyle}>
            <List
              height={148}
              itemCount={(children || []).length}
              itemSize={25}
              width={width - 2}
              ref={listRef}
            >
              {Items}
            </List>
          </StyledListContainer>
        </Portal>
      )}
    </StyledContainer>
  );
};

export default Select;
