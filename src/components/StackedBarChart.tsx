import { Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartOptions,
  ChartData,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import { Loading } from './Loading';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  ChartDataLabels,
);

const MAX_TICK_WIDTH = 35;

const stackedBarChartOptions: ChartOptions<'bar'> = {
  indexAxis: 'y' as const,
  datasets: {
    bar: {
      barThickness: 20,
    },
  },
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      display: false,
    },
    legend: {
      align: 'start',
      position: 'bottom',
      labels: {
        borderRadius: 6,
        boxHeight: 20,
        boxWidth: 52,
        font: {
          family: 'Titillium Web',
          lineHeight: '16px',
          size: 16,
          weight: 'bold',
        },
        textAlign: 'left',
        useBorderRadius: true,
      },
    },
  },
  responsive: true,
  scales: {
    x: {
      beginAtZero: true,
      border: {
        display: false,
      },
      position: 'top',
      stacked: true,
      ticks: {
        color: '#27272A',
        font: {
          size: 20,
        },
      },
    },
    y: {
      grid: {
        display: false,
      },
      stacked: true,
      ticks: {
        callback(tickValue) {
          const tickLabel = this.getLabelForValue(tickValue as number);
          if (tickLabel.length <= MAX_TICK_WIDTH) {
            return tickLabel;
          }

          const words = tickLabel.split(' ');
          const lines: string[] = [];
          let currentLine = '';
          for (let i = 0; i < words.length; i += 1) {
            const word = words[i];
            if (currentLine.length + word.length <= MAX_TICK_WIDTH) {
              currentLine += ` ${word}`;
            } else {
              lines.push(currentLine);
              currentLine = word;
            }
          }
          lines.push(currentLine);

          return lines;
        },
        color: '#27272A',
        font: {
          size: 20,
        },
      },
    },
  },
  skipNull: true,
};

type StackedBarChartProps = {
  data: ChartData<'bar', (number | undefined)[], string>;
  isLoading?: boolean;
  showLegend?: boolean;
};

export function StackedBarChart({
  data,
  isLoading,
  showLegend,
}: StackedBarChartProps) {
  const chartOptions: ChartOptions<'bar'> = {
    ...stackedBarChartOptions,
    plugins: {
      ...stackedBarChartOptions.plugins,
      legend: {
        ...stackedBarChartOptions.plugins?.legend,
        display: showLegend,
      },
    },
  };
  return isLoading ? (
    <Loading />
  ) : (
    <Box height={1000}>
      <Bar options={chartOptions} data={data} />
    </Box>
  );
}

StackedBarChart.defaultProps = {
  isLoading: false,
  showLegend: false,
};
