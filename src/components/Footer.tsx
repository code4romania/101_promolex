import EmailIcon from '@mui/icons-material/Email';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  Box,
  Link,
  Stack,
  Typography,
  styled,
  Grid,
  Container,
} from '@mui/material';
import logoPromoLexRo from '../assets/images/logo_promo_lex_ro.png';
import logoCfr from '../assets/svg/cfr_logo.svg';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TelegramIcon,
  TwitterIcon,
  YoutubeIcon,
} from './Icons';

const FOOTER_COLOR = '#8B4F8B';
const MediaIcon = styled(Link)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.grey[500],
  borderRadius: 4,
  padding: 3,
  color: theme.palette.common.white,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',

  '&:hover': {
    backgroundColor: FOOTER_COLOR,
  },
}));

export function Footer() {
  return (
    <Stack bgcolor='grey.50' mt='auto'>
      <Container>
        <Box ml={{ xs: 0, md: '25%', lg: '30%' }}>
          <Grid columnSpacing={5} container rowSpacing={2} pb={4} pt={4} px={4}>
            <Grid item xs={12} md={3.3} minWidth={220}>
              <Stack gap={4} flexGrow={0}>
                <Box height={75}>
                  <img
                    alt='Logo Promo-LEX'
                    height='100%'
                    src={logoPromoLexRo}
                  />
                </Box>
                <Stack direction='row' gap={1}>
                  <MediaIcon
                    href='https://www.facebook.com/promolex.md/'
                    target='_blank'
                  >
                    <FacebookIcon />
                  </MediaIcon>
                  <MediaIcon
                    href='https://www.linkedin.com/company/asociatiapromolex/'
                    target='_blank'
                  >
                    <LinkedInIcon />
                  </MediaIcon>
                  <MediaIcon
                    href='https://www.instagram.com/asociatia_promolex/?hl=en'
                    target='_blank'
                  >
                    <InstagramIcon />
                  </MediaIcon>
                  <MediaIcon
                    href='https://twitter.com/promolex'
                    target='_blank'
                  >
                    <TwitterIcon />
                  </MediaIcon>
                  <MediaIcon href='https://t.me/promolex ' target='_blank'>
                    <TelegramIcon />
                  </MediaIcon>
                  <MediaIcon
                    href='https://www.youtube.com/@asociatiapromo-lex8534'
                    target='_blank'
                  >
                    <YoutubeIcon />
                  </MediaIcon>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack gap={2}>
                <Typography
                  color='grey.400'
                  fontWeight='medium'
                  textTransform='uppercase'
                >
                  Contacte
                </Typography>
                <Stack color='grey.400' direction='row' gap={2}>
                  <FmdGoodIcon />
                  <Box>
                    <Typography color='text.primary' fontWeight='medium' noWrap>
                      Str. Mitropolit Petru Movilă 23/13, MD-2004
                    </Typography>
                    <Typography color='text.primary' fontWeight='medium'>
                      Chișinău, Republica Moldova
                    </Typography>
                  </Box>
                </Stack>
                <Stack
                  alignItems='center'
                  color='grey.400'
                  direction='row'
                  gap={2}
                >
                  <PhoneIcon />
                  <Typography
                    color='text.primary'
                    component={Link}
                    fontWeight='medium'
                    href='tel:37322450024'
                    underline='none'
                  >
                    + 373 22 450-024
                  </Typography>
                </Stack>
                <Stack
                  alignItems='center'
                  color='grey.400'
                  direction='row'
                  gap={2}
                >
                  <EmailIcon />
                  <Typography
                    color='text.primary'
                    component={Link}
                    fontWeight='medium'
                    href='mailto:101@promolex.md'
                    underline='none'
                  >
                    101@promolex.md
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Stack alignItems='center' direction='row' gap={2} px={4} mb={2}>
            <Typography
              color='grey.500'
              fontWeight='medium'
              textAlign={{ xs: 'left', md: 'right' }}
            >
              Soluție dezvoltată cu sprijinul{' '}
              <span style={{ whiteSpace: 'nowrap' }}>pro-bono al</span>
            </Typography>
            <img src={logoCfr} alt='' height='30px' style={{ opacity: 0.7 }} />
          </Stack>
        </Box>
      </Container>
      <Stack
        alignContent='center'
        justifyContent='center'
        bgcolor={FOOTER_COLOR}
        color='common.white'
        direction='row'
        gap={2}
        py={3}
        flexWrap='wrap'
      >
        <Typography textAlign='center'>
          Află mai multe despre activitatea Asociației Promo-LEX accesând{' '}
        </Typography>
        <Typography
          color='inherit'
          component={Link}
          fontWeight='bold'
          href='https://promolex.md'
          target='_blank'
          underline='none'
        >
          www.promolex.md
        </Typography>
      </Stack>
    </Stack>
  );
}
