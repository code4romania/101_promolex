import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ro } from 'date-fns/locale';
import { head } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Loading, PageContainer } from '../components';
import { StyledPickersDay } from '../components/Table';
import { useSessionsByLegislatureQuery } from '../queries';
import { Routes, Session } from '../types';
import { formatDate } from '../utils';

export function SessionsPage() {
  const [params, setParams] = useSearchParams();
  const [fromDate, setFromDate] = useState<Date>(new Date(Date.now()));
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);

  const { data: sessions, isLoading } = useSessionsByLegislatureQuery({
    onSuccess: (data) => {
      const latestFive = data.slice(0, 5);
      setFilteredSessions(latestFive);
    },
  });

  const onFromDateChange = useCallback(
    (date: Date | null) => {
      if (!date) return;

      const newFilteredSessions =
        sessions
          ?.filter(
            ({ sessionDate }) =>
              new Date(sessionDate).getTime() <= date.getTime(),
          )
          .slice(0, 5) ?? [];
      setFilteredSessions(newFilteredSessions);

      const latestSession = head(newFilteredSessions);

      if (latestSession) {
        setParams({ session: latestSession.sessionDate });
      }

      setFromDate(date);
    },
    [sessions, setParams],
  );

  const sessionId = useMemo(() => {
    const index = filteredSessions?.findIndex(
      (session) => session.sessionDate === params.get('session'),
    );
    return index && index >= 0 ? index : 0;
  }, [filteredSessions, params]);

  return (
    <PageContainer pageTitle='Ședințe plenare'>
      {isLoading ? (
        <Loading />
      ) : (
        <Grid columnSpacing={10} container spacing={2}>
          <Grid item xs={12} sm={3} />
          <Grid item xs={12} sm={9}>
            <Box textAlign='right'>
              <Button
                color='secondary'
                disabled={!sessions?.[sessionId].eid}
                variant='contained'
              >
                <Link
                  to={`${Routes.News}/detalii/${sessions?.[sessionId].eid}`}
                  target='_blank'
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Vezi sinteza ședinței în pagina Noutăți
                </Link>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3} order={{ xs: 1, sm: 0 }}>
            <Stack gap={3} maxHeight={460} overflow='auto'>
              <Typography>
                Pentru a vizualiza o ședință plenară care nu este afișată,
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
                  onChange={onFromDateChange}
                  renderDay={(date, selectedDays, pickersDayProps) => (
                    <StyledPickersDay {...pickersDayProps} />
                  )}
                  renderInput={(props) => <TextField {...props} />}
                  value={fromDate}
                />
              </LocalizationProvider>
              {!filteredSessions.length && (
                <Typography>Nu există ședințe în perioada selectată</Typography>
              )}
              {filteredSessions
                .slice(0, 5)
                .map(({ title, sessionDate }, index) => (
                  <Button
                    color={sessionId === index ? 'secondary' : undefined}
                    key={title}
                    onClick={() => setParams({ session: sessionDate })}
                    variant={sessionId === index ? 'contained' : 'outlined'}
                  >
                    Ședința plenară din {formatDate(sessionDate)}
                  </Button>
                ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={9}>
            <iframe
              width='100%'
              height='460'
              src={sessions?.[sessionId]?.link.replace('watch?v=', 'embed/')}
              title='Ședința plenară a Parlamentului din 16 februarie 2023'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            />
          </Grid>
        </Grid>
      )}
    </PageContainer>
  );
}
