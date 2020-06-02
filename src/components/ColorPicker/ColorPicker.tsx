import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';

import COLORS from './colors';

export interface PalletContainerProps {
  position?: string; // @TODO: Temporary workaround, correct solution is to use portals and check if right boundary is larger than window width
}

export interface Props {
  color?: string;
  onChange?: (color: string) => void;
  onPalleteHover?: (color: string) => void;
}

const Container = styled.div`
  position: relative;
`;

const getPosition = ({ position }: PalletContainerProps) => {
  if (position === 'right') {
    return 'left: 24px;';
  }

  return 'right: calc(100% + 2px);';
};

const ColorPalletOuterContainer = styled.div<PalletContainerProps>`
  ${getPosition};

  background: #000;
  border: 1px solid #555555;
  bottom: 0;
  outline: none;
  padding: 5px;
  position: absolute;
  z-index: 10;
`;

const ColorPalletInnerContainer = styled.div`
  border: 1px solid #555555;
`;

const ColorPalletRow = styled.div`
  display: flex;
`;

const ColorPallet = styled.div`
  border: 1px solid #040404;
  cursor: pointer;
  height: 8px;
  width: 8px;

  &.active {
    border: 1px solid white;
  }
`;

const ColorInputContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 5px;
`;

const ColorInput = styled.input`
  border: 1px solid #a9a9a9;
  padding: 2px 5px;
  width: 50px;
  outline: none;
`;

const ColorPickerSelected = styled.div`
  border: 1px solid #040404;
  cursor: pointer;
  height: 20px;
  width: 20px;
`;

const ColorPicker = ({
  color,
  onChange,
  onPalleteHover,
  position = 'right',
  ...rest
}: Props & PalletContainerProps) => {
  const [selected, setSelected] = useState('#2C2C2C');
  const [hovered, setHovered] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const palletRef = useRef(null);
  const inputRef = useRef(null);
  const ROWS = 7;
  const COLUMNS = COLORS.length / ROWS;

  useEffect(() => {
    if (palletRef && palletRef.current) {
      ((palletRef.current as unknown) as HTMLElement).focus();
    }
  }, [isVisible]);

  useEffect(() => {
    if (typeof color === 'string') {
      setSelected(color);
    }
  }, [color]);

  const handleColorSelect = (index: number) => () => {
    if (typeof onChange === 'function') {
      onChange(COLORS[index]);
    } else {
      setSelected(COLORS[index]);
    }

    setIsVisible(false);
  };
  const handleColorHover = (index: number) => () => {
    if (typeof onPalleteHover === 'function') {
      setHovered(COLORS[index]);
      onPalleteHover(COLORS[index]);
    }
  };
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleColorKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.which !== 13) return;
    if (!/#([0-9A-F]{6}$)|#([0-9A-F]{3}$)/i.test(inputValue)) {
      setInputValue(selected);
      return;
    }

    if (typeof onChange === 'function') {
      onChange(inputValue);
    } else {
      setSelected(inputValue);
    }
  };
  const handleShowPallets = () => {
    setInputValue('');
    setIsVisible(true);
  };
  const handleHidePallets = (event: any) => {
    if (event.relatedTarget !== inputRef.current) {
      setIsVisible(false);

      if (typeof onPalleteHover === 'function') {
        setHovered('');
        onPalleteHover(color || '');
      }
    }
  };

  return (
    <Container {...rest}>
      <ColorPickerSelected
        style={{ backgroundColor: hovered || selected }}
        onClick={handleShowPallets}
      />
      <ColorPalletOuterContainer
        tabIndex={-1}
        ref={palletRef}
        style={{ display: isVisible ? 'block' : 'none' }}
        position={position}
        onBlur={handleHidePallets}
      >
        <ColorInputContainer>
          <ColorInput
            ref={inputRef}
            value={inputValue || hovered || selected}
            onChange={handleColorChange}
            onKeyPress={handleColorKeyPress}
          />
        </ColorInputContainer>
        <ColorPalletInnerContainer>
          {Array.from(new Array(ROWS)).map((_, row: number) => (
            <ColorPalletRow key={`color-pallete-row-${row}`}>
              {Array.from(new Array(COLUMNS)).map((_, column: number) => {
                const index = row * COLUMNS + column;

                return (
                  <ColorPallet
                    key={`color-pallete-column-${row}-${column}`}
                    style={{
                      backgroundColor: COLORS[index]
                    }}
                    className={
                      COLORS[index].toLowerCase() === String(hovered).toLowerCase() ||
                      (COLORS[index].toLowerCase() === String(selected).toLowerCase() &&
                        hovered === '')
                        ? 'active'
                        : undefined
                    }
                    onClick={handleColorSelect(index)}
                    onMouseOver={handleColorHover(index)}
                  />
                );
              })}
            </ColorPalletRow>
          ))}
        </ColorPalletInnerContainer>
      </ColorPalletOuterContainer>
    </Container>
  );
};

export default ColorPicker;
