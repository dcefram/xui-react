import React from 'react';
import styled from '@emotion/styled';

export interface ArrowProps {
  expanded: boolean;
}

const getArrow = ({ expanded }: ArrowProps) => {
  const pos = expanded ? 'bottom' : 'top';

  return `
    border-${pos}: 5px solid #888;
  `;
};

export const StyledArrow = styled('div')<ArrowProps>`
  &:after {
    ${getArrow};

    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    content: '';
    height: 0;
    width: 0;
  }

  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  position: absolute;
  right: 6px;
  top: 0;
`;

export const StyledValue = styled('div')`
  max-width: -webkit-fill-available;
  background-color: #393939;
  box-sizing: border-box;
  padding: 2.4px 25px 2.4px 6px;
  padding-right: 25px;
  width: 100%;
  line-height: 14px;
  font-size: 11px;
  color: #ccc;
  height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 1px solid #040404;
  cursor: pointer;
  user-select: none;

  > * {
    -webkit-line-clamp: 1;
    display: -webkit-box;
    color: #ccc;
    font-size: 12px;
    line-height: 17px;
  }

  &:hover > .xui-styled-arrow,
  &:active > .xui-styled-arrow {
    border-top-color: #ccc;
    border-bottom-color: #ccc;
  }
`;

export const StyledContainer = styled('div')<any>`
  position: relative;
  display: inline-block;
  outline: none;
  font-size: 11px;
  display: inline-block;
  min-width: 50px;
  cursor: pointer;

  :hover {
    cursor: pointer;
  }

  &[disabled] {
    & > .xui-styled-value {
      background-color: #292929;
      color: #444;
      cursor: auto;
    }

    & > .xui-styled-arrow {
      border-top-color: #444 !important;
      border-bottom-color: #444 !important;
    }
  }
`;

export const StyledListContainer = styled('ul')`
  box-sizing: border-box;
  background: #060606;
  border: 1px solid #393939;
  color: #888;
  list-style: none;
  margin: 0;
  max-height: 150px;
  padding: 0;
  position: absolute;
`;
