import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import secondBanner from '../assets/images/second_banner.png';
import secondBannerMobile from '../assets/images/second_banner_mobile.png';
import { HomeBanner, HomeNewsContainer } from '../components';
import {
  HomeCommitteesIcon,
  HomeControlIcon,
  HomeLawsIcon,
} from '../components/Icons';
import { LegislativeActivityRoutes, Routes } from '../types';

const activityObjects = [
  {
    color: '#88A9B5',
    icon: HomeLawsIcon,
    title: 'Proiecte de legi și hotărâri',
    description:
      'Inițiativele înregistrate în Parlament, cine sunt autorii acestora și care este statutul lor.',
    url: `${Routes.LegislativeActivity}/${LegislativeActivityRoutes.projects}`,
  },
  {
    color: '#E9C699',
    icon: HomeCommitteesIcon,
    title: 'Comisii parlamentare permanente',
    description:
      'Componența comisiilor parlamentare permanente, datele de contact ale acestora și detalii despre activitatea comisiilor monitorizate de Promo-LEX',
    url: `${Routes.LegislativeActivity}/${LegislativeActivityRoutes.committees}`,
  },
  {
    color: '#EE7C83',
    icon: HomeControlIcon,
    title: 'Control parlamentar',
    description:
      'Care sunt instrumentele de control parlamentar disponibile deputaților și cum sunt folosite acestea în activitatea legislativului',
    url: `${Routes.LegislativeActivity}/${LegislativeActivityRoutes.control}`,
  },
];

export function HomePage() {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));

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
            backgroundImage: `url(${
              isMobile ? secondBannerMobile : secondBanner
            })`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          }}
          py={4}
        >
          <Typography fontWeight='bold' variant='h3' textAlign='center'>
            Cunoaște deputații din Parlamentul Republicii Moldova
          </Typography>
          <Link to={Routes.Deputies} style={{ textDecoration: 'none' }}>
            <Button color='secondary' size='large' variant='contained'>
              Mergi la pagina Deputați
            </Button>
          </Link>
        </Stack>

        <Stack gap={4}>
          <Box
            color='common.white'
            bgcolor='secondary.main'
            ml='auto'
            px={16}
            py={2}
            sx={{
              borderTopLeftRadius: 99,
              borderBottomLeftRadius: 99,
            }}
            width='max-content'
          >
            <Typography>Activitate legislativă</Typography>
          </Box>
          <Grid container spacing={6} px={4}>
            {activityObjects.map(
              ({ color, title, description, icon: Icon, url }) => (
                <Grid key={title} item xs={12} sm={4}>
                  <Stack
                    borderRadius={2}
                    color='text.primary'
                    component={Link}
                    gap={2}
                    textAlign='center'
                    px={4}
                    py={8}
                    to={url}
                    sx={{
                      textDecoration: 'none',

                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    <Box color={color} fontSize={80}>
                      <Icon color='inherit' fontSize='inherit' />
                    </Box>
                    <Typography fontWeight='medium' variant='h5'>
                      {title}
                    </Typography>
                    <Typography>{description}</Typography>
                  </Stack>
                </Grid>
              ),
            )}
          </Grid>
        </Stack>
      </Stack>
    </Container>
  );
}
