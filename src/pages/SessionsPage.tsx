import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  alpha,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ro } from 'date-fns/locale';
import { head, last } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Loading, PageContainer } from '../components';
import { StyledPickersDay } from '../components/Table';
import { useSessionsByLegislatureQuery } from '../queries';
import { Routes, Session } from '../types';
import { formatDate } from '../utils';

export function SessionsPage() {
  const [params, setParams] = useSearchParams();
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>(new Date(Date.now()));
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);

  const { data: sessions, isLoading } = useSessionsByLegislatureQuery({
    onSuccess: (data) => {
      const latestFive = data.slice(0, 5);
      const oldest = last(latestFive);
      if (oldest) {
        setFromDate(new Date(oldest.sessionDate));
      }
      setFilteredSessions(latestFive);
    },
    refetchOnMount: true,
    staleTime: 0,
  });

  const onFromDateChange = useCallback(
    (date: Date | null) => {
      if (!date) return;

      const newFilteredSessions =
        sessions?.filter(
          ({ sessionDate }) =>
            date.getTime() <= new Date(sessionDate).getTime() &&
            new Date(sessionDate).getTime() <= toDate.getTime(),
        ) ?? [];
      setFilteredSessions(newFilteredSessions);

      const latestSession = head(newFilteredSessions);

      if (latestSession) {
        setParams({ session: latestSession.sessionDate });
      }

      setFromDate(date);
    },
    [sessions, setParams, toDate],
  );

  const onToDateChange = useCallback(
    (date: Date | null) => {
      if (!date) return;

      const newFilteredSessions =
        sessions?.filter(
          ({ sessionDate }) =>
            (fromDate?.getTime() ?? 0) <= new Date(sessionDate).getTime() &&
            new Date(sessionDate).getTime() <= date.getTime(),
        ) ?? [];
      setFilteredSessions(newFilteredSessions);

      const latestSession = head(newFilteredSessions);

      if (latestSession) {
        setParams({ session: latestSession.sessionDate });
      }

      setToDate(date);
    },
    [fromDate, sessions, setParams],
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
        <Grid columnSpacing={10} container spacing={2} pt={8}>
          <Grid item xs={12} sm={3} order={{ xs: 1, sm: 0 }}>
            <Stack gap={5} height={1}>
              <Stack gap={3} py={{ xs: 5, md: 0 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={ro}
                  localeText={{
                    nextMonth: 'Luna următoare',
                    previousMonth: 'Luna anterioară',
                  }}
                >
                  <DatePicker
                    label='De la data'
                    onChange={onFromDateChange}
                    renderDay={(date, selectedDays, pickersDayProps) => (
                      <StyledPickersDay {...pickersDayProps} />
                    )}
                    renderInput={(props) => <TextField {...props} />}
                    value={fromDate}
                  />
                </LocalizationProvider>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={ro}
                  localeText={{
                    nextMonth: 'Luna următoare',
                    previousMonth: 'Luna anterioară',
                  }}
                >
                  <DatePicker
                    label='Până la data'
                    onChange={onToDateChange}
                    renderDay={(date, selectedDays, pickersDayProps) => (
                      <StyledPickersDay {...pickersDayProps} />
                    )}
                    renderInput={(props) => <TextField {...props} />}
                    value={toDate}
                  />
                </LocalizationProvider>
              </Stack>
              {!filteredSessions.length && (
                <Typography>Nu există ședințe în perioada selectată</Typography>
              )}

              {filteredSessions.length > 0 && (
                <Stack gap={3} maxHeight={280} overflow='auto'>
                  {filteredSessions.map(({ title, sessionDate }, index) => (
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
              )}

              <Button
                color='secondary'
                disabled={!filteredSessions?.[sessionId]?.eid}
                size='large'
                sx={{
                  bgcolor: '#780000',
                  height: 60,
                  mt: { xs: 5, md: 'auto' },
                  '&:hover': {
                    bgcolor: alpha('#780000', 0.85),
                  },
                }}
                variant='contained'
              >
                <Link
                  to={`${Routes.News}/detalii/${filteredSessions?.[sessionId]?.eid}`}
                  target='_blank'
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Vezi sinteza ședinței
                </Link>
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={9}>
            <iframe
              width='100%'
              height='460'
              src={filteredSessions?.[sessionId]?.link.replace(
                'watch?v=',
                'embed/',
              )}
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
