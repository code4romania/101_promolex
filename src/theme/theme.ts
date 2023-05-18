import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { roRO } from '@mui/x-data-grid';
import { SECONDARY, PRIMARY, PRIMARY_DARK, WHITE } from '../constants';

export const theme = responsiveFontSizes(
  createTheme(
    {
      palette: {
        mode: 'light',
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
        h1: {
          fontSize: '2.25rem',
        },
        h2: {
          fontSize: '2rem',
        },
        h3: {
          fontSize: '1.75rem',
        },
        h4: {
          fontSize: '1.5rem',
        },
        h5: {
          fontSize: '1.25rem',
        },
        h6: {
          fontSize: '1.125rem',
        },
        body1: {
          fontSize: '0.875rem',
        },
        body2: {
          fontSize: '0.75rem',
        },
        button: {
          fontSize: '0.75rem',
        },
        caption: {
          fontSize: '0.625rem',
        },
        subtitle1: {
          fontSize: '1rem',
          fontWeight: 700,
        },
        subtitle2: {
          color: '#00B4CC',
          fontSize: '0.875rem',
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
        MuiInputLabel: {
          styleOverrides: {
            root: {
              color: 'inherit',
              '&.Mui-error': {
                color: 'inherit',
              },
            },
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
  ),
);
