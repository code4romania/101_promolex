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
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const doughnutChartOptions: ChartOptions<'doughnut'> = {
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

type StatisticsDoughnutChartProps = {
  data?: ChartData<'doughnut', number[], string>;
  height?: number;
  isLoading?: boolean;
  title: string;
};

export function StatisticsDoughnutChart({
  data,
  height,
  isLoading,
  title,
}: StatisticsDoughnutChartProps) {
  return (
    <Stack
      border={1}
      borderColor='divider'
      borderRadius={2}
      boxShadow={3}
      height={height}
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
        {!isLoading && !data && 'Lipsă date'}
        {!isLoading && data && (
          <Doughnut data={data} options={doughnutChartOptions} />
        )}
      </Box>
    </Stack>
  );
}

StatisticsDoughnutChart.defaultProps = {
  data: undefined,
  height: undefined,
  isLoading: false,
};
