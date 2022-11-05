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
  },
});
