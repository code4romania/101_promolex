import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const pieChartOptions: ChartOptions<'pie'> = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxHeight: 20,
        boxWidth: 40,
        filter: (legendItem, data) =>
          legendItem.index !== undefined &&
          Boolean(data.datasets[0].data[legendItem.index]),
      },
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
  return (
    <Stack
      border={1}
      borderColor='divider'
      borderRadius={2}
      boxShadow={3}
      height={320}
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
        {!isLoading && data && <Pie data={data} options={pieChartOptions} />}
      </Box>
    </Stack>
  );
}

StatisticsPieChart.defaultProps = {
  data: undefined,
  isLoading: false,
};
