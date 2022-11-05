import { createTheme } from '@mui/material/styles';
import { PRIMARY, WHITE } from '../constants';

export const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY,
      contrastText: WHITE,
    },
  },
});
