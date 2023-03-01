import { Container, Stack } from '@mui/material';
import { HomeBanner, HomeNewsContainer } from '../components';

export function HomePage() {
  return (
    <Container>
      <Stack gap={8} pt={10} pb={6}>
        <HomeBanner />

        <HomeNewsContainer />
      </Stack>
    </Container>
  );
}
