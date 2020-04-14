import React from 'react';
import { Global, css } from '@emotion/core';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';

export interface ThemeProviderProps<Theme> {
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
  children?: React.ReactNode;
}

function ThemeProvider<Theme>({ theme, children }: ThemeProviderProps<Theme>): React.ReactElement {
  return (
    <div>
      <Global
        styles={css`
          body {
            font-family: roboto, 'Malgun Gothic', sans-serif;
          }
          
          ::-webkit-scrollbar {
            width: 12px;
            cursor: pointer;
          }
          
          ::-webkit-scrollbar-button {
            background-color: #000;
            background-repeat: no-repeat;
            background-position: center;
            height: 10px;
            width: 10px;
          }
          
          ::-webkit-scrollbar-thumb {
            background-color: #393939;
            border: 1px solid #000;
            cursor: pointer;
            width: 10px;
          }
          
          ::-webkit-scrollbar-track {
            background-color: #000;
            width: 12px;
          }
        `}
      />
      <EmotionThemeProvider theme={theme || {}}>{children}</EmotionThemeProvider>
    </div>
  );
}

export default ThemeProvider;
