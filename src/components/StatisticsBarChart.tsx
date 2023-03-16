import { Stack, Typography } from '@mui/material';
import { ChartData, ChartOptions } from 'chart.js';
import { BarChart } from './BarChart';

type StatisticsPieChartProps = {
  data: ChartData<'bar', (number | undefined)[], string>;
  options?: ChartOptions<'bar'>;
  title: string;
  maxWidth?: string | number;
};

export function StatisticsBarChart({
  data,
  options,
  title,
  maxWidth,
}: StatisticsPieChartProps) {
  return (
    <Stack
      border={1}
      borderColor='divider'
      borderRadius={2}
      boxShadow={3}
      px={6}
      py={4}
      maxWidth={maxWidth}
    >
      <Typography fontWeight={700} variant='h6'>
        {title}
      </Typography>
      <BarChart chartHeight={1} data={data} options={options} />
    </Stack>
  );
}

StatisticsBarChart.defaultProps = {
  options: undefined,
  maxWidth: '100%',
};
