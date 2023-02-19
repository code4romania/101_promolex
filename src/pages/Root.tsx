import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components';

export function Root() {
  return (
    <Stack pb={8}>
      <Navbar />
      <Outlet />
    </Stack>
  );
}
