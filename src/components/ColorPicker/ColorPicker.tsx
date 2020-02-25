import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';

import COLORS from './colors';

export interface Props {
  color?: string;
  onChange?: (color: string) => void;
}

const Container = styled.div`
  position: relative;
`;

const ColorPalletOuterContainer = styled.div`
  background: #000;
  border: 1px solid #555555;
  bottom: 0;
  left: 24px;
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

const ColorPicker = ({ color, onChange }: Props) => {
  const [selected, setSelected] = useState('#2C2C2C');
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
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange === 'function') {
      onChange(event.target.value);
    } else {
      setSelected(event.target.value);
    }
  };
  const handleShowPallets = () => {
    setIsVisible(true);
  };
  const handleHidePallets = (event: any) => {
    if (!event.relatedTarget === inputRef.current) {
      setIsVisible(false);
    }
  };

  return (
    <Container>
      <ColorPickerSelected style={{ backgroundColor: selected }} onClick={handleShowPallets} />
      <ColorPalletOuterContainer
        tabIndex={-1}
        ref={palletRef}
        style={{ display: isVisible ? 'block' : 'none' }}
        onBlur={handleHidePallets}
      >
        <ColorInputContainer>
          <ColorInput ref={inputRef} value={selected} onChange={handleColorChange} />
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
                      COLORS[index].toLowerCase() === String(selected).toLowerCase()
                        ? 'active'
                        : undefined
                    }
                    onClick={handleColorSelect(index)}
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
