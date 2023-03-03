import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import {
  Alert,
  AlertProps,
  Box,
  Button,
  CircularProgress,
  Grid,
  Slide,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Chart as ChartJS, ArcElement, Tooltip, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useCallback, useMemo, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import banner from '../assets/images/banner.png';
import { useSendVoteMutation } from '../mutations';
import { useLiveSessionQuery } from '../queries';
import { useVoteResultsQuery } from '../queries/useVoteResults';
import { Routes } from '../types';
import { getVoteCookies, setVoteCookies } from '../utils';

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

const doughnutChartOptions: ChartOptions<'doughnut'> = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      color: 'black',
      labels: {
        title: {
          align: 'start',
          anchor: 'end',
          font: {
            weight: 'bold',
          },
        },
      },
      font: {
        size: 14,
      },
    },
  },
};

export function HomeBanner() {
  const [alert, setAlert] = useState<{
    message: string;
    severity?: AlertProps['severity'];
  }>({ message: '' });
  const [open, setOpen] = useState(false);
  const { data } = useLiveSessionQuery({ refetchInterval: 5000 });
  const { data: voteResults, isFetching: isLoadingVoteResults } =
    useVoteResultsQuery();
  const { mutate: sendVote, isLoading: isSendingVote } = useSendVoteMutation();
  const queryClient = useQueryClient();

  const { voteId, voteTimestamp } = getVoteCookies();

  const hasVoted = useMemo(() => {
    const now = new Date(Date.now()).getTime();
    const timestamp = voteTimestamp ? parseInt(voteTimestamp, 10) : now;
    const elapsedTime = now - timestamp;

    return voteId && elapsedTime <= 1000 * 60 * 60 * 24 && elapsedTime !== 0;
  }, [voteId, voteTimestamp]);

  const onVoteHandler = useCallback(
    (vote: '0' | '1') => {
      if (hasVoted) {
        setAlert({
          message: 'Votul tău a fost înregistrat deja! Îți mulțumim!',
          severity: 'info',
        });
        setOpen(true);
      }
      const id = voteId || uuidv4();
      const timestamp = new Date(Date.now()).getTime();

      sendVote(
        { id, vote },
        {
          onSuccess: (results) => {
            if (typeof results === 'string') {
              setAlert({
                message: results,
                severity: 'info',
              });
              setOpen(true);
              return;
            }

            setAlert({
              message: 'Votul tău a fost înregistrat! Îți mulțumim!',
              severity: 'success',
            });
            setOpen(true);
            setVoteCookies(id, timestamp.toString());
            queryClient.setQueryData(['vote-results'], results);
          },

          onError: () => {
            setAlert({
              message:
                'A apărut o eroare la trimiterea votului tău. Te rugăm să reîncerci!',
              severity: 'error',
            });
            setOpen(true);
          },
        },
      );
    },
    [hasVoted, queryClient, sendVote, voteId],
  );

  const isLoadingChart = isSendingVote || isLoadingVoteResults;
  const votesFor = parseInt(voteResults?.votesFor ?? '0', 10);
  const votesAgainst = parseInt(voteResults?.votesAgainst ?? '0', 10);

  return (
    <>
      <Grid columnSpacing={10} container position='relative' rowSpacing={10}>
        <Grid item xs={12} sm={6}>
          <Typography
            fontWeight='medium'
            gutterBottom
            textTransform='uppercase'
            variant='h4'
          >
            Parlamentul lucrează pentru tine ?
          </Typography>

          <Stack
            alignItems='center'
            borderRadius={2}
            boxShadow={3}
            height={265}
            justifyContent='center'
            px={12}
            py={4}
          >
            {isLoadingChart && <CircularProgress />}
            {hasVoted && !isLoadingChart && (
              <>
                <Typography fontWeight={700} variant='h6'>
                  Rezultatele votului
                </Typography>
                <Box flexGrow={1}>
                  <Doughnut
                    data={{
                      labels: ['Voturi pentru', 'Voturi împotrivă'],
                      datasets: [
                        {
                          data: [
                            voteResults?.votesFor,
                            voteResults?.votesAgainst,
                          ],
                          backgroundColor: ['#29829E', '#A1A1AA'],
                          datalabels: {
                            formatter(value, context) {
                              const total =
                                (context.dataset.data as any[]).reduce(
                                  (acc, v) => acc + parseInt(v, 10),
                                  0,
                                ) ?? 0;

                              return `${((value / total) * 100).toFixed(0)}%`;
                            },
                          },
                        },
                      ],
                    }}
                    options={doughnutChartOptions}
                  />
                </Box>
                <Typography
                  color='secondary'
                  fontSize={20}
                  fontWeight='medium'
                  textAlign='center'
                >
                  {((votesFor / (votesFor + votesAgainst)) * 100).toFixed(0)}%
                  cred ca da
                </Typography>
              </>
            )}
            {!hasVoted && !isLoadingChart && (
              <Stack
                alignItems='center'
                color='grey.300'
                flexGrow={1}
                gap={3}
                justifyContent='center'
              >
                <Typography color='text.primary'>
                  Votează acum dând click pe unul din butoanele de mai jos și
                  află ceea ce cred și ceilalți cetățeni
                </Typography>
                <Button
                  color='secondary'
                  onClick={() => onVoteHandler('1')}
                  variant='contained'
                >
                  DA
                </Button>
                <Button
                  color='inherit'
                  onClick={() => onVoteHandler('0')}
                  variant='outlined'
                >
                  NU
                </Button>
              </Stack>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} position='relative'>
          <Box>
            <img src={banner} alt='banner' width='100%' />
          </Box>

          {data && (
            <Box position='absolute' right={0} top={24}>
              <Link
                to={Routes.PlenaryMeetings}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  color='error'
                  startIcon={<CircleRoundedIcon />}
                  sx={{
                    textTransform: 'uppercase',
                  }}
                  variant='contained'
                >
                  Live
                </Button>
              </Link>
            </Box>
          )}
        </Grid>

        <Stack bottom={0} position='absolute' right={0} textAlign='right'>
          <Typography variant='h6'>Pune o întrebare deputaților</Typography>
          <Link to='/contact' style={{ textDecoration: 'none' }}>
            <Button color='secondary' variant='contained'>
              Întreabă Parlamentul
            </Button>
          </Link>
        </Stack>
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
    </>
  );
}
