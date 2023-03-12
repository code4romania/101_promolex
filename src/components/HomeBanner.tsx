import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import {
  Alert,
  AlertProps,
  Box,
  Button,
  CircularProgress,
  Fade,
  Grid,
  Slide,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Chart as ChartJS, ArcElement, Tooltip, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import banner from '../assets/images/banner.png';
import votingBox from '../assets/images/vote.png';
import { useSendVoteMutation } from '../mutations';
import { useLiveSessionQuery } from '../queries';
import { useVoteResultsQuery } from '../queries/useVoteResults';
import { isErrorResponse, Routes } from '../types';
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
  const { data: liveSession } = useLiveSessionQuery({ refetchInterval: 5000 });
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

  const [step, setStep] = useState(1);
  const intervalIdRef = useRef<NodeJS.Timer>();
  useEffect(() => {
    const intervalId = setInterval(() => {
      setStep((prevStep) => prevStep + 1);
    }, 1500);
    intervalIdRef.current = intervalId;

    if (step === 3) {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [step]);

  return (
    <>
      <Grid columnSpacing={10} container position='relative' rowSpacing={10}>
        <Grid display='flex' flexDirection='column' item xs={12} md={5}>
          <Fade in={step >= 1} timeout={700}>
            <Typography
              fontWeight='medium'
              gutterBottom
              textTransform='uppercase'
              fontSize={{ xs: '1rem', sm: '1.75rem' }}
              variant='h4'
            >
              Parlamentul lucrează pentru tine ?
            </Typography>
          </Fade>

          {!hasVoted && (
            <Fade in={step >= 2} timeout={700}>
              <Typography color='text.primary'>
                Votează acum dând click pe unul din butoanele de mai jos și află
                ceea ce cred și ceilalți cetățeni
              </Typography>
            </Fade>
          )}

          {!hasVoted && !isLoadingChart && (
            <Fade in={step >= 3} timeout={700}>
              <Stack
                alignItems='center'
                borderRadius={2}
                boxShadow={3}
                py={4}
                position='relative'
                mt={4}
                flexGrow={1}
              >
                <Stack
                  alignItems='center'
                  color='grey.300'
                  flexGrow={1}
                  gap={3}
                  position='absolute'
                  top={40}
                >
                  <Button
                    disabled={isSendingVote}
                    onClick={() => onVoteHandler('1')}
                    sx={{
                      zIndex: 1,
                      bgcolor: '#82969D',
                      '&:hover': { bgcolor: '#29829E' },
                    }}
                    variant='contained'
                  >
                    DA
                  </Button>
                  <Button
                    disabled={isSendingVote}
                    onClick={() => onVoteHandler('0')}
                    sx={{
                      zIndex: 1,
                      bgcolor: '#82969D',
                      '&:hover': { bgcolor: '#29829E' },
                    }}
                    variant='contained'
                  >
                    NU
                  </Button>
                </Stack>
                <Box>
                  <img width='100%' src={votingBox} alt='urna votare' />
                </Box>
              </Stack>
            </Fade>
          )}

          {hasVoted && (
            <Stack
              alignItems='center'
              borderRadius={2}
              boxShadow={3}
              py={4}
              position='relative'
              mt={4}
              flexGrow={1}
            >
              {isLoadingChart && <CircularProgress />}
              {!isLoadingChart && (
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
                                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            </Stack>
          )}
        </Grid>

        <Grid item xs={12} md={7} position='relative'>
          <Box>
            <img src={banner} alt='banner' width='100%' />
          </Box>

          {liveSession && !isErrorResponse(liveSession) && (
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
          <Link to='/contact' style={{ textDecoration: 'none' }}>
            <Button color='secondary' size='large' variant='contained'>
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
