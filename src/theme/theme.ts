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
    MuiCardContent: {
      styleOverrides: {
        root: {
          paddingBottom: 8,
          paddingTop: 8,
        },
      },
    },
  },
});
