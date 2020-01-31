import React, { FunctionComponent } from 'react';
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
        `}
      />
      <EmotionThemeProvider theme={theme || {}}>{children}</EmotionThemeProvider>
    </div>
  );
}

export default ThemeProvider;
