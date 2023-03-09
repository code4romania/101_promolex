import {
  Box,
  Button,
  Grid,
  Stack,
  // styled,
  // TextField,
  Typography,
} from '@mui/material';
import // DatePicker,
// LocalizationProvider,
// PickersDay,
'@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { ro } from 'date-fns/locale';
import { useState } from 'react';
import { Loading, PageContainer } from '../components';
import { useSessionsByLegislatureQuery } from '../queries';

// const StyledPickersDay = styled(PickersDay<Date>)(({ theme }) => ({
//   '&.Mui-selected': {
//     backgroundColor: theme.palette.secondary.main,

//     '&:hover': {
//       backgroundColor: theme.palette.secondary.dark,
//     },
//   },
// }));

export function SessionsPage() {
  const [selectedSession, setSelectedSession] = useState(0);

  const { data: sessions, isLoading } = useSessionsByLegislatureQuery();

  return (
    <PageContainer pageTitle='Ședințe plenare'>
      {isLoading ? (
        <Loading />
      ) : (
        <Grid columnSpacing={10} container spacing={2}>
          <Grid item xs={12} sm={4} />
          <Grid item xs={12} sm={8}>
            <Typography fontWeight='medium' variant='h4'>
              {sessions?.[selectedSession]?.title}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} order={{ xs: 1, sm: 0 }}>
            {/* <Stack gap={4}>
              <Typography color='grey.700' fontWeight='medium'>
                Dacă dorinți să vizionați o ședință plenară care nu este
                afișată, selectați data ședinței
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
            </Stack> */}

            <Stack gap={2} maxHeight={460} overflow='auto' py={4}>
              {sessions?.map(({ title }, index) => (
                <Button
                  color={selectedSession === index ? 'secondary' : undefined}
                  key={title}
                  onClick={() => setSelectedSession(index)}
                  variant={selectedSession === index ? 'contained' : 'outlined'}
                >
                  {title}
                </Button>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Stack gap={8}>
              <iframe
                width='100%'
                height='460'
                src={sessions?.[selectedSession]?.link.replace(
                  'watch?v=',
                  'embed/',
                )}
                title='Ședința plenară a Parlamentului din 16 februarie 2023'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
              />
              <Box textAlign='right'>
                {/* @todo add link the news article */}
                <Button color='secondary'>
                  Vezi sinteza ședinței în pagina Noutăți
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      )}
    </PageContainer>
  );
}
