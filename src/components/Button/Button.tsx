import React, { FunctionComponent } from 'react';
import { lighten, darken, transparentize } from 'polished';
import styled from '@emotion/styled';

import get from '../../helpers/get-hex';

export interface ButtonProps {
  primary?: boolean;
  disabled?: boolean;
  theme?: any;
}

const getVariant = ({ primary, theme }: ButtonProps) => {
  const bg = primary
    ? get(theme, ['colors', 'primary'], '#0C6996')
    : get(theme, ['colors', 'defaultButton'], '#191919');

  const boxShadow = primary
    ? 'none'
    : `0 0 0 1px inset ${get(theme, ['colors', 'defaultButtonShadow'], '#555')}`;

  return `
    background: ${bg};
    box-shadow: ${boxShadow};
    transition: all .3s;

    &:hover:not([disabled]) {
      background: ${lighten(0.1, bg)};
    }

    &[disabled] {
      background: ${darken(0.1, bg)};
      color: ${transparentize(0.8, 'white')}
    }
  `;
};

const StyledButton = styled('button')<ButtonProps>`
  ${getVariant};
  border: 0;
  cursor: pointer;
  color: white;
  font-size: 0.75rem;
  line-height: 22px;
  margin-right: 5px;
  padding: 3px 18px;
  outline: none;

  &:last-of-type {
    margin-right: 0;
  }
`;

const Button: FunctionComponent<ButtonProps> = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

export default Button;
