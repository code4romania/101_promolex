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
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend);

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
};

export function StackedBarChart({ data }: StackedBarChartProps) {
  return (
    <Box height={500}>
      <Bar options={stackedBarChartOptions} data={data} />
    </Box>
  );
}
