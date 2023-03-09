import EmailIcon from '@mui/icons-material/Email';
import LaunchIcon from '@mui/icons-material/Launch';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  Alert,
  AlertProps,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  Link,
  OutlinedInput,
  Slide,
  Snackbar,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  PageContainer,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TelegramIcon,
  TwitterIcon,
  YoutubeIcon,
} from '../components';
import { useSendQuestionMutation } from '../mutations';
import { ContactFormData } from '../types';

const StyledInputLabel = styled(InputLabel)({
  fontWeight: 600,
  position: 'relative',
  transform: 'none',
});

export function ContactPage() {
  const [alert, setAlert] = useState<{
    message: string;
    severity?: AlertProps['severity'];
  }>({ message: '' });
  const [open, setOpen] = useState(false);

  const { handleSubmit, control } = useForm<ContactFormData>({
    defaultValues: {
      email: '',
      name: '',
      phone_number: '',
      question_for: '',
      question: '',
      sur_name: '',
    },
  });

  const { mutate: sendQuestion, isLoading } = useSendQuestionMutation();

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    sendQuestion(data, {
      onSuccess: (response) => {
        setAlert({
          message: response,
          severity: 'success',
        });
        setOpen(true);
      },
      onError: () => {
        setAlert({
          message: 'A apărut o eroare. Vă rugăm să încercați din nou.',
          severity: 'error',
        });
        setOpen(true);
      },
    });
  };

  return (
    <PageContainer pageTitle='Întreabă Parlamentul'>
      <Typography fontWeight='bold' py={6} variant='h4'>
        Vedeți aici cum puteți contacta Parlamentul sau funcționarii publici:
      </Typography>
      <Grid borderRadius={2} boxShadow={3} container>
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
            <Typography fontWeight='bold'>
              Contacte Parlamentul Rep. Moldova
            </Typography>

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
                href='tel:022-820-390'
                underline='none'
              >
                022-820-390
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
              <Link
                color='common.white'
                component={IconButton}
                href='https://www.youtube.com/channel/UCRfMRKU9POyEX5GYapAZJUw'
                size='small'
                target='_blank'
                sx={{
                  '&:hover': {
                    color: '#CC0000',
                  },
                }}
              >
                <YoutubeIcon />
              </Link>
              <Link
                color='common.white'
                component={IconButton}
                href='https://mobile.twitter.com/Parliament_RM'
                size='small'
                target='_blank'
                sx={{
                  '&:hover': {
                    color: '#1DA1F2',
                  },
                }}
              >
                <TwitterIcon />
              </Link>
              <Link
                color='common.white'
                component={IconButton}
                // @todo add telegram link
                href='/'
                size='small'
                target='_blank'
                sx={{
                  '&:hover': {
                    color: '#0088CC',
                  },
                }}
              >
                <TelegramIcon />
              </Link>
              <Link
                color='common.white'
                component={IconButton}
                href='https://www.facebook.com/ParliamentRM'
                size='small'
                target='_blank'
                sx={{
                  '&:hover': {
                    color: '#1877F2',
                  },
                }}
              >
                <FacebookIcon />
              </Link>
              <Link
                color='common.white'
                component={IconButton}
                // @todo add linkedin link
                href='/'
                size='small'
                target='_blank'
                sx={{
                  '&:hover': {
                    color: '#0A66C2',
                  },
                }}
              >
                <LinkedInIcon />
              </Link>
              <Link
                color='common.white'
                component={IconButton}
                href='https://www.instagram.com/parlamentul_rm/'
                size='small'
                target='_blank'
                sx={{
                  '&:hover': {
                    color: '#BC2A8D',
                  },
                }}
              >
                <InstagramIcon />
              </Link>
            </Stack>

            <Button
              color='secondary'
              endIcon={<LaunchIcon />}
              href='https://vizite.parlament.md/'
              LinkComponent={Link}
              sx={{
                width: 'max-content',
              }}
              target='_blank'
              variant='contained'
            >
              Portal vizite
            </Button>

            <Button
              color='secondary'
              endIcon={<LaunchIcon />}
              // @todo add multimedia link
              href='/'
              LinkComponent={Link}
              sx={{
                width: 'max-content',
              }}
              target='_blank'
              variant='contained'
            >
              Portal Multimedia
            </Button>

            <Button
              color='secondary'
              endIcon={<LaunchIcon />}
              href='https://achizitii.parlament.md/'
              LinkComponent={Link}
              sx={{
                width: 'max-content',
              }}
              target='_blank'
              variant='contained'
            >
              Portal Informativ Achiziții Publice
            </Button>

            <Button
              color='secondary'
              endIcon={<LaunchIcon />}
              href='https://www.parlament.md/Rela%c8%9biicucet%c4%83%c8%9beanul/ePeti%c5%a3ii/tabid/215/language/ro-RO/Default.aspx'
              LinkComponent={Link}
              sx={{
                width: 'max-content',
              }}
              target='_blank'
              variant='contained'
            >
              E-Petiții
            </Button>

            <Stack>
              <Typography fontWeight='bold'>
                Direcția Petiții și Audiențe
              </Typography>
              <Typography
                color='common.white'
                component={Link}
                href='https://www.parlament.md/SecretariatulParlamentului/DirectiisiSectii/tabid/139/SectionId/16/language/ro-RO/Default.aspx'
                target='_blank'
                underline='always'
              >
                Vizitează site-ul
              </Typography>
            </Stack>

            <Stack>
              <Typography fontWeight='bold'>
                Secretariatul Parlamentului
              </Typography>
              <Typography
                color='common.white'
                component={Link}
                href='https://www.parlament.md/SecretariatulParlamentului/DirectiisiSectii/tabid/139/SectionId/61/language/ro-RO/Default.aspx'
                target='_blank'
                underline='always'
              >
                Vizitează site-ul
              </Typography>
            </Stack>

            <Stack>
              <Typography fontWeight='bold'>
                Direcția Comunicare și Relații Publice
              </Typography>
              <Typography
                color='common.white'
                component={Link}
                href='https://www.parlament.md/SecretariatulParlamentului/DirectiisiSectii/tabid/139/SectionId/70/language/ro-RO/Default.aspx'
                target='_blank'
                underline='always'
              >
                Vizitează site-ul
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          columnSpacing={8}
          component='form'
          container
          item
          onSubmit={handleSubmit(onSubmit)}
          rowSpacing={2}
          xs={12}
          sm={8}
          px={{ xs: 6, sm: 12 }}
          py={{ xs: 4, sm: 10 }}
        >
          <Grid item mb={4} xs={12}>
            <Typography fontWeight='bold' mb={4}>
              Dacă doriți să expediați o întrebare Parlamentului (instituției)
              sau deputaților prin intermediul Asociației Promo-LEX, o puteți
              lăsa mai jos respectând aceste reguli:
            </Typography>
            <Typography fontWeight='bold'>Reguli:</Typography>
            <Typography>
              1. Asociația Promo-LEX va utiliza un filtru uman de verificare
              care se va asigura că, informațiile plasate pe această pagină nu
              instigă la ură sau discriminare, nu conține expresii licențioase
              etc.
            </Typography>
            <Typography>
              2. Răspunsul la întrebarea dumneavoastră este în responsabilitatea
              instituției sau a deputatului căruia i-a fost adresată.
            </Typography>
            <Typography>
              3. Limite de utilizare - <strong>toate</strong> câmpurile de
              informație trebuie completate, iar întrebarea nu trebuie să
              depășească <strong>1800</strong> caractere.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              name='name'
              render={({ field, fieldState }) => (
                <FormControl fullWidth>
                  <StyledInputLabel htmlFor={field.name} variant='outlined'>
                    Nume
                  </StyledInputLabel>
                  <OutlinedInput
                    error={Boolean(fieldState.error)}
                    id={field.name}
                    {...field}
                  />
                  <FormHelperText error={Boolean(fieldState.error)}>
                    {fieldState.error?.message ?? ' '}
                  </FormHelperText>
                </FormControl>
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Acest câmp este obligatoriu',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              name='sur_name'
              render={({ field, fieldState }) => (
                <FormControl fullWidth>
                  <StyledInputLabel htmlFor={field.name} variant='outlined'>
                    Prenume
                  </StyledInputLabel>
                  <OutlinedInput
                    error={Boolean(fieldState.error)}
                    id={field.name}
                    {...field}
                  />
                  <FormHelperText error={Boolean(fieldState.error)}>
                    {fieldState.error?.message ?? ' '}
                  </FormHelperText>
                </FormControl>
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Acest câmp este obligatoriu',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              name='email'
              render={({ field, fieldState }) => (
                <FormControl fullWidth>
                  <StyledInputLabel htmlFor={field.name} variant='outlined'>
                    Email
                  </StyledInputLabel>
                  <OutlinedInput
                    error={Boolean(fieldState.error)}
                    id={field.name}
                    {...field}
                  />
                  <FormHelperText error={Boolean(fieldState.error)}>
                    {fieldState.error?.message ?? ' '}
                  </FormHelperText>
                </FormControl>
              )}
              rules={{
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Adresa de email nu este validă',
                },
                required: {
                  value: true,
                  message: 'Acest câmp este obligatoriu',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              name='phone_number'
              render={({ field, fieldState }) => (
                <FormControl fullWidth>
                  <StyledInputLabel htmlFor={field.name} variant='outlined'>
                    Telefon
                  </StyledInputLabel>
                  <OutlinedInput
                    error={Boolean(fieldState.error)}
                    id={field.name}
                    {...field}
                  />
                  <FormHelperText error={Boolean(fieldState.error)}>
                    {fieldState.error?.message ?? ' '}
                  </FormHelperText>
                </FormControl>
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Acest câmp este obligatoriu',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name='question_for'
              render={({ field, fieldState }) => (
                <FormControl fullWidth>
                  <StyledInputLabel htmlFor={field.name} variant='outlined'>
                    Întrebarea este adresată deputatului/deputatei/Parlamentului
                    (instituției)
                  </StyledInputLabel>
                  <OutlinedInput
                    error={Boolean(fieldState.error)}
                    id={field.name}
                    {...field}
                  />
                  <FormHelperText error={Boolean(fieldState.error)}>
                    {fieldState.error?.message ?? ' '}
                  </FormHelperText>
                </FormControl>
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Acest câmp este obligatoriu',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name='question'
              render={({ field, fieldState }) => (
                <FormControl fullWidth>
                  <StyledInputLabel htmlFor={field.name} variant='outlined'>
                    Întrebarea
                  </StyledInputLabel>
                  <OutlinedInput
                    error={Boolean(fieldState.error)}
                    id={field.name}
                    multiline
                    rows={6}
                    {...field}
                  />
                  <FormHelperText error={Boolean(fieldState.error)}>
                    {fieldState.error?.message ?? ' '}
                  </FormHelperText>
                </FormControl>
              )}
              rules={{
                maxLength: {
                  value: 1800,
                  message: 'Întrebarea poate avea maximum 1800 de caractere',
                },
                required: {
                  value: true,
                  message: 'Acest câmp este obligatoriu',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box textAlign='right'>
              <Button
                color='secondary'
                variant='contained'
                type='submit'
                sx={{ minWidth: 80 }}
              >
                {isLoading ? (
                  <CircularProgress color='primary' size={24.5} />
                ) : (
                  'Trimite'
                )}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} mt={4}>
            <Typography fontWeight='bold'>
              Dacă doriți să expediați o întrebare deputaților, accesând pagina
              Deputați, veți putea găsi datele de contact ale acestora.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        autoHideDuration={6000}
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Slide}
        TransitionProps={{
          onExited: () => setAlert({ message: '' }),
        }}
      >
        <Alert variant='filled' severity={alert.severity ?? 'info'}>
          {alert.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}
