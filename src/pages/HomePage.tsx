import { Container, Stack } from '@mui/material';
import { HomeBanner } from '../components';

export function HomePage() {
  return (
    <Stack gap={4} pt={10} pb={6}>
      <Container>
        <HomeBanner />
      </Container>
    </Stack>
  );
}
