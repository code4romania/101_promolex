import { createTheme } from '@mui/material/styles';
import { roRO } from '@mui/x-data-grid';
import { SECONDARY, PRIMARY, PRIMARY_DARK, WHITE } from '../constants';

export const theme = createTheme(
  {
    palette: {
      primary: {
        dark: PRIMARY_DARK,
        main: PRIMARY,
        contrastText: WHITE,
      },
      secondary: {
        main: SECONDARY,
      },
      divider: SECONDARY,
      grey: {
        100: '#F4F4F5',
        200: '#E5E7EB',
        500: '#6B7280',
        700: '#3F3F46',
        800: '#27272A',
        900: '#18181B',
      },
    },
    spacing: 4,
    typography: {
      fontFamily: 'Titillium Web',
      fontWeightMedium: 600,
      subtitle1: {
        fontSize: 18,
        fontWeight: 700,
      },
      subtitle2: {
        color: '#00B4CC',
        fontSize: 18,
        fontWeight: 500,
      },
    },
    components: {
      MuiBreadcrumbs: {
        styleOverrides: {
          root: {
            paddingTop: 4,
            paddingBottom: 4,
          },
          separator: {
            margin: 0,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: () => `
        html, body, #root {
          height: 100%;
        }
      `,
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            padding: 16,
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            paddingBottom: 8,
            paddingTop: 8,
          },
        },
      },
      MuiDialog: {
        defaultProps: {
          maxWidth: 'lg',
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            gap: 4,
          },
          input: {
            paddingBottom: 8,
            paddingTop: 8,
          },
        },
      },
    },
  },
  roRO,
);
