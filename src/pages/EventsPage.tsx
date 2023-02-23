import { Container, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '../components';

export function EventsPage() {
  return (
    <Stack>
      <Header title='Noutăți' />
      <Container>
        <Outlet />
      </Container>
    </Stack>
  );
}
