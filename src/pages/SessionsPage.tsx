import {
  Box,
  Button,
  Grid,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import {
  DatePicker,
  LocalizationProvider,
  PickersDay,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ro } from 'date-fns/locale';
import { PageContainer } from '../components';

const StyledPickersDay = styled(PickersDay<Date>)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.secondary.main,

    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

export function SessionsPage() {
  return (
    <PageContainer pageTitle='Ședințe plenare'>
      <Grid columnSpacing={10} container spacing={2}>
        <Grid item xs={12} sm={3} />
        <Grid item xs={12} sm={9}>
          <Typography fontWeight='medium' variant='h4'>
            Ședința plenară a Parlamentului din 16 februarie 2023
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Stack gap={4}>
            <Typography color='grey.700' fontWeight='medium'>
              Dacă dorinți să vizionați o ședință plenară care nu este afișată,
              selectați data ședinței
            </Typography>

            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ro}
              localeText={{
                nextMonth: 'Luna următoare',
                previousMonth: 'Luna anterioară',
              }}
            >
              <DatePicker
                onChange={() => {
                  console.log('changed');
                }}
                renderDay={(_, __, pickersDayProps) => (
                  <StyledPickersDay {...pickersDayProps} />
                )}
                renderInput={(params) => <TextField {...params} />}
                value={new Date(Date.now())}
              />
            </LocalizationProvider>
          </Stack>

          <Stack mt={14} gap={2}>
            <Button color='secondary' variant='contained'>
              Ședința plenară din 16 februarie 2023
            </Button>
            <Button variant='outlined'>
              Ședința plenară din 15 decembrie 2022
            </Button>
            <Button variant='outlined'>
              Ședința plenară din 12 decembrie 2022
            </Button>
            <Button variant='outlined'>
              Ședința plenară din 8 decembrie 2022
            </Button>
            <Button variant='outlined'>
              Ședința plenară din 1 decembrie 2022
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Stack gap={8}>
            <iframe
              width='100%'
              height='460'
              src='https://www.youtube.com/embed/3P2mGVAV1lI'
              title='Ședința plenară a Parlamentului din 16 februarie 2023'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            />
            <Box textAlign='right'>
              <Button color='secondary'>
                Vezi sinteza ședinței în pagina Noutăți
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
