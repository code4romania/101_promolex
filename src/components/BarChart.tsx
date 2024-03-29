import { Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { merge } from 'lodash';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels,
);

const barChartOptions: ChartOptions<'bar'> = {
  indexAxis: 'y' as const,
  responsive: true,
  skipNull: true,
  scales: {
    x: {
      display: false,
      stacked: true,
      grace: '5%',
    },
    y: {
      display: false,
      stacked: true,
    },
  },
  datasets: {
    bar: {
      barThickness: 20,
      minBarLength: 30,
    },
  },
  maintainAspectRatio: false,
  plugins: {
    legend: {
      align: 'center',
      position: 'bottom',
      labels: {
        boxWidth: 20,
        boxHeight: 20,
        font: {
          family: 'Titillium Web',
          lineHeight: '16px',
          size: 16,
          weight: 'bold',
        },
        textAlign: 'left',
      },
    },
    datalabels: {
      color: 'white',
      labels: {
        title: {
          align: 'center',
          anchor: 'center',
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

type BarChartProps = {
  chartHeight?: number | string;
  data: ChartData<'bar', (number | undefined)[], string>;
  options?: ChartOptions<'bar'>;
};

export function BarChart({ chartHeight, data, options }: BarChartProps) {
  return (
    <Box height={chartHeight} width={1} px={6}>
      <Bar options={merge(barChartOptions, options)} data={data} />
    </Box>
  );
}

BarChart.defaultProps = {
  chartHeight: 400,
  options: undefined,
};
