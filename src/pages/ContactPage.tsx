import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import {
  Grid,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { ContactDetails, ContactForm, PageContainer } from '../components';

export function ContactPage() {
  return (
    <PageContainer pageTitle='Întreabă Parlamentul'>
      <Typography fontWeight='bold' py={6} variant='h4'>
        Opțiuni de contactare a Parlamentului sau a deputaților
      </Typography>
      <Grid borderRadius={2} boxShadow={3} container mb={12}>
        <ContactDetails />

        <ContactForm />
      </Grid>

      <Typography fontWeight='bold' variant='h4'>
        Întrebări și răspunsuri recepționate:
      </Typography>

      {/* @todo replace with data from API */}
      <List>
        <ListItem divider>
          <ListItemText
            primary={
              <Stack alignItems='center' direction='row' gap={2}>
                <Typography fontWeight='medium'>
                  Întrebarea unu către Paralament ?
                </Typography>
                <Typography
                  alignItems='center'
                  component={MuiLink}
                  display='inline-flex'
                  href='/'
                  ml='auto'
                  whiteSpace='nowrap'
                >
                  Vezi răspunsul <AttachFileRoundedIcon fontSize='small' />
                </Typography>
              </Stack>
            }
          />
        </ListItem>
        <ListItem divider>
          <ListItemText
            primary={
              <Stack alignItems='center' direction='row' gap={2}>
                <Typography fontWeight='medium'>
                  Întrebarea doi către Paralament ?
                </Typography>
                <Typography
                  alignItems='center'
                  component={MuiLink}
                  display='inline-flex'
                  href='/'
                  ml='auto'
                  whiteSpace='nowrap'
                >
                  Vezi răspunsul <AttachFileRoundedIcon fontSize='small' />
                </Typography>
              </Stack>
            }
          />
        </ListItem>
        <ListItem divider>
          <ListItemText
            primary={
              <Stack alignItems='center' direction='row' gap={2}>
                <Typography fontWeight='medium'>
                  Întrebarea trei către Paralament ?
                </Typography>
                <Typography
                  alignItems='center'
                  component={MuiLink}
                  display='inline-flex'
                  href='/'
                  ml='auto'
                  whiteSpace='nowrap'
                >
                  Vezi răspunsul <AttachFileRoundedIcon fontSize='small' />
                </Typography>
              </Stack>
            }
          />
        </ListItem>
      </List>
    </PageContainer>
  );
}
