import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { merge } from 'lodash';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const pieChartOptions: ChartOptions<'pie'> = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      align: 'start',
      position: 'right',
      labels: {
        boxHeight: 20,
        boxWidth: 20,
        filter: (legendItem, data) =>
          legendItem.index !== undefined &&
          Boolean(data.datasets[0].data[legendItem.index]),
        font: {
          family: 'Titillium Web',
          lineHeight: '14px',
          size: 14,
          weight: 'bold',
        },
      },
    },
    datalabels: {
      color: 'black',
      display: 'auto',
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

type StatisticsPieChartProps = {
  data?: ChartData<'pie', number[], string>;
  isLoading?: boolean;
  title: string;
};

export function StatisticsPieChart({
  data,
  isLoading,
  title,
}: StatisticsPieChartProps) {
  const { breakpoints } = useTheme();
  const isLargeScreen = useMediaQuery(breakpoints.up('sm'));

  return (
    <Stack
      border={1}
      borderColor='divider'
      borderRadius={2}
      boxShadow={3}
      height={380}
      px={12}
      py={4}
    >
      <Typography fontWeight={700} variant='h6'>
        {title}
      </Typography>
      <Box
        alignItems='center'
        display='flex'
        height={1}
        justifyContent='center'
      >
        {isLoading && <CircularProgress />}
        {!isLoading && !data && 'Lipsă date disponibile'}
        {!isLoading && data && (
          <Pie
            data={data}
            options={merge(pieChartOptions, {
              plugins: {
                legend: {
                  align: isLargeScreen ? 'center' : 'start',
                  position: isLargeScreen ? 'right' : 'bottom',
                },
              },
            })}
          />
        )}
      </Box>
    </Stack>
  );
}

StatisticsPieChart.defaultProps = {
  data: undefined,
  isLoading: false,
};
