import { Box, useMediaQuery, useTheme } from '@mui/material';
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
import { merge } from 'lodash';
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
    tooltip: {
      callbacks: {
        title(context) {
          const { label } = context[0];
          if (label.length <= 35) {
            return label;
          }

          const words = label.split(' ');
          const lines: string[] = [];
          let currentLine = '';
          for (let i = 0; i < words.length; i += 1) {
            const word = words[i];
            if (currentLine.length + word.length <= 35) {
              currentLine += ` ${word}`;
            } else {
              lines.push(currentLine);
              currentLine = word;
            }
          }
          lines.push(currentLine);

          return lines;
        },
      },
    },
    datalabels: {
      display: false,
    },
    legend: {
      align: 'start',
      position: 'bottom',
      title: {
        padding: 20,
      },
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
          size: 14,
        },
      },
    },
    y: {
      grid: {
        display: false,
      },
      stacked: true,
      ticks: {
        crossAlign: 'far',
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
          size: 14,
        },
      },
    },
  },
  skipNull: true,
};

function ticksCallback(isLargeScreen: boolean) {
  const maxTickWidth = isLargeScreen ? MAX_TICK_WIDTH : 20;
  function ticksCallbackFunction(tickValue: string | number) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const tickLabel = this.getLabelForValue(tickValue as number);
    if (tickLabel.length <= maxTickWidth) {
      return tickLabel;
    }

    const words = tickLabel.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    for (let i = 0; i < words.length; i += 1) {
      const word = words[i];
      if (currentLine.length + word.length <= maxTickWidth) {
        currentLine += ` ${word}`;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);

    return lines;
  }

  return ticksCallbackFunction;
}

type StackedBarChartProps = {
  data: ChartData<'bar', (number | undefined)[], string>;
  isLoading?: boolean;
  showLegend?: boolean;
  showTicks?: boolean;
};

export function StackedBarChart({
  data,
  isLoading,
  showLegend,
  showTicks,
}: StackedBarChartProps) {
  const { breakpoints } = useTheme();
  const isLargeScreen = useMediaQuery(breakpoints.up('sm'));

  const chartOptions: ChartOptions<'bar'> = {
    ...stackedBarChartOptions,
    plugins: {
      ...stackedBarChartOptions.plugins,
      legend: {
        ...stackedBarChartOptions.plugins?.legend,
        display: showLegend,
      },
    },
    scales: {
      ...stackedBarChartOptions.scales,
      y: {
        ...stackedBarChartOptions.scales?.y,
        ticks: {
          ...stackedBarChartOptions.scales?.y?.ticks,
          display: showTicks,
        },
      },
    },
  };
  return isLoading ? (
    <Loading />
  ) : (
    <Box height={1000}>
      <Bar
        options={merge(chartOptions, {
          scales: { y: { ticks: { callback: ticksCallback(isLargeScreen) } } },
        })}
        data={data}
      />
    </Box>
  );
}

StackedBarChart.defaultProps = {
  isLoading: false,
  showLegend: false,
  showTicks: true,
};
