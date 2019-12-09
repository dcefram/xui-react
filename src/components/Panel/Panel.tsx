import React, { FunctionComponent, ReactNode } from 'react';
import styled from '@emotion/styled';

export type Variant = 'default' | 'dark';

export interface PanelProps {
  /**
   * Valid variants: `default`, `dark`
   */
  variant: Variant;
  children?: ReactNode;
  label?: string;
}

const getVariant = ({ variant }: PanelProps) => {
  const bg = variant === 'dark' ? '#212121' : 'transparent';
  const borderColor = variant === 'dark' ? '#000' : '#5a5a5a';
  const color = variant === 'dark' ? '#ccc' : 'inherit';

  return `
    background-color: ${bg};
    border: 1px solid ${borderColor};
    color: ${color};
  `;
};

const StyledLabel = styled('label')`
  color: #888;
  font-size: 0.75rem;
  user-select: none;
`;

const StyledPanel = styled('div')<PanelProps>`
  ${getVariant};
  box-sizing: border-box;
  font-size: 0.6875rem;
  margin-top: 2px;
  padding: 7px 6px 6px;
  user-select: none;
`;

const Panel: FunctionComponent<PanelProps> = ({ label, children, ...rest }) => (
  <>
    {label && <StyledLabel>{label}</StyledLabel>}
    <StyledPanel {...rest}>{children}</StyledPanel>
  </>
);

export default Panel;
