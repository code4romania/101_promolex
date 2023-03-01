import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import banner from '../assets/images/banner.png';

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
  const [hasVoted, setHasVoted] = useState(false);

  return (
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

        <Stack borderRadius={2} boxShadow={3} height={265} px={12} py={4}>
          {hasVoted ? (
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
                        data: [200, 40],
                        backgroundColor: ['#29829E', '#A1A1AA'],
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
                200 cred ca DA
              </Typography>
            </>
          ) : (
            <Stack
              alignItems='center'
              color='grey.300'
              flexGrow={1}
              gap={3}
              justifyContent='center'
            >
              <Typography color='text.primary'>
                Votează acum dând click pe unul din butoanele de mai jos și află
                ceea ce cred și ceilalți cetățeni
              </Typography>
              <Button
                color='secondary'
                onClick={() => setHasVoted(true)}
                variant='contained'
              >
                DA
              </Button>
              <Button
                color='inherit'
                onClick={() => setHasVoted(true)}
                variant='outlined'
              >
                NU
              </Button>
            </Stack>
          )}
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <img src={banner} alt='banner' width='100%' />
        </Box>
      </Grid>

      <Stack bottom={0} position='absolute' right={0}>
        <Typography variant='h6'>Pune o întrebare deputaților</Typography>
        <Link to='/contact' style={{ textDecoration: 'none' }}>
          <Button color='secondary' variant='contained'>
            Întreabă Parlamentul
          </Button>
        </Link>
      </Stack>
    </Grid>
  );
}
