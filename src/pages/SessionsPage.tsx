import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loading, PageContainer } from '../components';
import { useSessionsByLegislatureQuery } from '../queries';

export function SessionsPage() {
  const [params, setParams] = useSearchParams();

  const { data: sessions, isLoading } = useSessionsByLegislatureQuery();

  const sessionId = useMemo(() => {
    const index = sessions?.findIndex(
      (session) => session.sessionDate === params.get('session'),
    );
    return index && index >= 0 ? index : 0;
  }, [params, sessions]);

  return (
    <PageContainer pageTitle='Ședințe plenare'>
      {isLoading ? (
        <Loading />
      ) : (
        <Grid columnSpacing={10} container spacing={2}>
          <Grid item xs={12} sm={4} />
          <Grid item xs={12} sm={8}>
            <Typography fontWeight='medium' variant='h4'>
              {sessions?.[sessionId]?.title}
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
              {sessions?.map(({ title, sessionDate }, index) => (
                <Button
                  color={sessionId === index ? 'secondary' : undefined}
                  key={title}
                  onClick={() => setParams({ session: sessionDate })}
                  variant={sessionId === index ? 'contained' : 'outlined'}
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
                src={sessions?.[sessionId]?.link.replace('watch?v=', 'embed/')}
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
