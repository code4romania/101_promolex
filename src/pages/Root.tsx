import { Stack } from '@mui/material';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Footer, Navbar } from '../components';

export function Root() {
  return (
    <Stack height={1}>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </Stack>
  );
}
