import { Button, Typography } from '@mui/material';
import { ThemeContext } from './theme';

function App() {
  return (
    <ThemeContext>
      <Typography color='primary' variant='h1' textTransform='uppercase'>
        Promolex
      </Typography>
      <Button variant='contained'>Button</Button>
    </ThemeContext>
  );
}

export default App;
