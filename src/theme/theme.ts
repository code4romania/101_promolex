import { createTheme } from "@mui/material/styles";
import { PRIMARY, PRIMARY_DARK, WHITE } from "../constants";

export const theme = createTheme({
  palette: {
    primary: {
      dark: PRIMARY_DARK,
      main: PRIMARY,
      contrastText: WHITE,
    },
  },
  spacing: 4,
  typography: {
    fontFamily: "Titillium Web",
    subtitle1: {
      fontSize: 18,
      fontWeight: 700,
    },
    subtitle2: {
      color: "#00B4CC",
      fontSize: 18,
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: () => `
        html, body, #root {
          height: 100%;
        }
      `,
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
        maxWidth: "lg",
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
});
