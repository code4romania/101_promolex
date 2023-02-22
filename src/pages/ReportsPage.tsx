import { Container, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '../components';

export function ReportsPage() {
  return (
    <Stack>
      <Header title='Publicații' />
      <Container>
        <Outlet />
      </Container>
    </Stack>
  );
}
