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
  OutlinedInput,
  Slide,
  Snackbar,
  Typography,
  Checkbox,
  FormControlLabel,
  InputLabel,
  styled,
  Autocomplete,
  TextField,
} from '@mui/material';
import { concat } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useSendQuestionMutation } from '../mutations';
import {
  useCommitteesByLegislatureQuery,
  useDeputiesByLegislatureQuery,
  useDeputyDetailsQuery,
} from '../queries';
import { ContactFormData, Routes } from '../types';
import { auth } from '../utils';
import { LoginDialog } from './LoginDialog';

export const StyledInputLabel = styled(InputLabel)({
  fontWeight: 600,
  position: 'relative',
  transform: 'none',
});

export function ContactForm() {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [alert, setAlert] = useState<{
    message: string;
    severity?: AlertProps['severity'];
  }>({ message: '' });
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, setValue } = useForm<ContactFormData>({
    defaultValues: {
      email: '',
      name: '',
      phone_number: '',
      question_for: '',
      question: '',
    },
    mode: 'all',
  });

  const { data: committees } = useCommitteesByLegislatureQuery();
  const { data: deputies } = useDeputiesByLegislatureQuery();

  const filteredDeputies = useMemo(
    () => deputies?.filter(({ depStatus }) => depStatus === '1') ?? [],
    [deputies],
  );

  const [did, setDid] = useState('');
  useDeputyDetailsQuery(did, {
    onSuccess: ({ emailWork }) => {
      setValue('question_for', emailWork);
    },
  });

  const options = useMemo(() => {
    const committeesOptions =
      committees?.map(({ cid, committee, commEmail }) => ({
        email: commEmail,
        id: `cid-${cid}`,
        title: committee,
        type: 'Comisii',
      })) ?? [];

    const deputiesOptions =
      filteredDeputies?.map((deputy) => ({
        email: '',
        id: `did-${deputy.did}`,
        title: deputy.fullName,
        type: 'Deputați',
      })) ?? [];

    return concat(
      [
        {
          email: 'info@parlament.md',
          id: 'secretariat',
          title: 'Secretariatul Parlamentului',
          type: '',
        },
        ...committeesOptions,
      ],
      deputiesOptions,
    );
  }, [committees, filteredDeputies]);

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

  const isFormDisabled = !user && !loading;

  useEffect(() => {
    if (!user || loading) {
      return;
    }

    setValue('email', user.email ?? '');
    setValue('name', user.displayName ?? '');
    setValue('phone_number', user.phoneNumber ?? '');
  }, [loading, setValue, user]);

  return (
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
            4. Politica de protecție a datelor cu caracter personal. Termeni și
            condiții de utilizare a paginii www.101.promolex.md o găsiți{' '}
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
      </Grid>

      <Grid item xs={12} sm={6}>
        <Controller
          control={control}
          name='name'
          render={({ field, fieldState }) => (
            <FormControl disabled={isFormDisabled} fullWidth>
              <StyledInputLabel htmlFor={field.name} variant='outlined'>
                Nume și prenume*
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
            <FormControl disabled={isFormDisabled} fullWidth>
              <StyledInputLabel htmlFor={field.name} variant='outlined'>
                Email*
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
            <FormControl disabled={isFormDisabled} fullWidth>
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
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          control={control}
          name='question_for'
          render={({ field }) => (
            <FormControl disabled={isFormDisabled} fullWidth>
              <StyledInputLabel htmlFor={field.name} variant='outlined'>
                Întrebarea este adresată deputatului/deputatei sau
                Parlamentului*
              </StyledInputLabel>
              <Autocomplete
                disabled={isFormDisabled}
                getOptionLabel={(option) => option.title}
                groupBy={(option) => option.type}
                noOptionsText='Nu există informații'
                onChange={(_, value) => {
                  if (value?.type === 'Deputați') {
                    setDid(value?.id.replace('did-', '') ?? '');
                    return;
                  }

                  setValue('question_for', value?.email ?? '');
                }}
                options={options}
                renderInput={(params) => <TextField {...params} />}
                sx={{
                  '& .MuiAutocomplete-inputRoot': {
                    padding: 0,
                  },
                }}
              />
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
            <FormControl disabled={isFormDisabled} fullWidth>
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
              message: 'Întrebarea poate avea maximum 1800 de caractere',
            },
            required: {
              value: true,
              message: 'Acest câmp este obligatoriu',
            },
          }}
        />
        <Typography
          fontWeight='bold'
          sx={{ opacity: isFormDisabled ? 0.38 : 1 }}
        >
          * Aceste date vor fi publice pe site, inclusiv pot fi afișate în
          răspunsul furnizat.
        </Typography>
        <Typography
          fontWeight='bold'
          sx={{ opacity: isFormDisabled ? 0.38 : 1 }}
        >
          ! Răspunsul la întrebarea dumneavoastră este în responsabilitatea
          instituției sau a deputatului căruia i-a fost adresată.
        </Typography>
        <FormControlLabel
          control={
            <Checkbox onChange={(_, checked) => setAcceptedTerms(checked)} />
          }
          disabled={isFormDisabled}
          label={
            <Typography sx={{ opacity: isFormDisabled ? 0.38 : 1 }}>
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
    </Grid>
  );
}
