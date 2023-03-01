import { Button, Container, Stack, Typography } from '@mui/material';
import secondBanner from '../assets/images/second_banner.png';
import { HomeBanner, HomeNewsContainer } from '../components';

export function HomePage() {
  return (
    <Container>
      <Stack gap={8} pt={10} pb={6}>
        <HomeBanner />

        <HomeNewsContainer />

        <Stack
          alignItems='center'
          height={360}
          justifyContent='center'
          gap={6}
          sx={{
            backgroundImage: `url(${secondBanner})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <Typography fontWeight='bold' variant='h3'>
            Cunoașteți deputații din Parlamentul Republicii Moldova
          </Typography>
          <Button color='secondary' variant='contained'>
            Mergi la pagina Deputați
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
