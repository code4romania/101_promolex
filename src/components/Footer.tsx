import EmailIcon from '@mui/icons-material/Email';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Link, Stack, Typography, styled } from '@mui/material';
import logoPromoLexRo from '../assets/images/logo_promo_lex_ro.png';
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
  padding: 8,
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
      <Stack
        alignItems='center'
        direction='row'
        justifyContent='center'
        gap={11}
        pb={15}
        pt={17}
      >
        <Stack gap={8}>
          <Box>
            <img alt='Logo Promo-LEX' height={85} src={logoPromoLexRo} />
          </Box>
          <Stack direction='row' gap={2}>
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
            <MediaIcon href='https://twitter.com/promolex' target='_blank'>
              <TwitterIcon />
            </MediaIcon>
            <MediaIcon>
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
        <Stack gap={4}>
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
              <Typography color='text.primary' fontWeight='medium'>
                Str. Metropolit Petru Movilă 23/13, MD-2004
              </Typography>
              <Typography color='text.primary' fontWeight='medium'>
                Chișinău, Republica Moldova
              </Typography>
            </Box>
          </Stack>
          <Stack alignItems='center' color='grey.400' direction='row' gap={2}>
            <PhoneIcon />
            <Typography
              color='text.primary'
              component={Link}
              fontWeight='medium'
              href='tel:+37322450024'
              underline='none'
            >
              +373 224 500 24
            </Typography>
          </Stack>
          <Stack alignItems='center' color='grey.400' direction='row' gap={2}>
            <EmailIcon />
            <Typography
              color='text.primary'
              component={Link}
              fontWeight='medium'
              href='mailto:info@promolex.md'
              underline='none'
            >
              info@promolex.md
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        alignContent='center'
        justifyContent='center'
        bgcolor={FOOTER_COLOR}
        color='common.white'
        direction='row'
        gap={2}
        py={3}
      >
        <Typography>
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