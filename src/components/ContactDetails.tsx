import EmailIcon from '@mui/icons-material/Email';
import LaunchIcon from '@mui/icons-material/Launch';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  Button,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TelegramIcon,
  TwitterIcon,
  YoutubeIcon,
} from './Icons';

type LinkButtonProps = {
  label: string;
  href: string;
};

function LinkButton({ label, href }: LinkButtonProps) {
  return (
    <Button
      color='secondary'
      endIcon={<LaunchIcon />}
      href={href}
      LinkComponent={Link}
      sx={{
        width: 'max-content',
      }}
      target='_blank'
      variant='contained'
    >
      {label}
    </Button>
  );
}

type ExternalLinkDetailsProps = {
  label: string;
  href: string;
  phone: string;
};

function ExternalLinkDetails({ label, href, phone }: ExternalLinkDetailsProps) {
  return (
    <Stack>
      <Typography fontWeight='bold'>{label}</Typography>
      <Typography
        color='common.white'
        component={Link}
        href={href}
        target='_blank'
        underline='always'
      >
        Vizitează site-ul
      </Typography>
      <Stack alignItems='center' direction='row' gap={2}>
        <PhoneIcon />
        <Typography
          color='common.white'
          component={Link}
          fontWeight='medium'
          href={`tel:${phone.replaceAll(/[\s,-]/g, '')}}`}
          underline='none'
        >
          {phone}
        </Typography>
      </Stack>
    </Stack>
  );
}

type SocialMediaLink = {
  color: string;
  href: string;
  icon: JSX.Element;
};

function SocialMediaLink({ color, href, icon }: SocialMediaLink) {
  return (
    <Link
      color='common.white'
      component={IconButton}
      href={href}
      size='small'
      target='_blank'
      sx={{
        '&:hover': {
          color,
        },
      }}
    >
      {icon}
    </Link>
  );
}

export function ContactDetails() {
  return (
    <Grid item xs={12} sm={4}>
      <Stack
        color='common.white'
        bgcolor='#88A9B5'
        gap={6}
        height={1}
        px={{ xs: 6, sm: 12 }}
        py={{ xs: 4, sm: 10 }}
        sx={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
        width={1}
      >
        <Typography fontWeight='bold'>Contacte Parlament</Typography>

        <Stack>
          <Typography>Republica Moldova,</Typography>
          <Typography>MD-2004, Mun. Chișinău</Typography>
          <Typography>Bd. Ștefan cel Mare și Sfânt 105</Typography>
        </Stack>

        <Stack alignItems='center' direction='row' gap={2}>
          <PhoneIcon />
          <Typography
            color='common.white'
            component={Link}
            fontWeight='medium'
            href='tel:022820390'
            underline='none'
          >
            022 820-390
          </Typography>
        </Stack>

        <Stack alignItems='center' direction='row' gap={2}>
          <EmailIcon />
          <Typography
            color='common.white'
            component={Link}
            fontWeight='medium'
            href='mailto:info@parlament.md'
            underline='none'
          >
            info@parlament.md
          </Typography>
        </Stack>

        <Stack direction='row' gap={2}>
          <SocialMediaLink
            color='#CC0000'
            href='https://www.youtube.com/channel/UCRfMRKU9POyEX5GYapAZJUw'
            icon={<YoutubeIcon />}
          />
          <SocialMediaLink
            color='#1DA1F2'
            href='https://mobile.twitter.com/Parliament_RM'
            icon={<TwitterIcon />}
          />
          <SocialMediaLink
            color='#0088CC'
            href='https://t.me/ParlamentulRM'
            icon={<TelegramIcon />}
          />
          <SocialMediaLink
            color='#1877F2'
            href='https://www.facebook.com/ParliamentRM'
            icon={<FacebookIcon />}
          />
          <SocialMediaLink
            color='#0A66C2'
            href='https://md.linkedin.com/company/parliamentrm '
            icon={<LinkedInIcon />}
          />
          <SocialMediaLink
            color='#BC2A8D'
            href='https://www.instagram.com/parlamentul_rm/'
            icon={<InstagramIcon />}
          />
        </Stack>

        <LinkButton href='https://vizite.parlament.md/' label='Portal vizite' />
        <LinkButton
          href='https://multimedia.parlament.md/'
          label='Portal Multimedia'
        />
        <LinkButton
          href='https://achizitii.parlament.md/'
          label='Portal Informativ Achiziții Publice'
        />
        <LinkButton
          href='https://www.parlament.md/Rela%c8%9biicucet%c4%83%c8%9beanul/ePeti%c5%a3ii/tabid/215/language/ro-RO/Default.aspx'
          label='E-Petiții'
        />

        <ExternalLinkDetails
          href='https://www.parlament.md/SecretariatulParlamentului/DirectiisiSectii/tabid/139/SectionId/16/language/ro-RO/Default.aspx'
          label='Direcția Petiții și Audiențe'
          phone='022 820-271'
        />
        <ExternalLinkDetails
          href='https://www.parlament.md/SecretariatulParlamentului/DirectiisiSectii/tabid/139/SectionId/70/language/ro-RO/Default.aspx'
          label='Direcția Comunicare și Relații Publice'
          phone='022 820-390'
        />
        <ExternalLinkDetails
          href='https://www.parlament.md/SecretariatulParlamentului/DirectiisiSectii/tabid/139/SectionId/61/language/ro-RO/Default.aspx'
          label='Secretariatul Parlamentului'
          phone='022 820-213'
        />
      </Stack>
    </Grid>
  );
}
