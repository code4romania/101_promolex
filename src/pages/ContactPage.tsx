import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import {
  Alert,
  AlertProps,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  Slide,
  Snackbar,
  Stack,
  styled,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ContactDetails, PageContainer } from '../components';
import { useSendQuestionMutation } from '../mutations';
import { ContactFormData, Routes } from '../types';
import { auth } from '../utils';
import { LoginDialog } from './LoginDialog';

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
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const { control, handleSubmit, setValue } = useForm<ContactFormData>({
    defaultValues: {
      email: '',
      name: '',
      phone_number: '',
      question_for: '',
      question: '',
      sur_name: '',
    },
    mode: 'all',
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

  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!user || loading) {
      return;
    }

    setValue('email', user.email ?? '');
  }, [loading, setValue, user]);

  return (
    <PageContainer pageTitle='Întreabă Parlamentul'>
      <Typography fontWeight='bold' py={6} variant='h4'>
        Opțiuni de contactare a Parlamentului sau a deputaților
      </Typography>
      <Grid borderRadius={2} boxShadow={3} container mb={12}>
        <ContactDetails />

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
          <Grid item xs={12}>
            <Alert severity='info' variant='outlined' sx={{ py: 3 }}>
              <AlertTitle sx={{ mb: 0, fontWeight: 500 }}>
                Pentru a contacta direct deputații, găsiți datele de contact ale
                acestora{' '}
                <Typography
                  color='#780000'
                  component={Link}
                  fontWeight={700}
                  sx={{
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: 'primary.main',
                    },
                  }}
                  to={Routes.Deputies}
                >
                  aici
                </Typography>
                .
              </AlertTitle>
            </Alert>

            <Box pt={6}>
              <Typography fontWeight='bold' mb={2}>
                Alternativ, puteți adresa Parlamentului (instituției) sau
                deputaților o întrebare prin intermediul Asociației Promo-LEX
                respectând următoarele reguli:
              </Typography>
              <Typography>1. Adresați întrebări de interes public.</Typography>
              <Typography>
                2. Întrebarea nu trebuie să instige la ură, discriminare sau să
                conțină expresii licențioase etc.
              </Typography>
              <Typography>
                3. Este obligatorie completarea tuturor câmpurilor, iar textul
                întrebării nu trebuie să depășească spațiul oferit.
              </Typography>
              <Typography>
                4. Politica de protecție a datelor cu caracter personal. Termeni
                și condiții de utilizare a paginii www.101.promolex.md o găsiți{' '}
                <Typography
                  color='#780000'
                  component='a'
                  fontWeight={700}
                  sx={{
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: 'primary.main',
                    },
                  }}
                  href={`${process.env.PUBLIC_URL}/terms.pdf`}
                  target='_blank'
                >
                  aici
                </Typography>
                .
              </Typography>
            </Box>

            {!user && !loading && (
              <Box textAlign='center'>
                <Button
                  color='secondary'
                  disabled={loading}
                  onClick={() => setOpenLoginDialog(true)}
                  sx={{ minWidth: 80 }}
                  variant='contained'
                >
                  {isLoading ? (
                    <CircularProgress color='primary' size={24.5} />
                  ) : (
                    'Adresați o întrebare'
                  )}
                </Button>
              </Box>
            )}
            {loading && (
              <Box
                alignItems='center'
                display='flex'
                justifyContent='center'
                height={200}
              >
                <CircularProgress size={24} />
              </Box>
            )}
          </Grid>
          {user && !loading && (
            <>
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
                        disabled
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
                        Întrebarea este adresată deputatului/deputatei sau
                        Parlamentului
                      </StyledInputLabel>
                      <OutlinedInput
                        error={Boolean(fieldState.error)}
                        id={field.name}
                        {...field}
                      />
                      <FormHelperText error={Boolean(fieldState.error)}>
                        {fieldState.error?.message ?? 'Max. 500 caractere'}
                      </FormHelperText>
                    </FormControl>
                  )}
                  rules={{
                    maxLength: {
                      value: 500,
                      message: 'Câmpul poate avea maximum 500 de caractere',
                    },
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
                        Întrebarea*
                      </StyledInputLabel>
                      <OutlinedInput
                        error={Boolean(fieldState.error)}
                        id={field.name}
                        multiline
                        rows={6}
                        {...field}
                      />
                      <FormHelperText error={Boolean(fieldState.error)}>
                        {fieldState.error?.message ?? 'Max. 1800 caractere'}
                      </FormHelperText>
                    </FormControl>
                  )}
                  rules={{
                    maxLength: {
                      value: 1800,
                      message:
                        'Întrebarea poate avea maximum 1800 de caractere',
                    },
                    required: {
                      value: true,
                      message: 'Acest câmp este obligatoriu',
                    },
                  }}
                />
                <Typography fontWeight='bold'>
                  *Răspunsul la întrebarea dumneavoastră este în
                  responsabilitatea instituției sau a deputatului căruia i-a
                  fost adresată.
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(_, checked) => setAcceptedTerms(checked)}
                    />
                  }
                  label={
                    <Typography>
                      Am citit și accept{' '}
                      <Typography
                        color='#780000'
                        component='a'
                        fontWeight={700}
                        sx={{
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline',
                            color: 'primary.main',
                          },
                        }}
                        href={`${process.env.PUBLIC_URL}/terms.pdf`}
                        target='_blank'
                      >
                        Termenii și condițiile de utilizare
                      </Typography>{' '}
                      a paginii
                    </Typography>
                  }
                  value={acceptedTerms}
                />
              </Grid>
              <Grid item xs={12}>
                <Box textAlign='right'>
                  <Button
                    color='secondary'
                    disabled={!acceptedTerms}
                    variant='contained'
                    type='submit'
                    sx={{ minWidth: 80 }}
                  >
                    {isLoading ? (
                      <CircularProgress color='primary' size={24.5} />
                    ) : (
                      'Transmiteți'
                    )}
                  </Button>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
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

      <LoginDialog
        open={openLoginDialog}
        onClose={() => setOpenLoginDialog(false)}
      />
    </PageContainer>
  );
}
