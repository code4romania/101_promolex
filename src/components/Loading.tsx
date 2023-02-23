import { CircularProgress, Stack, Typography } from '@mui/material';

export function Loading() {
  return (
    <Stack alignItems='center' gap={2} height='50vh' justifyContent='center'>
      <CircularProgress />
      <Typography variant='h6'>Se încarcă...</Typography>
    </Stack>
  );
}
