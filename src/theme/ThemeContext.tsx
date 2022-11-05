import { ThemeProvider } from '@mui/material/styles';
import { PropsWithChildren } from 'react';
import { theme } from './theme';

export function ThemeContext({ children }: PropsWithChildren) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
